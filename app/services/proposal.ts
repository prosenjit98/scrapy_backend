import Proposal from '#models/proposal'

export async function formatProposalResponse(proposal: Proposal) {
  await proposal.load((loader) => {
    loader
      .load('vendor', (vendorQuery) => {
        vendorQuery.select(['id', 'fullName']) // Select only needed fields
      })
      .load('part', (partQuery) => {
        partQuery
          .select(['id', 'name', 'vehicle_make_id', 'vehicle_model_id'])
          .preload('make', (makeQuery) => {
            makeQuery.select(['id', 'name'])
          })
          .preload('model', (modelQuery) => {
            modelQuery.select(['id', 'name'])
          })
      })
  })

  return proposal
}
