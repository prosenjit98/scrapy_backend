import vine from '@vinejs/vine'

const orderCreateValidator = vine.compile(
  vine.object({
    userId: vine.number(),
    partId: vine.number().optional(),
    quantity: vine.number().optional(),
    proposalId: vine.number().optional(),
    unitPrice: vine.number(),
    totalPrice: vine.number(),
    status: vine.string().optional(),
  })
)

export { orderCreateValidator }