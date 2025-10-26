import Inquiry from '#models/inquiry'
import { inquiryCreateValidator, inquiryUpdateValidator } from '#validators/inquiry'
import Attachment from '#models/attachment'
import type { HttpContext } from '@adonisjs/core/http'

export default class InquiriesController {
  public async index({ response, request }: HttpContext) {
    try {
      const page = request.input('page', 1)
      const limit = request.input('limit', 20)
      const userId = request.input('userId', null)
      const Inquiries = Inquiry.query()
        .orderBy('created_at', 'desc')
        .if(userId, (query) => {
          query.where('user_id', userId)
        })
        .preload('user', (userQuery) => {
          userQuery.select('fullName', 'email')
        })
        .preload('make', (makeQuery) => {
          makeQuery.select('name')
        })
        .preload('model', (makeQuery) => {
          makeQuery.select('name')
        })

      const withAttachment = request.input('withAttachment', false);
      if (withAttachment) {
        Inquiries.preload('attachments');
      }
      const inquiriesPage = await Inquiries.paginate(page, limit)

      await Promise.all(
        inquiriesPage.all().map(async (inquiry) => {
          await inquiry.loadCount('proposals');
        })
      );

      return response.ok({ message: 'Inquiries fetched successfully', data: inquiriesPage })
    } catch (e) {
      console.error(e)
      return response.badRequest({ message: 'Something went wrong', data: e })
    }
  }

  public async show({ params, response }: HttpContext) {
    try {
      const inquiry = await Inquiry.findOrFail(params.id)
      inquiry.load('user', (userQuery) => {
        userQuery.select('fullName', 'email')
      })
      await inquiry.load('make', (makeQuery) => {
        makeQuery.select('name')
      })
      await inquiry.load('model', (makeQuery) => {
        makeQuery.select('name')
      })
      await inquiry.load('attachments')

      return response.ok({ message: 'Inquiry fetched successfully', data: inquiry })
    } catch (e) {
      console.error(e)
      return response.badRequest({ message: 'Something went wrong', data: e })
    }
  }

  public async store({ request, response }: HttpContext) {
    try {
      const attachments = request.files('images')!
      const payload = await request.validateUsing(inquiryCreateValidator)
      // const vehicle = await Vehicle.findOrFail(payload.vehicle_id)
      const inquiry = await Inquiry.create({ ...payload })
      if (attachments && attachments.length > 0) {
        for (const attachment of attachments) {
          if (attachment.isValid) {
            await Attachment.attach(inquiry, attachment)
          }
        }
      }
      return response.ok({ message: 'Inquiry created successfully', data: inquiry })
    } catch (e) {
      console.error(e)
      return response.badRequest({ message: 'Something went wrong', data: e })
    }
  }
  public async update({ params, request, response }: HttpContext) {
    try {
      const inquiry = await Inquiry.findOrFail(params.id)
      const payload = await request.validateUsing(inquiryUpdateValidator)
      inquiry.merge(payload)
      await inquiry.save()
      const attachments = request.files('images')!
      if (attachments && attachments.length > 0) {
        for (const attachment of attachments) {
          if (attachment.isValid) {
            await Attachment.attach(inquiry, attachment)
          }
        }
      }
      return response.ok({ message: 'Inquiry updated successfully', data: inquiry })
    } catch (e) {
      console.error(e)
      return response.badRequest({ message: 'Something went wrong', data: e })
    }
  }
  public async destroy({ params, response }: HttpContext) {
    try {
      const inquiry = await Inquiry.findOrFail(params.id)
      await inquiry.delete()
      return response.ok({ message: 'Inquiry deleted successfully', data: inquiry })
    } catch (e) {
      console.error(e)
      return response.badRequest({ message: 'Something went wrong', data: e })
    }
  }
}
