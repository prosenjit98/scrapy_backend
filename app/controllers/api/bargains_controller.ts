import Part from '#models/part'
import Bargain from '#models/bargain'
import { formatBargainResponse } from '#services/bargainService'
import { bargainCreateValidator, bargainUpdateValidator } from '#validators/bargain'
import type { HttpContext } from '@adonisjs/core/http'

export default class BargainsController {
  public async index({ request, response }: HttpContext) {
    try {
      const page = request.input('page', 1)
      const limit = request.input('limit', 100)
      const vendorId = request.input('vendorId', null)
      const partId = request.input('partId', null)
      const userId = request.input('userId', null)
      const withComments = request.input('withComments', false)

      const bargains = Bargain.query()
        .orderBy('created_at', 'desc')
        .if(vendorId, (query) => {
          query.where('vendor_id', vendorId)
        })
        .if(userId, (query) => {
          query.where('proposer_id', userId)
        })
        .if(partId, (query) => {
          query.where('part_id', partId)
        })
        .preload('vendor', (vendorQuery) => {
          vendorQuery.select('fullName')
        })
        .preload('proposer', (proposerQuery) => {
          proposerQuery.select('fullName')
        })

      if (withComments) {
        bargains.preload('comments', (commentQuery) => {
          commentQuery
            .orderBy('created_at', 'desc')
            .preload('commenter', (userQuery) => {
              userQuery.select('fullName', 'email')
            })
        })
      }

      bargains.preload('part', (partQuery) => {
        partQuery.select(['id', 'name', 'vehicle_make_id', 'vehicle_model_id'])
          .preload('make', (makeQuery) => {
            makeQuery.select(['id', 'name'])
          })
          .preload('model', (modelQuery) => {
            modelQuery.select(['id', 'name'])
          })
      })

      const bargainsPage = await bargains.paginate(page, limit)
      const bargainsData = bargainsPage.serialize()

      return response.ok({ message: 'Bargains found', data: bargainsData })
    } catch (e) {
      return response.badRequest({ message: 'Something went wrong', data: e })
    }
  }

  async show({ response, params, request }: HttpContext) {
    try {
      const withComments = request.input('withComments', false)
      const bargain = await Bargain.findOrFail(params.id)
      const data = await formatBargainResponse(bargain, { withComments })
      return response.ok({
        message: 'Bargain Found',
        data: data,
      })
    } catch (e) {
      console.log(e)
      return response.badRequest({ message: 'Bargain cannot be found', data: e })
    }
  }

  async store({ request, response }: HttpContext) {
    try {
      const payload = await request.validateUsing(bargainCreateValidator)
      let bargainExisting

      if (!!payload.part_id) {
        bargainExisting = await Bargain.findBy({
          partId: payload.part_id,
          proposerId: payload.proposer_id,
        })
      }

      if (!!bargainExisting) {
        return response.badRequest({
          message: 'Bargain already exists for this part and proposer',
          data: {},
        })
      }

      if (!!payload.part_id) {
        payload.vendor_id = (await Part.findOrFail(payload.part_id)).vendorId
      }

      const bargain = await Bargain.create(payload)
      return response.ok({
        message: 'Bargain created',
        data: await formatBargainResponse(bargain, { withComments: true }),
      })
    } catch (e) {
      console.log(e)
      return response.badRequest({ message: 'Something went wrong', data: e })
    }
  }

  async update({ request, params, response }: HttpContext) {
    try {
      const withComments = request.input('withComments', true)
      const payload = await request.validateUsing(bargainUpdateValidator)

      const bargain = await Bargain.findOrFail(params.id)

      bargain.merge(payload)
      await bargain.save()
      return response.ok({
        message: 'Bargain Updated',
        data: await formatBargainResponse(bargain, { withComments }),
      })
    } catch (e) {
      return response.badRequest({ message: 'Something went wrong', data: e })
    }
  }

  async destroy({ response, params }: HttpContext) {
    try {
      const bargain = await Bargain.findOrFail(params.id)
      await bargain.delete()
      return response.ok({ message: 'Bargain deleted' })
    } catch (e) {
      return response.badRequest({ message: 'Something went wrong', data: e })
    }
  }
}
