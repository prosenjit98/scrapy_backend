import vine from '@vinejs/vine'

const proposalCreateValidator = vine.compile(
  vine.object({
    description: vine.string().trim(),
    price: vine.number(),
    part_id: vine.number().optional(),
    inquiry_id: vine.number().optional(),
    proposer_id: vine.number(),
    quantity: vine.number().optional(),
    vendor_id: vine.number().optional(),
  })
)

const proposalUpdateValidator = vine.compile(
  vine.object({
    description: vine.string().trim().optional(),
    price: vine.number().optional(),
    part_id: vine.number().optional(),
    inquiry_id: vine.number().optional(),
    proposer_id: vine.number().optional(),
    quantity: vine.number().optional(),
    vendor_id: vine.number().optional(),
    is_accepted: vine.boolean().optional(),
  })
)

export { proposalCreateValidator, proposalUpdateValidator }
