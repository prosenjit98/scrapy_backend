import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected table1Name = 'proposals'
  protected table2Name = 'comments'

  async up() {
    this.schema.alterTable(this.table1Name, (table) => {
      table.integer('inquiry_id').nullable().unsigned().references('id').inTable('inquiries').onDelete('CASCADE')
    })
    this.schema.alterTable(this.table2Name, (table) => {
      table.integer('user_id').nullable().unsigned().references('id').inTable('users').onDelete('CASCADE')
    })
  }

  async down() {
    this.schema.alterTable(this.table1Name, (table) => {
      table.dropColumn('inquiry_id')
    })
    this.schema.alterTable(this.table2Name, (table) => {
      table.dropColumn('user_id')
    })
  }
}