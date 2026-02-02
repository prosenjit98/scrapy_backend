import { BaseSchema } from '@adonisjs/lucid/schema'


export default class ProductAttributeValues extends BaseSchema {
  protected tableName = 'product_attribute_values'

  // public async up () {
  //   this.schema.createTable(this.tableName, (table) => {
  //     table.uuid('id').primary()

  //     table
  //       .uuid('product_id')
  //       .references('id')
  //       .inTable('products')
  //       .onDelete('CASCADE')
  //       .notNullable()

  //     table
  //       .uuid('category_attribute_id')
  //       .references('id')
  //       .inTable('category_attributes')
  //       .onDelete('CASCADE')
  //       .notNullable()

  //     // Value storage (one used based on attribute type)
  //     table.string('value_string').nullable()
  //     table.decimal('value_number', 10, 2).nullable()
  //     table.boolean('value_boolean').nullable()

  //     table.timestamps(true)
  //     table.unique(['product_id', 'category_attribute_id'])
  //   })
  // }

  // public async down () {
  //   this.schema.dropTable(this.tableName)
  // }
}
