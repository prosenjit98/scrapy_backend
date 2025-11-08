import vine from '@vinejs/vine'

const orderCreateValidator = vine.compile(
  vine.object({
    user_id: vine.number(),
    part_id: vine.number().optional(),
    quantity: vine.number().optional(),
    proposal_id: vine.number().optional(),
    unit_price: vine.number(),
    total_price: vine.number(),
    status: vine.string().optional(),
  })
)

export { orderCreateValidator }