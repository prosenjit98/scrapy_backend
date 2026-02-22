import { DateTime } from 'luxon'
import User from './user.js'
import Comment from './comment.js'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import type { MorphManyRelationType } from '#utils/morph_relation'
import { BaseModel, belongsTo, column, afterSave } from '@adonisjs/lucid/orm'
import Inquiry from './inquiry.js'
import { morphMany } from '#utils/morph_relation'


export default class Proposal extends BaseModel {

  @afterSave()
  static async updateRelatedProposals(proposal: Proposal) {
    console.log('afterSave hook triggered')
    // After a proposal is saved, if isSelfAccepted was changed to true,
    // set isSelfAccepted = false for other proposals with the same inquiryId.

    // only run when isSelfAccepted was changed to true
    if (proposal.isSelfAccepted && proposal.$dirty && 'isSelfAccepted' in proposal.$dirty) {
      // update other proposals for the same inquiry, excluding the current one.
      await this.query()
        .where('inquiry_id', proposal.inquiryId)
        .whereNot('id', proposal.id)
        .update({ is_self_accepted: false })
    }
    if (proposal.isOtherAccepted && proposal.$dirty && 'isOtherAccepted' in proposal.$dirty) {
      // update other proposals for the same inquiry, excluding the current one.
      await this.query()
        .where('inquiry_id', proposal.inquiryId)
        .whereNot('id', proposal.id)
        .update({ is_other_accepted: false })
    }
  }

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare description: string

  @column()
  declare vendorId: number

  @column()
  declare proposerId: number

  @column()
  declare price: number

  @column()
  declare quantity: number

  @column()
  declare isSelfAccepted: boolean

  @column()
  declare isOtherAccepted: boolean

  @column()
  declare inquiryId: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => User, { foreignKey: 'vendorId' })
  declare vendor: BelongsTo<typeof User>

  @belongsTo(() => User, { foreignKey: 'proposerId' })
  declare proposer: BelongsTo<typeof User>

  @belongsTo(() => Inquiry, { foreignKey: 'inquiryId' })
  declare inquiry: BelongsTo<typeof Inquiry>

  @morphMany(Comment, 'commentable')
  declare comments: MorphManyRelationType<typeof Comment>
}
