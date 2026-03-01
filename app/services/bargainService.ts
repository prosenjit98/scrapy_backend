import Bargain from '#models/bargain'

interface FormatterOptions {
  withComments: boolean;
}

export async function formatBargainResponse(bargain: Bargain, options?: FormatterOptions) {
  const { withComments } = options!
  await bargain.load((loader) => {
    if (bargain.vendorId) {
      loader.load('vendor', (vendorQuery) => {
        vendorQuery.select(['id', 'fullName'])
      })
    }
    loader.load('proposer', (proposerQuery) => {
      proposerQuery.select(['id', 'fullName'])
    })
    loader.load('part', (partQuery) => {
      partQuery
        .select(['id', 'name', 'vehicle_make_id', 'vehicle_model_id'])
        .preload('make', (makeQuery) => {
          makeQuery.select(['id', 'name']);
        })
        .preload('model', (modelQuery) => {
          modelQuery.select(['id', 'name']);
        });
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

  return bargain
}
