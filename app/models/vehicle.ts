import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import User from './user.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import VehicleMake from './vehicle_make.js'
import VehicleModel from './vehicle_model.js'

export default class Vehicle extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare vendorId: number

  @column()
  declare year: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column({ serializeAs: null })
  declare vehicleMakeId: number

  @column({ serializeAs: null })
  declare vehicleModelId: number

  @belongsTo(() => VehicleMake, { foreignKey: 'vehicleMakeId' })
  declare make: BelongsTo<typeof VehicleMake>

  @belongsTo(() => VehicleModel, { foreignKey: 'vehicleModelId' })
  declare model: BelongsTo<typeof VehicleModel>

  @belongsTo(() => User, { foreignKey: 'vendorId' })
  declare vendor: BelongsTo<typeof User>
}
