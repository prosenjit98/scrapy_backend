import Proposal from '#models/proposal'
import Order from '#models/order'

interface FormatterOptions {
  withComments: boolean;
}
export async function formatProposalResponse(proposal: Proposal, options?: FormatterOptions) {
  const { withComments } = options ?? {}
  await proposal.load((loader) => {
    if (proposal.vendorId) {
      loader.load('vendor', (vendorQuery) => {
        vendorQuery.select(['id', 'fullName'])
      })
    }
    loader.load('proposer', (proposerQuery) => {
      proposerQuery.select(['id', 'fullName'])
    })
    loader.load('inquiry', (inquiryQuery) => {
      inquiryQuery.select(['id', 'userId'])
    })
    if (withComments) {
      loader.load('comments', (commentQuery) => {
        commentQuery.select(['id', 'content', 'createdAt', 'userId']).orderBy('createdAt', 'asc')
          .preload('commenter', (userQuery) => {
            userQuery.select('fullName', 'email')
          })
      })
    }
  })

  const serialized = proposal.serialize()

  if (proposal.inquiry) {
    serialized.inquiryUserId = proposal.inquiry.userId
  }

  const existingOrder = await Order.query()
    .where('orderable_type', 'proposals')
    .where('orderable_id', proposal.id)
    .first()
  serialized.orderCreated = !!existingOrder

  return serialized
}
