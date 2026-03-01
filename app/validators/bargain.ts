import vine from '@vinejs/vine'

const bargainCreateValidator = vine.compile(
  vine.object({
    description: vine.string().trim(),
    price: vine.number(),
    part_id: vine.number(),
    proposer_id: vine.number(),
    quantity: vine.number().optional(),
    vendor_id: vine.number().optional(),
  })
)

const bargainUpdateValidator = vine.compile(
  vine.object({
    description: vine.string().trim().optional(),
    price: vine.number().optional(),
    part_id: vine.number().optional(),
    proposer_id: vine.number().optional(),
    quantity: vine.number().optional(),
    vendor_id: vine.number().optional(),
    is_self_accepted: vine.boolean().optional(),
    is_other_accepted: vine.boolean().optional(),
  })
)

export { bargainCreateValidator, bargainUpdateValidator }
