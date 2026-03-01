import type { HttpContext } from '@adonisjs/core/http'
import { vendorReviewCreateValidator, vendorReviewUpdateValidator } from '#validators/vendor_review'
import VendorReview from '#models/vendor_review'

export default class VendorReviewsController {
  /**
   * Display a list of reviews
   */
  async index({ request, response }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)
    const vendorId = request.input('vendor_id')
    const userId = request.input('user_id')
    const status = request.input('status')

    const query = VendorReview.query()
      .preload('user')
      .preload('vendor')
      .orderBy('created_at', 'desc')

    if (vendorId) {
      query.where('vendor_id', vendorId)
    }

    if (userId) {
      query.where('user_id', userId)
    }

    if (status) {
      query.where('status', status)
    }

    const reviews = await query.paginate(page, limit)

    return response.ok(reviews)
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response, auth }: HttpContext) {
    const data = await request.validateUsing(vendorReviewCreateValidator)
    const user = auth.user!

    // Check if user has already reviewed this vendor
    const existingReview = await VendorReview.query()
      .where('user_id', user.id)
      .where('vendor_id', data.vendor_id)
      .first()

    if (existingReview) {
      return response.badRequest({ message: 'You have already reviewed this vendor' })
    }

    const review = await VendorReview.create({
      userId: user.id,
      vendorId: data.vendor_id,
      rating: data.rating,
      comment: data.comment,
      status: 'active',
      flagged: false,
    })

    return response.created(review)
  }

  /**
   * Show individual record
   */
  async show({ params, response }: HttpContext) {
    const review = await VendorReview.query()
      .where('id', params.id)
      .preload('user')
      .preload('vendor')
      .first()

    if (!review) {
      return response.notFound({ message: 'Review not found' })
    }

    return response.ok(review)
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response, auth }: HttpContext) {
    const review = await VendorReview.find(params.id)

    if (!review) {
      return response.notFound({ message: 'Review not found' })
    }

    const user = auth.user!

    // Only allow the review owner to update their review
    if (review.userId !== user.id) {
      return response.forbidden({ message: 'You are not authorized to update this review' })
    }

    const data = await request.validateUsing(vendorReviewUpdateValidator)

    review.merge({
      rating: data.rating,
      comment: data.comment,
    })

    await review.save()

    return response.ok(review)
  }

  /**
   * Delete record
   */
  async destroy({ params, response, auth }: HttpContext) {
    const review = await VendorReview.find(params.id)

    if (!review) {
      return response.notFound({ message: 'Review not found' })
    }

    const user = auth.user!

    // Only allow the review owner to delete their review
    if (review.userId !== user.id) {
      return response.forbidden({ message: 'You are not authorized to delete this review' })
    }

    await review.delete()

    return response.ok({ message: 'Review deleted successfully' })
  }
}