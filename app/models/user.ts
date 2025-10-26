import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, column, hasMany, hasOne, scope } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import Attachment from './attachment.js'
import type { HasMany, HasOne } from '@adonisjs/lucid/types/relations'
import Part from './part.js'
import Proposal from './proposal.js'
import Comment from './comment.js'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare fullName: string | null

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare password: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @column()
  declare role: 'user' | 'vendor'

  @column()
  declare address: string | null

  @column()
  declare phoneNumber: string | null

  @hasOne(() => Attachment, {
    foreignKey: 'attachableId',
    onQuery(query) {
      query.where('attachable_type', 'User')
    },
  })
  declare profilePicture: HasOne<typeof Attachment>

  @hasMany(() => Part, {})
  declare parts: HasMany<typeof Part>

  @hasMany(() => Proposal, {})
  declare proposals: HasMany<typeof Proposal>

  @hasMany(() => Comment, {})
  declare comments: HasMany<typeof Comment>

  // static async preComputeUrls(models: User | User[]) {
  //   if (Array.isArray(models)) {
  //     await Promise.all(models.map((model) => this.preComputeUrls(model)))
  //     return
  //   }
  //   console.log(models.avatar)
  //   // compute url for original file
  //   if (!models.avatar) return
  //   await attachmentManager.computeUrl(models.avatar)
  // }

  static accessTokens = DbAccessTokensProvider.forModel(User, {
    expiresIn: '30 days',
    prefix: 'oat_',
    table: 'auth_access_tokens',
    type: 'auth_token',
    tokenSecretLength: 40,
  })

  static vendors = scope((query) => {
    query.where('role', 'vendor')
  })

  static users = scope((query) => {
    query.where('role', 'user')
  })
}
