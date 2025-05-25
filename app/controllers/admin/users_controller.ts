import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class UsersController {
  public async index({ inertia }: HttpContext) {
    return inertia.render('Admin/users/index')
  }

  public async list({ request }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)
    const search = request.input('search', '')

    // const usersQuery = User.query()
    // if (search) {
    //   usersQuery.whereILike('fullName', `%${search}%`)
    // }
    // const users = await usersQuery.paginate(page, 10)
    const users = await User.query()
      .withScopes((scopes) => scopes.users())
      .orderBy('created_at', 'desc')
      .if(search, (query) => {
        query.whereILike('fullName', `%${search}%`)
      })
      .paginate(page, limit)

    return users
  }

  public async show({}: HttpContext) {}
  public async create({ inertia }: HttpContext) {
    return inertia.render('Admin/users/create')
  }

  public async store({ request, response, session }: HttpContext) {
    const data = request.only(['fullName', 'email', 'password', 'role', 'phoneNumber'])
    const user = await User.create(data)
    session.flash('success', 'User created successfully')
    if (user.role === 'vendor') {
      return response.redirect('/admin/vendors')
    } else {
      return response.redirect('/admin/users')
    }
  }

  public async edit({ params, inertia }: HttpContext) {
    const user = await User.findOrFail(params.id)
    return inertia.render('Admin/users/edit', { user })
  }

  public async update({ params, request, response, session }: HttpContext) {
    const user = await User.findOrFail(params.id)
    user.merge(request.only(['fullName', 'email', 'password', 'role', 'phoneNumber']))
    await user.save()
    session.flash('success', 'User Updated successfully')
    if (user.role === 'vendor') {
      return response.redirect('/admin/vendors')
    } else {
      return response.redirect('/admin/users')
    }
  }

  public async destroy({ params, response, session }: HttpContext) {
    const user = await User.findOrFail(params.id)
    await user.delete()
    session.flash('success', 'User deleted successfully')
    return response.redirect('/admin/users')
  }
}
