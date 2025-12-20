import { BaseSchema } from '@adonisjs/lucid/schema'

export default class AlterPartsApproval extends BaseSchema {
  protected tableName = 'proposals'

  public async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('is_accepted')
      table.boolean('is_self_accepted')
      table.boolean('is_other_accepted')
    })
  }

  public async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.boolean('is_accepted')
      table.dropColumn('is_self_accepted')
      table.dropColumn('is_other_accepted')
    })
  }
}