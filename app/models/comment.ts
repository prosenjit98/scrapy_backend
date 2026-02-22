import { DateTime } from 'luxon'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { column, BaseModel, belongsTo } from '@adonisjs/lucid/orm'
import User from './user.js'

export default class Comment extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare content: string

  @column()
  declare commentableType: string

  @column()
  declare commentableId: number

  @column()
  declare userId: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => User, { foreignKey: 'userId' })
  declare commenter: BelongsTo<typeof User>

  // Polymorphic belongsTo - manually load the commentable
  async getCommentable() {
    if (this.commentableType === 'proposals') {
      const { default: Proposal } = await import('./proposal.js')
      return Proposal.find(this.commentableId)
    } else if (this.commentableType === 'bargains') {
      const { default: Bargain } = await import('./bargain.js')
      return Bargain.find(this.commentableId)
    }
    return null
  }
}
