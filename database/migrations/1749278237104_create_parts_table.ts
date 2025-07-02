import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'parts'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      // eslint-disable-next-line prettier/prettier
      table.integer('vehicle_id').unsigned().nullable().references('id').inTable('vehicles').onDelete('SET NULL')
      table.string('name').notNullable()
      table.text('description').nullable()
      table.enum('condition', ['new', 'used', 'refurbished']).notNullable()
      table.decimal('price', 10, 2).notNullable()
      table.boolean('is_available').defaultTo(true)
      table.json('images').nullable() // Store image URLs or paths as JSON array
      table.integer('stock').defaultTo(1) // if selling in quantity
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
