import Vehicle from '#models/vehicle'
import type { HttpContext } from '@adonisjs/core/http'

export default class VehiclesController {
  /**
   * Display a list of resource
   */
  async index({ inertia }: HttpContext) {
    return inertia.render('Admin/vehicles/index')
  }

  /**
   * Display form to create a new record
   */
  public async list({ request }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)
    // const search = request.input('search', '')
    const vehiclesPage = await Vehicle.query()
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

    const vehicles = vehiclesPage.serialize()

    // Flatten vendor.fullName to vendor_fullName
    vehicles.data = vehicles.data.map((vehicle) => {
      return {
        ...vehicle,
        vendor_full_name: vehicle.vendor?.fullName ?? null,
        make: vehicle.make?.name ?? null,
        model: vehicle.model?.name ?? null,
      }
    })
    return vehicles
  }
}
