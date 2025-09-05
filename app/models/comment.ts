import { DateTime } from 'luxon'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { column, BaseModel, belongsTo } from '@adonisjs/lucid/orm'
import Proposal from './proposal.js'

export default class Comment extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare content: string

  @column()
  declare proposalId: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Proposal, { foreignKey: 'proposalId' })
  declare proposal: BelongsTo<typeof Proposal>
}