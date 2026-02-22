import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'comments'

  async up() {
    // Create the polymorphic columns from scratch
    // This migration handles both fresh and partially migrated databases
    await this.schema.raw(`
      -- Add commentable_type and commentable_id if they don't exist
      DO $$
      BEGIN
        -- Add commentable_type column
        BEGIN
          ALTER TABLE "${this.tableName}" 
          ADD COLUMN commentable_type VARCHAR(255) NOT NULL DEFAULT 'proposals';
        EXCEPTION WHEN duplicate_column THEN
          -- Column already exists, set values for any nulls
          UPDATE "${this.tableName}" 
          SET commentable_type = 'proposals'
          WHERE commentable_type IS NULL;
          
          ALTER TABLE "${this.tableName}"
          ALTER COLUMN commentable_type SET NOT NULL;
        END;
        
        -- Add commentable_id column
        BEGIN
          ALTER TABLE "${this.tableName}" 
          ADD COLUMN commentable_id INTEGER;
        EXCEPTION WHEN duplicate_column THEN
          -- Column already exists
          NULL;
        END;
        
        -- Populate commentable_id from proposal_id if proposal_id exists
        BEGIN
          UPDATE "${this.tableName}" 
          SET commentable_id = proposal_id
          WHERE proposal_id IS NOT NULL
          AND commentable_id IS NULL;
          
          -- Drop proposal_id if it exists
          ALTER TABLE "${this.tableName}" DROP COLUMN proposal_id;
        EXCEPTION WHEN undefined_column THEN
          -- proposal_id doesn't exist, that's fine
          NULL;
        END;
        
        -- Make commentable_id not null
        ALTER TABLE "${this.tableName}"
        ALTER COLUMN commentable_id SET NOT NULL;
      END
      $$;
    `)
  }

  async down() {
    await this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('commentable_type')
      table.dropColumn('commentable_id')
    })

    // Re-add proposal_id
    await this.schema.alterTable(this.tableName, (table) => {
      table.integer('proposal_id').unsigned().nullable().references('id').inTable('proposals').onDelete('CASCADE')
    })
  }
}

