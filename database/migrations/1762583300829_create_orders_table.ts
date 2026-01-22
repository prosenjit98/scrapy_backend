import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'orders'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').notNullable()
      table.integer('vendor_id').notNullable()
      table.integer('part_id')
      table.integer('quantity').notNullable().defaultTo(1)
      table.integer('proposal_id')
      table.float('unit_price').notNullable()
      table.float('total_price').notNullable()
      table.string('status').defaultTo('pending')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}