import { DateTime } from 'luxon'
import User from './user.js'
import Part from './part.js'
import Comment from './comment.js'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import { BaseModel, belongsTo, hasMany, column, afterSave } from '@adonisjs/lucid/orm'
import Inquiry from './inquiry.js'


export default class Proposal extends BaseModel {

  @afterSave()
  static async updateRelatedProposals(proposal: Proposal) {
    console.log('afterSave hook triggered')
    // After a proposal is saved, if isAccepted was changed to true,
    // set isAccepted = false for other proposals with the same inquiryId.

    // only run when isAccepted was changed to true
    if (proposal.isAccepted && proposal.$dirty && 'isAccepted' in proposal.$dirty) {
      // update other proposals for the same inquiry, excluding the current one.
      await this.query()
        .where('inquiry_id', proposal.inquiryId) // DB column may be snake_case\
        .whereNot('id', proposal.id)
        .update({ is_accepted: false }) // use DB column names
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
  declare partId: number

  @column()
  declare price: number

  @column()
  declare quantity: number

  @column()
  declare isAccepted: boolean

  @column()
  declare inquiryId: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Part, { foreignKey: 'partId' })
  declare part: BelongsTo<typeof Part>

  @belongsTo(() => User, { foreignKey: 'vendorId' })
  declare vendor: BelongsTo<typeof User>

  @belongsTo(() => User, { foreignKey: 'proposerId' })
  declare proposer: BelongsTo<typeof User>

  @belongsTo(() => Inquiry, { foreignKey: 'inquiryId' })
  declare inquiry: BelongsTo<typeof Inquiry>

  @hasMany(() => Comment, { foreignKey: 'proposalId' })
  declare comments: HasMany<typeof Comment>
}
