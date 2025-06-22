import Proposal from '#models/proposal'
import type { HttpContext } from '@adonisjs/core/http'

export default class ProposalsController {
  public async index({ inertia }: HttpContext) {
    return inertia.render('Admin/proposals/index')
  }
  public async list({ request }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)
    const proposalPage = await Proposal.query()
      .orderBy('created_at', 'desc')
      .preload('vendor', (vehicleQuery) => {
        vehicleQuery.select('fullName')
      })
      .preload('proposer', (proposalQuery) => {
        proposalQuery.select('fullName')
      })
      .preload('part', (partQuery) => {
        partQuery
          .select(['id', 'name', 'vehicle_make_id', 'vehicle_model_id'])
          .preload('make', (makeQuery) => {
            makeQuery.select('name')
          })
          .preload('model', (modelQuery) => {
            modelQuery.select('name')
          })
      })
      .paginate(page, limit)

    const proposals = proposalPage.serialize()

    // Flatten vendor.fullName to vendor_fullName
    proposals.data = proposals.data.map((proposal) => {
      return {
        ...proposal,
        proposer_name: proposal.proposer?.fullName ?? null,
        vendor_full_name: proposal.vendor?.fullName ?? null,
        make: proposal.part?.make?.name ?? null,
        model: proposal.part?.model?.name ?? null,
      }
    })

    return proposals
  }
}
