import vine from '@vinejs/vine'

const inquiryCreateValidator = vine.compile(
  vine.object({
    vehicle_make_id: vine.number().optional(),
    vehicle_model_id: vine.number().optional(),
    year: vine.number().optional(),
    description: vine.string().trim(),
    user_id: vine.number(),
  })
)
const inquiryUpdateValidator = vine.compile(
  vine.object({
    vehicle_make_id: vine.number().optional(),
    vehicle_model_id: vine.number().optional(),
    year: vine.number().optional(),
    description: vine.string().trim().optional(),
    user_id: vine.number().optional(),
  })
)
export { inquiryCreateValidator, inquiryUpdateValidator }
