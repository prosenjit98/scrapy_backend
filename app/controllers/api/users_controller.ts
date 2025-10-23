import Attachment from '#models/attachment'
import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class UsersController {
  public async show({ auth, response }: HttpContext) {
    console.log("----------------- show user -------------------")
    const user = auth?.user as User
    try {
      if (user?.id) {
        await user.load('profilePicture')
      }
      // await User.preComputeUrls(user as User)
      return response.ok({ message: 'Dashboard data', data: user ?? {} })
    } catch (e) {
      return response.badRequest({ message: 'Something went wrong', data: e })
    }
  }

  public async update({ request, auth, response }: HttpContext) {
    const user = auth?.user as User
    try {
      if (user?.id) {
        user?.merge(request.only(['fullName', 'email', 'password', 'role', 'phoneNumber']))
        await user.save()
        const avatar = request.file('avatar')!
        if (avatar) {
          const existingPic = await user.related('profilePicture').query().first()
          if (existingPic) {
            existingPic.delete()
          }
          await Attachment.attach(user, avatar)
        }
        await user.load('profilePicture')
      }
      // await User.preComputeUrls(user as User)
      return response.ok({ message: 'Dashboard data', data: user ?? {} })
    } catch (e) {
      return response.badRequest({ message: 'Something went wrong', data: e })
    }
  }
}
