import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import User from './user.js'
import Attachment from './attachment.js'
import VehicleMake from './vehicle_make.js'
import VehicleModel from './vehicle_model.js'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'

export default class Inquiry extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number

  @column()
  declare vehicleMake: number

  @column()
  declare vehicleModel: number

  @column()
  declare year: number

  @column()
  declare title: string

  @column()
  declare partDescription: string

  @column()
  declare status: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => User, { foreignKey: 'userId' })
  declare user: BelongsTo<typeof User>

  @belongsTo(() => VehicleMake, { foreignKey: 'vehicleMake' })
  declare make: BelongsTo<typeof VehicleMake>

  @belongsTo(() => VehicleModel, { foreignKey: 'vehicleModel' })
  declare model: BelongsTo<typeof VehicleModel>

  @hasMany(() => Attachment, {
    foreignKey: 'attachableId',
    localKey: 'id',
    onQuery: (query) => query.where('attachableType', 'Inquiry')
  })
  declare attachments: HasMany<typeof Attachment>
}
