import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Part from './part.js'
import Vehicle from './vehicle.js'

export default class VehicleMake extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => Part, {})
  declare parts: HasMany<typeof Part>

  @hasMany(() => Vehicle, {})
  declare vehicles: HasMany<typeof Vehicle>
}
