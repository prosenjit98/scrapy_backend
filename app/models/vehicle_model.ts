import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Part from './part.js'
import Vehicle from './vehicle.js'
import VehicleMake from './vehicle_make.js'

export default class VehicleModel extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column()
  declare vehicle_make_id: number

  @belongsTo(() => VehicleMake, { foreignKey: 'vehicle_make_id' })
  declare make: BelongsTo<typeof VehicleMake>

  @hasMany(() => Part, {})
  declare parts: HasMany<typeof Part>

  @hasMany(() => Vehicle, {})
  declare vehicles: HasMany<typeof Vehicle>
}
