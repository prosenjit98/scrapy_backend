import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName_1 = 'vehicle_makes'
  protected tableName_2 = 'vehicle_models'
  protected tableName_3 = 'users'

  async up() {
    this.schema.alterTable('parts', (table) => {
      table
        .integer('vehicle_make_id')
        .unsigned()
        .nullable()
        .references('id')
        .inTable(this.tableName_1)
        .onDelete('SET NULL')
      table
        .integer('vehicle_model_id')
        .unsigned()
        .nullable()
        .references('id')
        .inTable(this.tableName_2)
        .onDelete('SET NULL')
      table
        .integer('vendor_id')
        .unsigned()
        .nullable()
        .references('id')
        .inTable(this.tableName_3)
        .onDelete('SET NULL')
    })
    this.schema.table('vehicles', (table) => {
      table
        .integer('vehicle_make_id')
        .unsigned()
        .nullable()
        .references('id')
        .inTable(this.tableName_1)
        .onDelete('SET NULL')
      table
        .integer('vehicle_model_id')
        .unsigned()
        .nullable()
        .references('id')
        .inTable(this.tableName_2)
        .onDelete('SET NULL')
      // table.dropColumn('make')
      // table.dropColumn('model')
    })
  }

  async down() {
    this.schema.alterTable('parts', (table) => {
      table.dropColumn('vehicle_make_id')
      table.dropColumn('vehicle_model_id')
      table.dropColumn('vendor_id')
    })
    this.schema.alterTable('vehicles', (table) => {
      table.dropColumn('vehicle_make_id')
      table.dropColumn('vehicle_model_id')
    })
  }
}
