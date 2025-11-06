import type { HttpContext } from '@adonisjs/core/http'
import Comment from '#models/comment'


export default class CommentsController {
  public async index({ response, params }: HttpContext) {
    try {
      const proposalId = params.id
      const comments = await Comment.query().where('proposalId', proposalId).preload('proposal')
      return response.ok({ message: 'Comments found', data: comments })
    } catch (error) {
      return response.internalServerError({ message: 'Failed to fetch comments', error: error.message })
    }
  }

  public async store({ request, response, params }: HttpContext) {
    try {
      const proposalId = params.proposal_id
      const { content, userId } = request.body()
      const comment = await Comment.create({
        content,
        proposalId,
        userId
      })

      return response.created({ message: 'Comment created', data: comment })
    } catch (error) {
      return response.internalServerError({ message: 'Failed to create comment', error: error.message })
    }
  }

  public async destroy({ response, params }: HttpContext) {
    try {
      const commentId = params.id
      const comment = await Comment.findOrFail(commentId)
      await comment.delete()
      return response.noContent()
    } catch (error) {
      return response.internalServerError({ message: 'Failed to delete comment', error: error.message })
    }
  }

  public async show({ response, params }: HttpContext) {
    try {
      const commentId = params.id
      const comment = await Comment.query().where('id', commentId).preload('proposal').firstOrFail()
      return response.ok({ message: 'Comment found', data: comment })
    } catch (error) {
      return response.internalServerError({ message: 'Failed to fetch comment', error: error.message })
    }
  }

  public async update({ request, response, params }: HttpContext) {
    try {
      const commentId = params.id
      const { content } = request.body()

      const comment = await Comment.findOrFail(commentId)
      comment.content = content
      await comment.save()

      return response.ok({ message: 'Comment updated', data: comment })
    } catch (error) {
      return response.internalServerError({ message: 'Failed to update comment', error: error.message })
    }
  }

}