// import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
// import type { BelongsTo } from '@adonisjs/lucid/types/relations'
// import Product from './product.js'
// import CategoryAttribute from './category_attribute.js'

// export default class ProductAttributeValue extends BaseModel {
//   @column({ isPrimary: true })
//   declare id: string

//   @column()
//   declare productId: string

//   @column()
//   declare categoryAttributeId: string

//   @column()
//   declare valueString?: string

//   @column()
//   declare valueNumber?: number

//   @column()
//   declare valueBoolean?: boolean

//   @belongsTo(() => Product)
//   declare product: BelongsTo<typeof Product>

//   @belongsTo(() => CategoryAttribute)
//   declare attribute: BelongsTo<typeof CategoryAttribute>
// }
