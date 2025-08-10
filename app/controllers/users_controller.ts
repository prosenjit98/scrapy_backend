import type { HttpContext } from '@adonisjs/core/http'
import User from "#models/user"

export default class UsersController {
  public async show({ params }: HttpContext) {
    const user = await User.find(params.id)
    if (!user) {
      return { status: 404, message: 'User not found' }
    }
    return { status: 200, data: user }
  }

  public async update({ params, request, response, session }: HttpContext) {
    const user = await User.find(params.id)
    if (!user) {
      session.flash('error', 'User not found')
      return response.redirect().back()
    }

    const fullName = request.input('full_name')
    const email = request.input('email')
    const address = request.input('address')
    const phoneNumber = request.input('phone_number')

    user.fullName = fullName
    user.email = email
    user.address = address
    user.phoneNumber = phoneNumber

    await user.save()

    session.flash('success', 'User updated successfully')
    return response.redirect().toRoute('users.show', { id: user.id })
  }

  public async delete({ params, response, session }: HttpContext) {
    const user = await User.find(params.id)
    if (!user) {
      session.flash('error', 'User not found')
      return response.redirect().back()
    }

    await user.delete()
    session.flash('success', 'User deleted successfully')
    return response.redirect('/users')
  }

  public async switch_to_selling({ params, auth, response, session }: HttpContext) {
    const user = await User.find(params.id)
    if (!user) {
      session.flash('error', 'User not found')
      return response.redirect('/login')
    }

    if (user.role !== 'vendor') {
      user.role = 'vendor'
      await user.save()
    }

    session.flash('success', 'Switched to selling mode successfully')
    return response.redirect('/')
  }

  public async switch_to_buying({ params, auth, response, session }: HttpContext) {
    const user = await User.find(params.id)
    if (!user) {
      session.flash('error', 'User not found')
      return response.redirect().back()
    }

    if (user.role === 'buyer') {
      session.flash('error', 'User is already a buyer')
      return response.redirect().back()
    }

    user.role = 'buyer'
    await user.save()

    // Re-authenticate the user to update the auth context
    await auth.use('web').login(user)

    session.flash('success', 'Switched to browsing mode successfully')
    return response.redirect('/dashboard')
  }



}