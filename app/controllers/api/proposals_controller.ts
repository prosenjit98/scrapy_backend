import Inquiry from '#models/inquiry'
import Part from '#models/part'
import Proposal from '#models/proposal'
import { formatProposalResponse } from '#services/proposalService'
import { proposalCreateValidator, proposalUpdateValidator } from '#validators/proposal'
import type { HttpContext } from '@adonisjs/core/http'

export default class ProposalsController {
  public async index({ request, response }: HttpContext) {
    try {
      const page = request.input('page', 1)
      const limit = request.input('limit', 100)
      const vendorId = request.input('vendorId', null)
      const inquiryId = request.input('inquiryId', null)
      const userId = request.input('userId', null)
      // const withParts = request.input('withParts', false);
      const withComments = request.input('withComments', false);

      const proposals = Proposal.query()
        .orderBy('created_at', 'desc')
        .if(vendorId, (query) => {
          query.where('vendor_id', vendorId)
        })
        .if(userId, (query) => {
          query.where('proposer_id', userId)
        })
        .if(inquiryId, (query) => {
          query.where('inquiry_id', inquiryId)
        })
        .preload('vendor', (vehicleQuery) => {
          vehicleQuery.select('fullName')
        })
        .preload('proposer', (proposalQuery) => {
          proposalQuery.select('fullName')
        })
        .preload('inquiry', (inquiryQuery) => {
          inquiryQuery.select('id', 'userId')
        })
      // if (withParts) {
      //   proposals.preload('part', (vehicleQuery) => {
      //     vehicleQuery
      //       .select('name', 'vehicleMakeId', 'vehicleModelId')
      //       .as('vehicle_model')
      //       .preload('make', (makeQuery) => {
      //         makeQuery.select('name')
      //       })
      //       .preload('model', (modelQuery) => {
      //         modelQuery.select('name')
      //       })
      //   })
      // }

      if (withComments) {
        proposals.preload('comments', (commentQuery) => {
          commentQuery
            .orderBy('created_at', 'desc')
            .preload('commenter', (userQuery) => {
              userQuery.select('fullName', 'email')
            })
        })
      }

      const proposalsPage = await proposals.paginate(page, limit)
      const parts = proposalsPage.serialize()

      return response.ok({ message: 'Proposals found', data: parts })
    } catch (e) {
      return response.badRequest({ message: 'Something went wrong', data: e })
    }
  }

  async show({ response, params, request }: HttpContext) {
    try {
      const withParts = request.input('withParts', false);
      const withComments = request.input('withComments', false);
      const proposal = await Proposal.findOrFail(params.id)
      const data = await formatProposalResponse(proposal, { withComments })
      return response.ok({
        message: 'Proposal Found',
        data: data,
      })
    } catch (e) {
      console.log(e)
      return response.badRequest({ message: 'Proposal cannot be found', data: e })
    }
  }

  async store({ request, response }: HttpContext) {
    try {
      const payload = await request.validateUsing(proposalCreateValidator)
      let proposalExisting
      if (!!payload.inquiry_id) {
        proposalExisting = await Proposal.findBy({ inquiryId: payload.inquiry_id, proposerId: payload.proposer_id })
      }
      // else if (!!payload.part_id) {
      //   proposalExisting = await Proposal.findByOrFail({ partId: payload.part_id, proposerId: payload.proposer_id })
      // }
      if (!!proposalExisting) {
        return response.badRequest({ message: 'Proposal already exists for this inquiry and proposer', data: {} })
      }
      if (!!payload.part_id) {
        payload.vendor_id = (await Part.findOrFail(payload.part_id)).vendorId
      }
      const proposal = await Proposal.create(payload)
      return response.ok({
        message: 'Proposal created',
        data: await formatProposalResponse(proposal, { withComments: true }),
      })
    } catch (e) {
      console.log(e)
      return response.badRequest({ message: 'Something went wrong', data: e })
    }
  }

  async update({ request, params, response, auth }: HttpContext) {
    try {
      const withComments = request.input('withComments', true);
      const payload = await request.validateUsing(proposalUpdateValidator)

      const proposal = await Proposal.findOrFail(params.id)
      await proposal.load('inquiry')

      const currentUserId = auth.user!.id
      const isProposer = currentUserId === proposal.proposerId
      const isInquiryCreator = currentUserId === proposal.inquiry.userId

      // Authorization: only inquiry creator can set is_other_accepted
      if (payload.is_other_accepted !== undefined && !isInquiryCreator) {
        return response.forbidden({ message: 'Only the inquiry creator can accept/reject proposals' })
      }

      // Authorization: only proposer (vendor) can set is_self_accepted
      if (payload.is_self_accepted !== undefined && !isProposer) {
        return response.forbidden({ message: 'Only the proposer can accept/reject their proposal' })
      }

      // Flow enforcement: vendor can only accept after inquiry creator has accepted
      if (payload.is_self_accepted === true && !proposal.isOtherAccepted) {
        return response.badRequest({ message: 'The inquiry creator must accept the proposal first' })
      }

      proposal.merge(payload)
      await proposal.save()

      // Update inquiry status when both parties have accepted
      if (proposal.isSelfAccepted && proposal.isOtherAccepted && proposal.inquiryId) {
        const inquiry = await Inquiry.find(proposal.inquiryId)
        if (inquiry && inquiry.status !== 'accepted') {
          inquiry.status = 'accepted'
          await inquiry.save()
        }
      }

      return response.ok({
        message: 'Proposal Updated',
        data: await formatProposalResponse(proposal, { withComments }),
      })
    } catch (e) {
      return response.badRequest({ message: 'Something went wrong', data: e })
    }
  }
}
