import vine from '@vinejs/vine'

const partCreateValidator = vine.compile(
  vine.object({
    name: vine.string().trim(),
    vehicle_make_id: vine.number(),
    vehicle_model_id: vine.number(),
    description: vine.string().trim(),
    condition: vine.enum(['new', 'used', 'refurbished']),
    price: vine.number(),
    is_available: vine.boolean(),
    stock: vine.number().nullable(),
    vendorId: vine.number(),
  })
)

const partUpdateValidator = vine.compile(
  vine.object({
    name: vine.string().trim().optional(),
    vehicle_make_id: vine.number().optional(),
    vehicle_model_id: vine.number().optional(),
    description: vine.string().trim().optional(),
    condition: vine.enum(['new', 'used', 'refurbished']).optional(),
    price: vine.number().optional(),
    is_available: vine.boolean().optional(),
    stock: vine.number().nullable().optional(),
    vendor_id: vine.number().optional(),
  })
)

export { partCreateValidator, partUpdateValidator }
