import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import Attachment from './attachment.js'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import VehicleMake from './vehicle_make.js'
import VehicleModel from './vehicle_model.js'
import User from './user.js'

export default class Part extends BaseModel {
  @column({ isPrimary: true })
  declare id: number
  @column()
  declare vehicleId: number | null
  @column()
  declare name: string
  @column()
  declare description: string | null
  @column()
  declare condition: 'new' | 'used' | 'refurbished'
  @column()
  declare price: number
  @column()
  declare isAvailable: boolean
  @column()
  declare stock: number | null
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column({ serializeAs: null })
  declare vehicleMakeId: number

  @column({ serializeAs: null })
  declare vehicleModelId: number

  @column({ serializeAs: null })
  declare vendorId: number

  @belongsTo(() => VehicleMake, { foreignKey: 'vehicleMakeId' })
  declare make: BelongsTo<typeof VehicleMake>

  @belongsTo(() => VehicleModel, { foreignKey: 'vehicleModelId' })
  declare model: BelongsTo<typeof VehicleModel>

  @belongsTo(() => User, { foreignKey: 'vendorId' })
  declare vendor: BelongsTo<typeof User>

  @hasMany(() => Attachment)
  declare images: HasMany<typeof Attachment>

  // static async preComputeUrls(models: Part | Part[]) {
  //   if (Array.isArray(models)) {
  //     await Promise.all(models.map((model) => this.preComputeUrls(model)))
  //     return
  //   }
  //   // compute url for original file
  //   if (!models.images) return
  //   await attachmentManager.computeUrl(models.images)
  // }
}
