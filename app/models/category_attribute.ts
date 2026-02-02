// import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'

// import Category from './category.js'
// import CategoryAttributeValue from './category_attribute_value.js'

// export default class CategoryAttribute extends BaseModel {
//   @column({ isPrimary: true })
//   declare id: string

//   @column()
//   declare categoryId: string

//   @column()
//   declare name: string

//   @column()
//   declare slug: string

//   @column()
//   declare type: string

//   @column()
//   declare isRequired: boolean

//   @column()
//   declare isFilterable: boolean

//   @column()
//   declare position: number

//   @belongsTo(() => Category)
//   declare category: any

//   @hasMany(() => CategoryAttributeValue)
//   declare values: any
// }
