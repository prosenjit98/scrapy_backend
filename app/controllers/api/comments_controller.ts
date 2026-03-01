import type { HttpContext } from '@adonisjs/core/http'
import Comment from '#models/comment'


export default class CommentsController {
  // Helper method to serialize comment with commentable data
  private async serializeCommentWithCommentable(comment: Comment) {
    const commentable = await comment.getCommentable()
    return {
      ...comment.serialize(),
      commentable: commentable ? commentable.serialize() : null
    }
  }

  public async index({ response, request }: HttpContext) {
    try {
      const commentableType = request.input('commentableType')
      const commentableId = request.input('commentableId')

      const comments = await Comment.query()
        .where('commentableType', commentableType)
        .where('commentableId', commentableId)
        .orderBy('createdAt', 'asc')
        .preload('commenter')

      const commentsWithCommentable = await Promise.all(
        comments.map(comment => this.serializeCommentWithCommentable(comment))
      )

      return response.ok({ message: 'Comments found', data: commentsWithCommentable })
    } catch (error) {
      return response.internalServerError({ message: 'Failed to fetch comments', error: error.message })
    }
  }

  public async store({ request, response }: HttpContext) {
    try {
      const { content, userId, commentableType, commentableId } = request.body()
      const comment = await Comment.create({
        content,
        userId,
        commentableType,
        commentableId
      })

      await comment.load('commenter')
      const commentWithCommentable = await this.serializeCommentWithCommentable(comment)
      return response.created({ message: 'Comment created', data: commentWithCommentable })
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
      const comment = await Comment.query().where('id', commentId).preload('commenter').firstOrFail()
      const commentWithCommentable = await this.serializeCommentWithCommentable(comment)
      return response.ok({ message: 'Comment found', data: commentWithCommentable })
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