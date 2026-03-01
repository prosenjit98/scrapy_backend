import { BaseSchema } from '@adonisjs/lucid/schema'

export default class AddRatingStatsToVendors extends BaseSchema {
  protected tableName = 'users'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.decimal('average_rating', 3, 2).defaultTo(0)
      table.integer('reviews_count').defaultTo(0)
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('average_rating')
      table.dropColumn('reviews_count')
    })
  }
}