[[-[---import Inquiry from '#models/inquiry'
import type { HttpContext } from '@adonisjs/core/http'
import VehicleMake from '#models/vehicle_make'
import VehicleModel from '#models/vehicle_model'

export default class InquiriesController {
  public async index({ inertia }: HttpContext) {
    return inertia.render('inquiries/index')
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

    return inquiriesPage.serialize()
  }

  public async new({ inertia }: HttpContext) {
    const vehicleMakes = await VehicleMake.all()
    const vehicleMakesData = vehicleMakes-.map(make => ({ id: make.id, name: make.name }))
    const vehicleModels = await VehicleModel.all()
    const vehicleModelsData = vehicleModels.map(model => ({ id: model.id, name: model.name }))
    console.log('Vehicle Makes:', vehicleMakesData)
    console.log('Vehicle Models:', vehicleModelsData)
    // Pass vehicleMakes and vehicleModels to the Inertia page
    return inertia.render('inquiries/new', { vehicleMakes: vehicleMakesData, vehicleModels: vehicleModelsData })
  }
  

  public async create({ request, inertia }: HttpContext) {
    const inquiryData = request.only([ 'user_id', 'vehicleMake', 'vehicleModel', 'partDescription', 'year' ])
    const inquiry = await Inquiry.create(inquiryData)
    return inertia.redirect('/inquiries')
  }
  public async edit({ params, inertia }: HttpContext) {
    const inquiry = await Inquiry.find(params.id)
    if (!inquiry) {
      return inertia.render('errors/not_found', { error: 'Inquiry not found' })
    }

    await inquiry.load('user', (userQuery) => {
      userQuery.select('fullName', 'email')
    })

    return inertia.render('inquiries/edit', { inquiry: inquiry.serialize() })
  }
  public async show({ params, inertia }: HttpContext) {
    const inquiry = await Inquiry.find(params.id)
    if (!inquiry) {
      return inertia.render('errors/not_found', { error: 'Inquiry not found' })
    }

    await inquiry.load('user', (userQuery) => {
      userQuery.select('fullName', 'email')
    })

    return inertia.render('inquiries/show', { inquiry: inquiry.serialize() })
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
    return response.redirect().toRoute('inquiries.index')
  }
}