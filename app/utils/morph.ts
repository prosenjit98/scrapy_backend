import { LucidModel } from '@adonisjs/lucid/types/model'

export function getMorphableTypeValue(model: typeof LucidModel): string {
  return model.table
}
