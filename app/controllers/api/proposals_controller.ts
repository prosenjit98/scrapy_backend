import Proposal from '#models/proposal'
import { formatProposalResponse } from '#services/proposal'
import { proposalCreateValidator, proposalUpdateValidator } from '#validators/proposal'
import type { HttpContext } from '@adonisjs/core/http'

export default class ProposalsController {
  public async index({ request, response }: HttpContext) {
    try {
      const page = request.input('page', 1)
      const limit = request.input('limit', 10)
      const vendorId = request.input('vendorId', null)
      const userId = request.input('userId', null)
      const proposalsPage = await Proposal.query()
        .orderBy('created_at', 'desc')
        .if(vendorId, (query) => {
          query.where('vendor_id', vendorId)
        })
        .if(userId, (query) => {
          query.where('proposer_id', userId)
        })
        .preload('vendor', (vehicleQuery) => {
          vehicleQuery.select('fullName')
        })
        .preload('proposer', (proposalQuery) => {
          proposalQuery.select('fullName')
        })
        .preload('part', (vehicleQuery) => {
          vehicleQuery
            .select('name')
            .as('vehicle_model')
            .preload('make', (makeQuery) => {
              makeQuery.select('name')
            })
            .preload('model', (modelQuery) => {
              modelQuery.select('name')
            })
        })
        .paginate(page, limit)

      const parts = proposalsPage.serialize()

      return response.ok({ message: 'Proposals found', data: parts })
    } catch (e) {
      return response.badRequest({ message: 'Something went wrong', data: e })
    }
  }

  async show({ response, params }: HttpContext) {
    try {
      const proposal = await Proposal.findOrFail(params.id)
      return response.ok({
        message: 'Proposal created',
        data: await formatProposalResponse(proposal),
      })
    } catch (e) {
      return response.badRequest({ message: 'Proposal cannot be found', data: e })
    }
  }

  async store({ request, response }: HttpContext) {
    try {
      const payload = await request.validateUsing(proposalCreateValidator)
      const proposal = await Proposal.create(payload)
      return response.ok({
        message: 'Proposal created',
        data: await formatProposalResponse(proposal),
      })
    } catch (e) {
      return response.badRequest({ message: 'Something went wrong', data: e })
    }
  }

  async update({ request, params, response }: HttpContext) {
    try {
      const payload = await request.validateUsing(proposalUpdateValidator)

      const proposal = await Proposal.findOrFail(params.id)

      proposal.merge(payload)
      await proposal.save()
      return response.ok({
        message: 'Proposal Updated',
        data: await formatProposalResponse(proposal),
      })
    } catch (e) {
      return response.badRequest({ message: 'Something went wrong', data: e })
    }
  }
}
