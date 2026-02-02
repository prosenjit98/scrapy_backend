import Category from '#models/category'
import type { HttpContext } from '@adonisjs/core/http'

export default class AdminCategoriesController {
  /**
   * Display a list of resource
   */
  async index({ inertia }: HttpContext) {
    const parents = await Category.query().whereNull('parent_id').orderBy('name', 'asc').select('id', 'name')
    return inertia.render('Admin/categories/index', { parents })
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
    const makes = await Category.query()
      .orderBy('created_at', 'desc')
      .if(search, (query) => {
        query.whereILike('name', `%${search}%`)
      })
      .paginate(page, limit)

    return makes
  }

  /**
   * Display form to create a new record
   */
  async create({}: HttpContext) {}

  /**
   * Handle form submission for the create action
   */
  public async store({ request, response, session }: HttpContext) {
    const data = request.only(['name', 'slug', 'parentId', 'isActive', 'position'])
    await Category.create(data)
    session.flash('success', 'Category created successfully')
    return response.redirect('/admin/categories')
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {}

  /**
   * Edit individual record
   */
  async edit({ params }: HttpContext) {}

  /**
   * Handle form submission for the edit action
   */
  // async update({ params, request }: HttpContext) {}
  public async update({ params, request, response, session }: HttpContext) {
    const model = await Category.findOrFail(params.id)
    model.merge(request.only(['name', 'parent_id', 'is_active', 'position']))
    await model.save()
    session.flash('success', 'Category Updated successfully')
    return response.redirect('/admin/categories')
  }

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {}

  async parents({ response }: HttpContext) {
    const parents = await Category.query().whereNull('parent_id').orderBy('name', 'asc').select('id', 'name')
    return response.json(parents)
  }
}

