import Inquiry from '#models/inquiry'
import type { HttpContext } from '@adonisjs/core/http'

export default class AdminInquiriesController {
  public async index({ inertia }: HttpContext) {
    return inertia.render('Admin/inquiries/index')
  }

  public async list({ request }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)

    const inquiriesPage = await Inquiry.query()
      .orderBy('created_at', 'desc')
      .preload('user', (userQuery) => {
        userQuery.select('fullName', 'email')
      })
      .paginate(page, limit)

    const inquiries = inquiriesPage.serialize()

    // Flatten user.fullName to user_fullName
    inquiries.data = inquiries.data.map((inquiry) => {
      return {
        ...inquiry,
        user_full_name: inquiry.user?.fullName ?? null,
        user_email: inquiry.user?.email ?? null,
      }
    })

    return inquiries
  }

  public async show({ params, inertia }: HttpContext) {
    const inquiry = await Inquiry.find(params.id)
    if (!inquiry) {
      return inertia.render('errors/not_found', { error: 'Inquiry not found' })
    }

    await inquiry.load('user', (userQuery) => {
      userQuery.select('fullName', 'email')
    })

    return inertia.render('Admin/inquiries/show', { inquiry: inquiry.serialize() })
  }

  public async update({ params, request, response, session }: HttpContext) {
    const inquiry = await Inquiry.find(params.id)

    if (!inquiry) {
      session.flash('error', 'Inquiry not found')
      return response.redirect().back()
    }

    const status = request.input('status')
    inquiry.status = status
    await inquiry.save()

    session.flash('success', 'Inquiry updated successfully')
    return response.redirect().toRoute('admin.inquiries.index')
  }
}
