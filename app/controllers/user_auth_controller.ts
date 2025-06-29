import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

export default class UserAuthController {
  public async showLogin({ inertia }: HttpContext) {
    return inertia.render('UserAuth/login')
  }

  public async login({ request, auth, response, session, inertia }: HttpContext) {
    const email = request.input('email')
    const password = request.input('password')

    try {
      const user = await User.verifyCredentials(email, password)
      await auth.use('web').login(user)
      session.flash('success', 'Logged in successfully')
      console.log('User logged in:', session.flashMessages)
      return inertia.render('public/home2', {
        user: {
          id: user.id,
          name: user.fullName,
          email: user.email,
        },
      })
    } catch (error) {
      session.flash('errors', {
        email: 'Invalid credentials',
      })
      return response.redirect().back()
    }
  }

  public async logout({ auth, response, session, inertia }: HttpContext) {
    await auth.use('web').logout()
    session.flash('success', 'Logged out in successfully')
    return inertia.render('public/home2', {
      user: null,
    })
  }

  public async showSignup({ inertia }: HttpContext) {
    return inertia.render('UserAuth/signup')
  }
  public async signup({ request, auth, response, session, inertia }: HttpContext) {
    const fullName = request.input('full_name')
    const email = request.input('email')
    const password = request.input('password')

    try {
      const user = await User.create({
        fullName,
        email,
        password,
      })
      await auth.use('web').login(user)
      session.flash('success', 'Account created successfully')
      return inertia.render('public/home2', {
        user: {
          id: user.id,
          name: user.fullName,
          email: user.email,
        },
      })
    } catch (error) {
      session.flash('errors', {
        email: 'Email already exists',
      })
      return response.redirect().back()
    }
  }
  public async showForgotPassword({ inertia }: HttpContext) {
    return inertia.render('UserAuth/forgot_password')
  }
  public async forgotPassword({ request, response, session }: HttpContext) {
    const email = request.input('email')

    try {
      // Logic to handle forgot password, e.g., sending reset link
      session.flash('success', 'Password reset link sent to your email')
      return response.redirect().back()
    } catch (error) {
      session.flash('errors', {
        email: 'Failed to send reset link',
      })
      return response.redirect().back()
    }
  }
  public async showResetPassword({ inertia, params }: HttpContext) {
    const token = params.token
    // Logic to verify token and show reset password form
    return inertia.render('UserAuth/reset_password', { token })
  }
  public async resetPassword({ request, response, session }: HttpContext) {
    const token = request.input('token')
    const newPassword = request.input('new_password')

    try {
      // Logic to reset password using the token
      session.flash('success', 'Password reset successfully')
      return response.redirect('/login')
    } catch (error) {
      session.flash('errors', {
        token: 'Invalid or expired token',
      })
      return response.redirect().back()
    }
  }
}
