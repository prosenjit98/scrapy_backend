import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'vehicle_makes'


  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('category_id').nullable().unsigned().references('id').inTable('categories').onDelete('CASCADE')
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('category_id')
    })
  }
}