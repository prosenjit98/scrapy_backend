import vine from '@vinejs/vine'

const orderCreateValidator = vine.compile(
  vine.object({
    userId: vine.number(),
    vendorId: vine.number(),
    partId: vine.number().optional(),
    quantity: vine.number().optional(),
    proposalId: vine.number().optional(),
    bargainId: vine.number().optional(),
    orderableType: vine.string().optional(),
    orderableId: vine.number().optional(),
    unitPrice: vine.number(),
    totalPrice: vine.number(),
    status: vine.string().optional(),
  })
)

const orderUpdateValidator = vine.compile(
  vine.object({
    userId: vine.number().optional(),
    vendorId: vine.number().optional(),
    partId: vine.number().optional(),
    quantity: vine.number().optional(),
    proposalId: vine.number().optional(),
    bargainId: vine.number().optional(),
    orderableType: vine.string().optional(),
    orderableId: vine.number().optional(),
    unitPrice: vine.number().optional(),
    totalPrice: vine.number().optional(),
    status: vine.string().optional(),
  })
)

export { orderCreateValidator, orderUpdateValidator }