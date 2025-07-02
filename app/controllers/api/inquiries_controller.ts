import Inquiry from '#models/inquiry'
import { inquiryCreateValidator, inquiryUpdateValidator } from '#validators/inquiry'
import type { HttpContext } from '@adonisjs/core/http'

export default class InquiriesController {
  public async index({ response, request }: HttpContext) {
    try {
      const page = request.input('page', 1)
      const limit = request.input('limit', 10)
      const userId = request.input('userId', null)
      const inquiriesPage = await Inquiry.query()
        .orderBy('created_at', 'desc')
        .if(userId, (query) => {
          query.where('user_id', userId)
        })
        .preload('user', (userQuery) => {
          userQuery.select('fullName', 'email')
        })
        .paginate(page, limit)
      return response.ok({ message: 'Inquiries fetched successfully', data: inquiriesPage })
    } catch (e) {
      console.error(e)
      return response.badRequest({ message: 'Something went wrong', data: e })
    }
  }
  public async show({ params, response }: HttpContext) {
    try {
      const inquiry = await Inquiry.findOrFail(params.id)
      return response.ok({ message: 'Inquiry fetched successfully', data: inquiry })
    } catch (e) {
      console.error(e)
      return response.badRequest({ message: 'Something went wrong', data: e })
    }
  }

  public async store({ request, response }: HttpContext) {
    try {
      const payload = await request.validateUsing(inquiryCreateValidator)
      const inquiry = await Inquiry.create(payload)
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
