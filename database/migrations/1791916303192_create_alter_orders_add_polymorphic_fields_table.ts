import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'orders'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      // Add polymorphic fields
      table.string('orderable_type').nullable()
      table.integer('orderable_id').nullable()

      // Make proposal_id nullable if it isn't already (for backward compatibility)
      table.integer('proposal_id').nullable().alter()
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('orderable_type')
      table.dropColumn('orderable_id')
    })
  }
}