import vine from '@vinejs/vine'

const vendorReviewCreateValidator = vine.compile(
  vine.object({
    vendor_id: vine.number(),
    rating: vine.number().min(1).max(5),
    comment: vine.string().trim().optional(),
  })
)

const vendorReviewUpdateValidator = vine.compile(
  vine.object({
    rating: vine.number().min(1).max(5).optional(),
    comment: vine.string().trim().optional(),
    status: vine.enum(['active', 'hidden', 'rejected']).optional(),
    flagged: vine.boolean().optional(),
    flag_reason: vine.string().trim().optional(),
  })
)

export { vendorReviewCreateValidator, vendorReviewUpdateValidator }
