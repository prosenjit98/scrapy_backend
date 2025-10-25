import vine from '@vinejs/vine'

const inquiryCreateValidator = vine.compile(
  vine.object({
    vehicleMake: vine.number().optional(),
    vehicleModel: vine.number().optional(),
    year: vine.number().optional(),
    partDescription: vine.string().trim(),
    user_id: vine.number(),
    title: vine.string().trim(),
    // vehicle_id: vine.number(),
  })
)
const inquiryUpdateValidator = vine.compile(
  vine.object({
    vehicleMake: vine.number().optional(),
    vehicleModel: vine.number().optional(),
    year: vine.number().optional(),
    partDescription: vine.string().trim().optional(),
    user_id: vine.number().optional(),
    title: vine.string().trim(),
    // vehicle_id: vine.number(),
  })
)
export { inquiryCreateValidator, inquiryUpdateValidator }
