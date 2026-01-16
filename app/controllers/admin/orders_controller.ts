import Order from '#models/order'
import User from '#models/user'
import Part from '#models/part'
import Proposal from '#models/proposal'
import type { HttpContext } from '@adonisjs/core/http'
import { orderCreateValidator } from '#validators/order'

export default class OrdersController {
  /**
   * Display a list of orders
   */
  public async index({ inertia }: HttpContext) {
    return inertia.render('Admin/orders/index')
  }

  /**
   * Get paginated list of orders with filters
   */
  public async list({ request }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)
    const search = request.input('search', '')
    const status = request.input('status', '')

    const ordersPage = await Order.query()
      .orderBy('created_at', 'desc')
      .preload('user', (userQuery) => {
        userQuery.select('id', 'fullName', 'email')
      })
      .preload('vendor', (vendorQuery) => {
        vendorQuery.select('id', 'fullName', 'email')
      })
      .preload('part', (partQuery) => {
        partQuery
          .select(['id', 'name', 'vehicle_make_id', 'vehicle_model_id'])
          .preload('make', (makeQuery) => {
            makeQuery.select('name')
          })
          .preload('model', (modelQuery) => {
            modelQuery.select('name')
          })
      })
      .preload('proposal')
      .if(search, (query) => {
        query
          .whereHas('user', (userQuery) => {
            userQuery.whereILike('fullName', `%${search}%`)
          })
          .orWhereHas('vendor', (vendorQuery) => {
            vendorQuery.whereILike('fullName', `%${search}%`)
          })
      })
      .if(status, (query) => {
        query.where('status', status)
      })
      .paginate(page, limit)

    const orders = ordersPage.serialize()

    // Format the response
    orders.data = orders.data.map((order) => {
      return {
        ...order,
        user_name: order.user?.fullName ?? null,
        user_email: order.user?.email ?? null,
        vendor_name: order.vendor?.fullName ?? null,
        vendor_email: order.vendor?.email ?? null,
        part_name: order.part?.name ?? null,
        make_name: order.part?.make?.name ?? null,
        model_name: order.part?.model?.name ?? null,
      }
    })

    return orders
  }

  /**
   * Show create form
   */
  public async create({ inertia }: HttpContext) {
    const users = await User.query().where('role', 'user').select('id', 'fullName', 'email')
    const vendors = await User.query().where('role', 'vendor').select('id', 'fullName', 'email')
    const parts = await Part.query()
      .select(['id', 'name', 'vehicle_make_id', 'vehicle_model_id'])
      .preload('make', (makeQuery) => {
        makeQuery.select('name')
      })
      .preload('model', (modelQuery) => {
        modelQuery.select('name')
      })
    const proposals = await Proposal.query().select('id', 'description')

    return inertia.render('Admin/orders/create', { users, vendors, parts, proposals })
  }

  /**
   * Store new order
   */
  public async store({ request, response, session }: HttpContext) {
    const data = await request.validateUsing(orderCreateValidator)

    const order = await Order.create(data)

    session.flash('success', 'Order created successfully')
    return response.redirect(`/admin/orders/${order.id}/edit`)
  }

  /**
   * Show edit form
   */
  public async edit({ params, inertia }: HttpContext) {
    const order = await Order.query()
      .where('id', params.id)
      .preload('user')
      .preload('vendor')
      .preload('part')
      .preload('proposal')
      .firstOrFail()

    const users = await User.query().select('id', 'fullName', 'email')
    const vendors = await User.query().where('role', 'vendor').select('id', 'fullName', 'email')
    const parts = await Part.query()
      .select(['id', 'name', 'vehicle_make_id', 'vehicle_model_id'])
      .preload('make', (makeQuery) => {
        makeQuery.select('name')
      })
      .preload('model', (modelQuery) => {
        modelQuery.select('name')
      })
    const proposals = await Proposal.query().select('id', 'description')

    return inertia.render('Admin/orders/edit', { order, users, vendors, parts, proposals })
  }

  /**
   * Update order
   */
  public async update({ params, request, response, session }: HttpContext) {
    const order = await Order.findOrFail(params.id)

    const data = await request.validateUsing(orderCreateValidator)
    order.merge(data)
    await order.save()

    session.flash('success', 'Order updated successfully')
    return response.redirect('/admin/orders')
  }

  /**
   * Delete order
   */
  public async destroy({ params, response, session }: HttpContext) {
    const order = await Order.findOrFail(params.id)
    await order.delete()

    session.flash('success', 'Order deleted successfully')
    return response.redirect('/admin/orders')
  }

  /**
   * Show single order
   */
  public async show({ params, inertia }: HttpContext) {
    const order = await Order.query()
      .where('id', params.id)
      .preload('user')
      .preload('vendor')
      .preload('part', (partQuery) => {
        partQuery
          .preload('make')
          .preload('model')
      })
      .preload('proposal')
      .firstOrFail()

    return inertia.render('Admin/orders/show', { order })
  }
}
