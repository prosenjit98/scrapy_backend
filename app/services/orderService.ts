

import Order from '#models/order'

export const formatOrderResponse = async (order: Order, options?: { withParts?: boolean; withVendor?: boolean, withProposal?: boolean }) => {
  const { withParts, withVendor, withProposal } = options!

  await order.load('user')
  if (withVendor) await order.load('vendor')
  let part
  if (withParts) {
    part = order.part
    await part?.load('make')
    await part?.load('model')
  }

  return {
    id: order.id,
    totalPrice: order.totalPrice,
    status: order.status,
    user: order.user?.fullName ?? null,
    vendor: withVendor ? order.vendor?.fullName ?? null : null,
    part: withParts && part ? {
      id: part.id,
      name: part.name,
      vehicleMakeId: part.vehicleMakeId,
      vehicleModelId: part.vehicleModelId,
      vehicleMake: part.make ? {
        id: part.make.id,
        name: part.make.name,
      } : null,
      vehicleModel: part.model ? {
        id: part.model.id,
        name: part.model.name,
      } : null,
    } : null,
    proposal: withProposal ? order.proposalId ?? null : null,
  }
}
