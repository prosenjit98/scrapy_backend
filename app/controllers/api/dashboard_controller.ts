import Order from '#models/order'
import Part from '#models/part'
import Proposal from '#models/proposal'
import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'

export default class DashboardController {
  public async index({ auth, response }: HttpContext) {
    const user = auth.user!

    if (user.role === 'vendor') {
      const [totalParts, activeOrders, pendingProposals, recentOrders, recentParts, totalRevenue] =
        await Promise.all([
          Part.query().where('vendor_id', user.id).count('* as total').first(),
          Order.query()
            .where('vendor_id', user.id)
            .whereNotIn('status', ['completed', 'delivered', 'canceled'])
            .count('* as total')
            .first(),
          Proposal.query()
            .where('proposer_id', user.id)
            .whereNull('is_self_accepted')
            .count('* as total')
            .first(),
          Order.query()
            .where('vendor_id', user.id)
            .orderBy('created_at', 'desc')
            .limit(5)
            .preload('user', (q) => q.select('id', 'fullName'))
            .select('id', 'totalPrice', 'status', 'createdAt', 'userId'),
          Part.query()
            .where('vendor_id', user.id)
            .orderBy('created_at', 'desc')
            .limit(3)
            .select('id', 'name', 'price', 'isAvailable', 'stock'),
          db
            .from('orders')
            .where('vendor_id', user.id)
            .whereIn('status', ['completed', 'delivered'])
            .sum('total_price as total')
            .first(),
        ])

      return response.ok({
        message: 'Vendor dashboard data',
        data: {
          user: user.serialize(),
          stats: {
            totalParts: Number(totalParts?.$extras.total ?? 0),
            activeOrders: Number(activeOrders?.$extras.total ?? 0),
            pendingProposals: Number(pendingProposals?.$extras.total ?? 0),
            totalRevenue: Number(totalRevenue?.total ?? 0),
          },
          recentOrders: recentOrders.map((o) => o.serialize()),
          recentParts: recentParts.map((p) => p.serialize()),
        },
      })
    }

    return response.ok({ message: 'Dashboard data', data: { user: user.serialize() } })
  }
}
