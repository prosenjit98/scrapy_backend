import Part from '#models/part'

export async function formatPartResponse(part: Part) {
  await part.load((loader) => {
    loader.load('make').load('model').load('vendor')
  })


  await part.load('images')
  const partRes = part.serialize()

  return {
    ...partRes,
    vendor_full_name: partRes.vendor?.fullName ?? null,
  }
}
