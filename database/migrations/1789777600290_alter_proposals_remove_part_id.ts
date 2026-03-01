import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'proposals'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('part_id')
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('part_id').unsigned().nullable().references('id').inTable('parts').onDelete('CASCADE')
    })
  }
}
