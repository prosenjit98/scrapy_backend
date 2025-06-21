import Part from '#models/part'

export async function formatPartResponse(part: Part) {
  await part.load((loader) => {
    loader.load('make').load('model').load('vendor')
  })

  const partRes = part.serialize()

  return {
    ...partRes,
    vendor_full_name: partRes.vendor?.fullName ?? null,
    make: partRes.make?.name ?? null,
    model: partRes.model?.name ?? null,
  }
}
