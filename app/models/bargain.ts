import { DateTime } from 'luxon'
import User from './user.js'
import Part from './part.js'
import Comment from './comment.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import type { MorphManyRelationType } from '#utils/morph_relation'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import { morphMany } from '#utils/morph_relation'

export default class Bargain extends BaseModel {
  static table = 'bargains'

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
  declare isSelfAccepted: boolean

  @column()
  declare isOtherAccepted: boolean

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

  @morphMany(Comment, 'commentable')
  declare comments: MorphManyRelationType<typeof Comment>
}
