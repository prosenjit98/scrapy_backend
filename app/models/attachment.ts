import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'
import { attachment, attachmentManager } from '@jrmc/adonis-attachment'
import type { Attachment as OrmAttachment } from '@jrmc/adonis-attachment/types/attachment'

export default class Attachment extends BaseModel {
  @column({ isPrimary: true, serializeAs: null })
  declare id: number

  @column({ serializeAs: null })
  public attachableType: string | undefined

  @column({ serializeAs: null })
  public attachableId: number | undefined

  @attachment({
    preComputeUrl: true,
    serialize: (value?: OrmAttachment) => (value ? { url: value?.url, name: value?.name } : null),
  })
  declare file: OrmAttachment | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime // 🔧 Attach a file to any model

  public static async attach(model: any, uploadedFile: any) {
    const attachmentInstance = new Attachment()
    const avatarAttachment = await attachmentManager.createFromFile(uploadedFile)
    attachmentInstance.file = avatarAttachment
    attachmentInstance.attachableType = model.constructor.name
    attachmentInstance.attachableId = model.id
    await attachmentInstance.save()
    return attachmentInstance
  }

  // 📂 Get all attachments for a model
  public static async for(model: any) {
    return this.query()
      .where('attachable_type', model.constructor.name)
      .andWhere('attachable_id', model.id)
  }
}
