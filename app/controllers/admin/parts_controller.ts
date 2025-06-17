import Part from '#models/part'
import type { HttpContext } from '@adonisjs/core/http'

export default class PartsController {
  /**
   * Display a list of resource
   */
  async index({ inertia }: HttpContext) {
    return inertia.render('Admin/parts/index')
  }

  /**
   * Display form to create a new record
   */
  public async list({ request }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)
    // const search = request.input('search', '')
    const partsPage = await Part.query()
      .orderBy('created_at', 'desc')
      .preload('vendor', (vehicleQuery) => {
        vehicleQuery.select('fullName')
      })
      .preload('model', (vehicleQuery) => {
        vehicleQuery.select('name').as('vehicle_model')
      })
      .preload('make', (vehicleMake) => {
        vehicleMake.select('name').as('vehicle_make')
      })
      .paginate(page, limit)

    const parts = partsPage.serialize()

    // Flatten vendor.fullName to vendor_fullName
    parts.data = parts.data.map((part) => {
      return {
        ...part,
        vendor_full_name: part.vendor?.fullName ?? null,
        make: part.make?.name ?? null,
        model: part.model?.name ?? null,
      }
    })
    return parts
  }
}
