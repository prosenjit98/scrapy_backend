import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, afterSave } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from './user.js'
import Vendor from './user.js'

export default class VendorReview extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number

  @column()
  declare vendorId: number

  @column()
  declare rating: number

  @column()
  declare comment?: string

  @column()
  declare status: 'active' | 'hidden' | 'rejected'

  @column()
  declare flagged: boolean

  @column()
  declare flagReason?: string

  @column.dateTime()
  declare reviewedAt?: DateTime

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @belongsTo(() => Vendor)
  declare vendor: BelongsTo<typeof Vendor>

  @afterSave()
  public static async updateVendorRating(review: VendorReview) {
    try {
      const vendor = await Vendor.find(review.vendorId)
      if (!vendor) return

      const result = await VendorReview.query().where('vendor_id', review.vendorId).where('status', 'active').avg('rating as avg')
      const avgRating = Number(result[0].$extras.avg || 0)
      vendor.averageRating = Number(avgRating.toFixed(2))

      const countResult = await VendorReview.query().where('vendor_id', review.vendorId).where('status', 'active').count('* as total')
      vendor.reviewsCount = Number(countResult[0].$extras.total || 0)

      await vendor.save()
    } catch (e) {
      console.error('afterSave updateVendorRating error:', e)
    }
  }
}
