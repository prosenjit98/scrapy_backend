import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { signUpValidator } from '#validators/signup'

export default class AuthController {
  public async login({ request, auth, response }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])
    try {
      const user = await User.verifyCredentials(email, password)
      const token = await auth.use('api').createToken(user)

      return response.ok({
        role: user.role,
        token: token.toJSON(),
        user,
      })
    } catch {
      console.error('Login failed for:')
      return response.unauthorized({ message: 'Invalid credentials' })
    }
  }

  public async logout({ auth, response }: HttpContext) {
    await auth.use('api').invalidateToken()
    return response.ok({ message: 'Logged out successfully' })
  }

  async signup({ request, response }: HttpContext) {
    try {
      const payload = await request.validateUsing(signUpValidator)

      const user = await User.create(payload)
      const token = await User.accessTokens.create(user)

      return response.created({
        message: 'User registered successfully',
        token: token.value!.release(),
        user,
      })
    } catch (error) {
      return response.badRequest({
        message: 'Failed to register user',
        errors: error.messages,
      })
    }
  }
}
