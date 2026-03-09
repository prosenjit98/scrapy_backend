import Part from '#models/part'

export async function formatPartResponse(part: Part) {
  await part.load((loader) => {
    loader.load('make', (makeQuery) => {
      makeQuery.preload('category')
    }).load('model').load('vendor').load('images')
  })

  const partRes = part.serialize()

  return {
    ...partRes,
    vendor_full_name: partRes.vendor?.fullName ?? null,
  }
}
