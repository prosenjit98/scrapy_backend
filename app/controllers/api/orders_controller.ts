import type { HttpContext } from '@adonisjs/core/http'
import Order from '../../models/order.js'
import { orderCreateValidator } from '#validators/order'
import { formatOrderResponse } from '#services/orderService'

export default class OrdersController {
  // Order controller methods would go here
  async index({ request, response }: HttpContext) {
    try {
      const page = request.input('page', 1)
      const limit = request.input('limit', 100)
      const vendorId = request.input('vendorId', null)
      const userId = request.input('userId', null)
      const orders = Order.query()
        .orderBy('created_at', 'desc')
        .if(vendorId, (query) => {
          query.where('vendor_id', vendorId)
        })
        .if(userId, (query) => {
          query.where('user_id', userId)
        })

      const ordersPage = await orders.paginate(page, limit)
      const orderSerialize = ordersPage.serialize()
      return response.ok({ message: 'Orders fetched', data: orderSerialize })
    } catch (error) {
      return response.badRequest({ message: 'Validation failed', errors: error.messages })
    }
  }

  async store({ request, response }: HttpContext) {
    try {
      const payload = await request.validateUsing(orderCreateValidator)
      const order = await Order.create(payload)
      return response.ok({ message: 'Order created', data: formatOrderResponse(order) })
    } catch (error) {
      return response.badRequest({ message: 'Validation failed', errors: error.messages })
    }
  }

  async show({ params, response }: HttpContext) {
    const order = await Order.find(params.id)
    if (!order) {
      return response.notFound({ message: 'Order not found' })
    }
    return response.ok({ message: 'Order found', data: formatOrderResponse(order) })
  }

  async update({ params, request, response }: HttpContext) {
    const order = await Order.find(params.id)
    if (!order) {
      return response.notFound({ message: 'Order not found' })
    }

    try {
      const payload = await request.validateUsing(orderCreateValidator)
      order.merge(payload)
      await order.save()
      return response.ok({ message: 'Order updated', data: formatOrderResponse(order) })
    } catch (error) {
      return response.badRequest({ message: 'Validation failed', errors: error.messages })
    }
  }

  async destroy({ params, response }: HttpContext) {
    const order = await Order.find(params.id)
    if (!order) {
      return response.notFound({ message: 'Order not found' })
    }
    await order.delete()
    return response.ok({ message: 'Order deleted' })
  }
}