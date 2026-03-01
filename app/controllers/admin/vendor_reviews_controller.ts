import type { HttpContext } from '@adonisjs/core/http'
import VendorReview from '#models/vendor_review'


export default class AdminVendorReviewsController {
  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {
    // return inertia.render('Admin/vendor_reviews/index')
    
  }

  /**
   * Display form to create a new record
   */
  async create({}: HttpContext) {}

  /**
   * Handle form submission for the create action
   */
  // async store({ request }: HttpContext) {}

  /**
   * Show individual record
   */
  // async show({ params }: HttpContext) {}

  /**
   * Edit individual record
   */
  // async edit({ params }: HttpContext) {}

  /**
   * Handle form submission for the edit action
   */
  // async update({ params, request }: HttpContext) {}

  /**
   * Delete record
   */
  // async destroy({ params }: HttpContext) {}
}