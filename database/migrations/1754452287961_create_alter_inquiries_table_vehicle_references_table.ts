import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'inquiries'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      // Drop the existing string columns
      table.dropColumn('vehicle_make')
      table.dropColumn('vehicle_model')
    })
    
    this.schema.alterTable(this.tableName, (table) => {
      // Add new integer foreign key columns
      table.integer('vehicle_make').unsigned().references('id').inTable('vehicle_makes').onDelete('CASCADE')
      table.integer('vehicle_model').unsigned().references('id').inTable('vehicle_models').onDelete('CASCADE')
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      // Drop the foreign key columns
      table.dropColumn('vehicle_make')
      table.dropColumn('vehicle_model')
    })
    
    this.schema.alterTable(this.tableName, (table) => {
      // Restore the original string columns
      table.string('vehicle_make').notNullable()
      table.string('vehicle_model').notNullable()
    })
  }
}