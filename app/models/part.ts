import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import Attachment from './attachment.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'

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
  declare stock: number
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

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
