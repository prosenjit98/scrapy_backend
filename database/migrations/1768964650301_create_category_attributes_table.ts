import { BaseSchema } from '@adonisjs/lucid/schema'
export default class CategoryAttributes extends BaseSchema {
  protected tableName = 'category_attributes'

  // public async up () {
  //   this.schema.createTable(this.tableName, (table) => {
  //     table.uuid('id').primary()

  //     table
  //       .uuid('category_id')
  //       .references('id')
  //       .inTable('categories')
  //       .onDelete('CASCADE')
  //       .notNullable()

  //     table.string('name').notNullable()
  //     table.string('slug').notNullable()

  //     // string | number | boolean | select
  //     table.string('type').notNullable()

  //     table.boolean('is_required').defaultTo(false)
  //     table.boolean('is_filterable').defaultTo(true)

  //     table.integer('position').defaultTo(0)

  //     table.timestamps(true)
  //     table.unique(['category_id', 'slug'])
  //   })
  // }

  // public async down () {
  //   this.schema.dropTable(this.tableName)
  // }
}
