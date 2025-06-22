import { DateTime } from 'luxon'
import User from './user.js'
import Part from './part.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'

export default class Proposal extends BaseModel {
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
  declare is_accepted: boolean

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
}
