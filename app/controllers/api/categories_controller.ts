import Category from '#models/category'
import type { HttpContext } from '@adonisjs/core/http'

export default class CategoriesController {
  /**
   * Display a list of resource
   */
  async index({ response }: HttpContext) {
    const categories = await Category.all()
    return response.ok({ message: 'Categories found', data: categories })
  }
  
}