import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { signUpValidator } from '#validators/signup'
import Attachment from '#models/attachment'

export default class AuthController {
  public async login({ request, auth, response }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])
    try {
      const user = await User.verifyCredentials(email, password)
      const token = await auth.use('api').createToken(user)

      return response.ok({
        message: 'User registered successfully',
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
      const avatar = request.file('avatar')!
      const payload = await request.validateUsing(signUpValidator)

      const user = await User.create(payload)

      if (avatar) {
        const existingPic = await user.related('profilePicture').query().first()
        if (existingPic) {
          existingPic.delete()
        }
        await Attachment.attach(user, avatar)
      }

      await user.load('profilePicture')
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
