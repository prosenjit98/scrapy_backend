import { BaseSchema } from '@adonisjs/lucid/schema'


export default class Products extends BaseSchema {
  protected tableName = 'products'

  // public async up () {
  //   this.schema.createTable(this.tableName, (table) => {

  //     // ─────────────────────────────
  //     // Primary Key
  //     // ─────────────────────────────
  //     table.uuid('id').primary()

  //     // ─────────────────────────────
  //     // Core Product Data
  //     // ─────────────────────────────
  //     table.string('title').notNullable()
  //     table.text('description').nullable()

  //     table.decimal('price', 12, 2).notNullable()

  //     // new | used | refurbished
  //     table.string('condition').notNullable()

  //     // ─────────────────────────────
  //     // Category Relation
  //     // ─────────────────────────────
  //     table
  //       .uuid('category_id')
  //       .references('id')
  //       .inTable('categories')
  //       .onDelete('RESTRICT')
  //       .notNullable()

  //     // ─────────────────────────────
  //     // SEO
  //     // ─────────────────────────────
  //     table.string('slug').notNullable().unique()

  //     // ─────────────────────────────
  //     // Admin & Visibility
  //     // ─────────────────────────────
  //     table.boolean('is_active').defaultTo(true)
  //     table.boolean('is_approved').defaultTo(false)

  //     // ─────────────────────────────
  //     // Optional (Future Use)
  //     // ─────────────────────────────
  //     table.integer('views').defaultTo(0)

  //     // ─────────────────────────────
  //     // Timestamps
  //     // ─────────────────────────────
  //     table.timestamps(true)
  //   })

  //   // ─────────────────────────────
  //   // Indexes (Performance)
  //   // ─────────────────────────────
  //   this.schema.alterTable(this.tableName, (table) => {
  //     table.index(['category_id'])
  //     table.index(['is_active'])
  //     table.index(['is_approved'])
  //     table.index(['price'])
  //   })
  // }

  // public async down () {
  //   this.schema.dropTable(this.tableName)
  // }
}
