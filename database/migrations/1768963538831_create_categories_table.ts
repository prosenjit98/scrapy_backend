import { BaseSchema } from '@adonisjs/lucid/schema'

export default class Categories extends BaseSchema {
  protected tableName = 'categories'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name').notNullable()
      table.string('slug').notNullable().unique()
      table.integer('parent_id').references('id').inTable('categories').onDelete('CASCADE').nullable()
      table.text('description').nullable()
      table.string('icon').nullable()
      table.boolean('is_active').defaultTo(true)
      table.integer('position').defaultTo(0)
      table.timestamps(true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
