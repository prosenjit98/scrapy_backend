import vine from '@vinejs/vine'

const signUpValidator = vine.compile(
  vine.object({
    fullName: vine.string().trim(),
    email: vine.string().trim().email().unique({ table: 'users', column: 'email' }),
    password: vine.string(),
    role: vine.enum(['user', 'vendor']),
    phoneNumber: vine.string().mobile(),
  })
)

export { signUpValidator }
