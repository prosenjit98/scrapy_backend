import { BaseSchema } from '@adonisjs/lucid/schema'


export default class CategoryAttributeValues extends BaseSchema {
  protected tableName = 'category_attribute_values'

  // public async up () {
  //   this.schema.createTable(this.tableName, (table) => {
  //     table.uuid('id').primary()

  //     table
  //       .uuid('category_attribute_id')
  //       .references('id')
  //       .inTable('category_attributes')
  //       .onDelete('CASCADE')
  //       .notNullable()

  //     table.string('value').notNullable()
  //     table.integer('position').defaultTo(0)

  //     table.timestamps(true)
  //   })
  // }

  // public async down () {
  //   this.schema.dropTable(this.tableName)
  // }
}
