import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import User from './user.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Part from './part.js'
import Proposal from './proposal.js'
// import Bargain from './bargain.js'

export default class Order extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number

  @column()
  declare partId: number

  @column()
  declare quantity: number

  @column()
  declare proposalId: number

  @column()
  declare orderableType: string

  @column()
  declare orderableId: number

  @column()
  declare unitPrice: number

  @column()
  declare totalPrice: number

  @column()
  declare status: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column()
  declare vendorId: number

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @belongsTo(() => Part)
  declare part: BelongsTo<typeof Part>

  @belongsTo(() => Proposal)
  declare proposal: BelongsTo<typeof Proposal>

  @belongsTo(() => User, { foreignKey: 'vendorId' })
  declare vendor: BelongsTo<typeof User>

  // Polymorphic relationship - manually load the orderable
  async getOrderable() {
    if (this.orderableType === 'proposals') {
      const { default: Proposal } = await import('./proposal.js')
      return Proposal.find(this.orderableId)
    } else if (this.orderableType === 'bargains') {
      const { default: Bargain } = await import('./bargain.js')
      return Bargain.find(this.orderableId)
    }
    // For backward compatibility, check proposalId
    if (this.proposalId) {
      return Proposal.find(this.proposalId)
    }
    return null
  }
}