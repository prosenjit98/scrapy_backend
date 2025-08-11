import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'inquiries'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.integer('vehicle_make').unsigned().references('id').inTable('vehicle_makes').onDelete('CASCADE')
      table.integer('vehicle_model').unsigned().references('id').inTable('vehicle_models').onDelete('CASCADE')
      table.integer('year').notNullable()
      table.text('part_description').notNullable()
      table.string('status').notNullable().defaultTo('pending')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
