import Part from '#models/part'
import User from '#models/user'
import { formatPartResponse } from '#services/part'
import { partCreateValidator, partUpdateValidator } from '#validators/part'
import type { HttpContext } from '@adonisjs/core/http'

export default class PartsController {
  public async index({ request, response }: HttpContext) {
    try {
      const page = request.input('page', 1)
      const limit = request.input('limit', 10)
      const vendorId = request.input('vendorId', null)
      const partsPage = await Part.query()
        .orderBy('created_at', 'desc')
        .if(vendorId, (query) => {
          query.where('vendor_id', vendorId)
        })
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
      return response.ok({ message: 'Parts found', data: parts })
    } catch (e) {
      return response.badRequest({ message: 'Something went wrong', data: e })
    }
  }

  async show({ response, params }: HttpContext) {
    try {
      const part = await Part.findOrFail(params.id)
      return response.ok({ message: 'Part created', data: await formatPartResponse(part) })
    } catch (e) {
      return response.badRequest({ message: 'Part cannot be found', data: e })
    }
  }

  async store({ request, response, auth }: HttpContext) {
    try {
      const user = auth?.user as User
      if (user?.role !== 'vendor')
        return response.forbidden({ message: 'You are not a vendor', data: {} })
      const payload = await request.validateUsing(partCreateValidator)
      const part = await Part.create(payload)
      return response.ok({ message: 'Part created', data: await formatPartResponse(part) })
    } catch (e) {
      return response.badRequest({ message: 'Something went wrong', data: e })
    }
  }

  async update({ auth, request, params, response }: HttpContext) {
    try {
      const payload = await request.validateUsing(partUpdateValidator)
      const user = auth?.user as User
      if (user?.role !== 'vendor') return { message: 'You are not a vendor', data: {} }

      const part = await Part.findOrFail(params.id)

      part.merge(payload)
      await part.save()
      return response.ok({ message: 'Part Updated', data: await formatPartResponse(part) })
    } catch (e) {
      return response.badRequest({ message: 'Something went wrong', data: e })
    }
  }
}
