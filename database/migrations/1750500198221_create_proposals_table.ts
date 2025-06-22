import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'proposals'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('description')
      table.integer('vendor_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.integer('part_id').unsigned().references('id').inTable('parts').onDelete('CASCADE')
      table.integer('proposer_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.float('price')
      table.integer('quantity').defaultTo(1)
      table.boolean('is_accepted').defaultTo(false)
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
