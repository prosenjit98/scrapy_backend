// import { DateTime } from 'luxon'
// import {
//   BaseModel,
//   column,
//   hasMany,
// } from '@adonisjs/lucid/orm'
// import type { HasMany } from '@adonisjs/lucid/orm/types'

// import Category from './category.js'
// import ProductAttributeValue from './product_attribute_value.js'

// export default class Product extends BaseModel {
//   @column({ isPrimary: true })
//   declare id: string

//   // ─────────────────────────────
//   // Basic Product Info
//   // ─────────────────────────────
//   @column()
//   declare title: string

//   @column()
//   declare description?: string

//   @column()
//   declare price: number

//   @column()
//   declare condition: 'new' | 'used' | 'refurbished'

//   // ─────────────────────────────
//   // Relations
//   // ─────────────────────────────
//   @column({ columnName: 'category_id' })
//   declare categoryId: string

//   @belongsTo(() => Category)
//   declare category: Category

//   @hasMany(() => ProductAttributeValue)
//   declare attributes: HasMany<typeof ProductAttributeValue>

//   // ─────────────────────────────
//   // Status & Admin Control
//   // ─────────────────────────────
//   @column()
//   declare isActive: boolean

//   @column()
//   declare isApproved: boolean

//   // ─────────────────────────────
//   // SEO (optional but recommended)
//   // ─────────────────────────────
//   @column()
//   declare slug: string

//   // ─────────────────────────────
//   // Timestamps
//   // ─────────────────────────────
//   @column.dateTime({ autoCreate: true })
//   declare createdAt: DateTime

//   @column.dateTime({ autoCreate: true, autoUpdate: true })
//   declare updatedAt: DateTime
// }


