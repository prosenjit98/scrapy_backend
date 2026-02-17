import Proposal from '#models/proposal'

interface FormatterOptions {
  withParts: boolean;
  withComments: boolean;
}
export async function formatProposalResponse(proposal: Proposal, options?: FormatterOptions) {
  const { withParts, withComments } = options!
  await proposal.load((loader) => {
    if (proposal.vendorId) {
      loader.load('vendor', (vendorQuery) => {
        vendorQuery.select(['id', 'fullName']) // Select only needed fields
      })
    }
    loader.load('proposer', (proposerQuery) => {
      proposerQuery.select(['id', 'fullName'])
    })
    if (withComments) {
      loader.load('comments', (commentQuery) => {
        commentQuery.select(['id', 'content', 'createdAt', 'userId']).orderBy('createdAt', 'asc')
          .preload('commenter', (userQuery) => {
            userQuery.select('fullName', 'email')
          })
      })
    }
    if (withParts) {
      loader.load('part', (partQuery) => {
        partQuery
          .select(['id', 'name', 'vehicle_make_id', 'vehicle_model_id'])
          .preload('make', (makeQuery) => {
            makeQuery.select(['id', 'name']);
          })
          .preload('model', (modelQuery) => {
            modelQuery.select(['id', 'name']);
          });
      });
    }
  })

  return proposal
}
