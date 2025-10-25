import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'inquiries'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('title').nullable()
      table.integer('year').nullable().alter()
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('title')
      table.integer('year').notNullable().alter()
    })
  }
}