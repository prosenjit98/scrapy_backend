import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import type { HasMany } from '@adonisjs/lucid/types/relations'
// import Vehicle from './vehicle.js'
import VehicleMake from './vehicle_make.js'

export default class Category extends BaseModel {
  @column({ isPrimary: true })
  declare id: number


  @column()
  declare name: string

  @column()
  declare slug: string

  @column({ columnName: 'parent_id' })
  declare parentId?: number | null

  @column()
  declare description?: string

  @column()
  declare icon?: string

  @column()
  declare isActive: boolean

  @column()
  declare position: number

  @belongsTo(() => Category, { foreignKey: 'parentId' })
  declare parent: BelongsTo<typeof Category>

  @hasMany(() => Category, { foreignKey: 'parentId' })
  declare children: HasMany<typeof Category>

  @hasMany(() => VehicleMake, { foreignKey: 'categoryId' })
  declare vehicles: HasMany<typeof VehicleMake>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
