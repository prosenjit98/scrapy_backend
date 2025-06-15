import VehicleModel from '#models/vehicle_model'
import type { HttpContext } from '@adonisjs/core/http'

export default class VehicleModelsController {
  /**
   * Display a list of resource
   */
  async index({ inertia }: HttpContext) {
    return inertia.render('Admin/vehicle_models/index')
  }

  public async list({ request }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)
    const search = request.input('search', '')

    // const usersQuery = User.query()
    // if (search) {
    //   usersQuery.whereILike('fullName', `%${search}%`)
    // }
    // const users = await usersQuery.paginate(page, 10)
    const models = await VehicleModel.query()
      .orderBy('created_at', 'desc')
      .if(search, (query) => {
        query.whereILike('name', `%${search}%`)
      })
      .paginate(page, limit)

    return models
  }

  /**
   * Display form to create a new record
   */
  async create({ inertia }: HttpContext) {
    return inertia.render('Admin/vehicle_models/create')
  }

  /**
   * Handle form submission for the create action
   */
  public async store({ request, response, session }: HttpContext) {
    const data = request.only(['name'])
    await VehicleModel.create(data)
    session.flash('success', 'Vehicle make created successfully')
    return response.redirect('/admin/vehicle_models')
  }

  /**
   * Edit individual record
   */
  async edit({ params, inertia }: HttpContext) {
    const make = await VehicleModel.findOrFail(params.id)
    return inertia.render('Admin/vehicle_models/edit', { make })
  }

  /**
   * Handle form submission for the edit action
   */

  public async update({ params, request, response, session }: HttpContext) {
    const user = await VehicleModel.findOrFail(params.id)
    user.merge(request.only(['name']))
    await user.save()
    session.flash('success', 'Model Updated successfully')
    return response.redirect('/admin/vehicle_models')
  }
}
