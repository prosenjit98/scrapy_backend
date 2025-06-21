import Vehicle from '#models/vehicle'
import VehicleMake from '#models/vehicle_make'
import VehicleModel from '#models/vehicle_model'
import type { HttpContext } from '@adonisjs/core/http'

export default class VehiclesController {
  public async index({ response }: HttpContext) {
    const vehiclesPage = await Vehicle.query()
      .preload('vendor', (vehicleQuery) => {
        vehicleQuery.select('fullName').as('vendor_full_name')
      })
      .preload('model', (vehicleQuery) => {
        vehicleQuery.select('name').as('vehicle_model')
      })
      .preload('make', (vehicleMake) => {
        vehicleMake.select('name').as('vehicle_make')
      })
      .orderBy('id', 'asc')
      .paginate(1, 100000)

    const vehicles = vehiclesPage.serialize()

    vehicles.data = vehicles.data.map((vehicle) => {
      return {
        ...vehicle,
        vendor_full_name: vehicle.vendor?.fullName ?? null,
        make: vehicle.vehicle_make ?? null,
        model: vehicle.model?.name ?? null,
      }
    })
    return response.ok({ message: 'Vehicles found', data: vehicles })
  }

  public async models({ response }: HttpContext) {
    const vehicleModels = await VehicleModel.all()
    return response.ok({ message: 'Models found', data: vehicleModels })
  }

  public async makes({ response }: HttpContext) {
    const vehicleModels = await VehicleMake.all()
    return response.ok({ message: 'Makes found', data: vehicleModels })
  }
}
