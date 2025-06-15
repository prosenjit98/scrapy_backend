import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName_1 = 'vehicle_makes'
  protected tableName_2 = 'vehicle_models'

  async up() {
    this.schema.createTable(this.tableName_1, (table) => {
      table.increments('id')
      table.string('name').notNullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.index('name')
    })
    this.schema.createTable(this.tableName_2, (table) => {
      table.increments('id')
      table
        .integer('vehicle_make_id')
        .unsigned()
        .references('id')
        .inTable(this.tableName_1)
        .onDelete('CASCADE')
      table.string('name').notNullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.index('name')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName_1)
    this.schema.dropTable(this.tableName_2)
  }
}
