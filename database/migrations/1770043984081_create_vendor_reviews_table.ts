import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'vendor_reviews'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE')
      table.integer('vendor_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE')
      table.integer('rating').notNullable() // 1–5
      table.text('comment')
      table.enum('status', ['active', 'hidden', 'rejected']) .defaultTo('active')
      table.boolean('flagged').defaultTo(false)
      table.text('flag_reason').nullable()
      table.timestamp('reviewed_at', { useTz: true })
      table.timestamps(true)
      
      table.index(['vendor_id'])
      table.index(['rating'])
      table.index(['status'])
      table.index(['flagged'])
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
