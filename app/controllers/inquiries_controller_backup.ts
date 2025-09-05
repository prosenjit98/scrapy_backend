import Inquiry from '#models/inquiry'
import Attachment from '#models/attachment'
import type { HttpContext } from '@adonisjs/core/http'
import VehicleMake from '#models/vehicle_make'
import VehicleModel from '#models/vehicle_model'

export default class InquiriesController {
  public async index({ inertia }: HttpContext) {
    return inertia.render('inquiries/index')
  }

  public async list({ request }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)

    const inquiriesPage = await Inquiry.query()
      .orderBy('created_at', 'desc')
      .preload('user', (userQuery: any) => {
        userQuery.select('fullName', 'email')
      })
      .preload('attachments') // Load attachments
      .paginate(page, limit)

    return inquiriesPage.serialize()
  }

  public async myInquiries({ inertia, auth }: HttpContext) {
    try {
      const currentUser = auth.use('web').user!
      
      // Get user's inquiries with attachments and related models
      const inquiries = await Inquiry.query()
        .where('userId', currentUser.id)
        .orderBy('created_at', 'desc')
        .preload('attachments')
        .preload('make')
        .preload('model')
      
      const user = {
        id: currentUser.id,
        name: currentUser.fullName,
        email: currentUser.email,
        address: currentUser.address,
        phoneNumber: currentUser.phoneNumber,
        role: currentUser.role,
        avatar: undefined
      }

      return inertia.render('inquiries/my_inquiries', { 
        inquiries: inquiries.map(inquiry => inquiry.serialize()),
        user: user
      })
    } catch (error) {
      console.error('Error fetching user inquiries:', error)
      return inertia.render('errors/server_error', { error: 'Failed to load inquiries' })
    }
  }

  public async new({ inertia, auth }: HttpContext) {
    const vehicleMakes = await VehicleMake.all()
    const vehicleMakesData = vehicleMakes.map(make => ({ id: make.id, name: make.name }))
    const vehicleModels = await VehicleModel.all()
    const vehicleModelsData = vehicleModels.map(model => ({ id: model.id, name: model.name }))
    
    // Get current user for the form
    const currentUser = auth.use('web').user!
    const user = {
      id: currentUser.id,
      name: currentUser.fullName,
      email: currentUser.email,
      address: currentUser.address,
      phoneNumber: currentUser.phoneNumber,
      role: currentUser.role,
      avatar: undefined
    }
    
    console.log('Vehicle Makes:', vehicleMakesData)
    return inertia.render('Inquiries/new', { 
      vehicleMakes: vehicleMakesData, 
      vehicleModels: vehicleModelsData,
      user: user
    })
  }

  public async create({ request, response, session, auth }: HttpContext) {
    try {
      // Get the current authenticated user (middleware ensures this exists)
      const currentUser = auth.use('web').user!
      
      // Get form data (excluding userId since we'll set it automatically)
      const formData = request.only(['vehicleMake', 'vehicleModel', 'partDescription', 'year'])
      
      // Convert string values to numbers for foreign keys
      const inquiryData = {
        vehicleMake: parseInt(formData.vehicleMake),
        vehicleModel: parseInt(formData.vehicleModel),
        partDescription: formData.partDescription,
        year: parseInt(formData.year)
      }
      
      // Log the incoming data for debugging
      console.log('Incoming inquiry data:', inquiryData)
      console.log('Current user:', currentUser.id, currentUser.fullName)
      
      // Create inquiry with current user's ID and default status
      const inquiry = await Inquiry.create({
        ...inquiryData,
        userId: currentUser.id, // Automatically set to current user
        status: 'pending'
      })

      // Handle file attachments with validation for photos and videos
      const attachments = request.files('attachments', {
        size: '10mb', // Max 10MB per file
        extnames: ['jpg', 'jpeg', 'png', 'gif', 'webp', 'mp4', 'mov', 'avi', 'webm'] // Allowed file types
      })
      
      if (attachments && attachments.length > 0) {
        for (const attachment of attachments) {
          if (attachment.isValid) {
            // Check file type
            const isImage = ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(attachment.extname || '')
            const isVideo = ['mp4', 'mov', 'avi', 'webm'].includes(attachment.extname || '')
            
            if (isImage || isVideo) {
              try {
                await Attachment.attach(inquiry, attachment)
                console.log(`Attached ${isImage ? 'image' : 'video'}: ${attachment.clientName}`)
              } catch (error) {
                console.error('Error attaching file:', error)
              }
            } else {
              console.warn(`Unsupported file type: ${attachment.extname}`)
            }
          } else {
            console.error('Invalid file:', attachment.errors)
          }
        }
      }
      
      session.flash('success', 'Inquiry created successfully')
      return response.redirect('/inquiries')
    } catch (error) {
      console.error('Error creating inquiry:', error)
      session.flash('error', `Failed to create inquiry: ${error.message}`)
      return response.redirect().back()
    }
  }
  
  public async edit({ params, inertia }: HttpContext) {
    const inquiry = await Inquiry.find(params.id)
    if (!inquiry) {
      return inertia.render('errors/not_found', { error: 'Inquiry not found' })
    }

    return inertia.render('inquiries/edit', { inquiry: inquiry.serialize() })
  }

  public async show({ params, inertia }: HttpContext) {
    const inquiry = await Inquiry.find(params.id)
    if (!inquiry) {
      return inertia.render('errors/not_found', { error: 'Inquiry not found' })
    }

    await inquiry.load('user', (userQuery: any) => {
      userQuery.select('fullName', 'email')
    })
    
    await inquiry.load('attachments')

    return inertia.render('inquiries/show', { inquiry: inquiry.serialize() })
  }

  public async update({ params, request, response, session }: HttpContext) {
    const inquiry = await Inquiry.find(params.id)

    if (!inquiry) {
      session.flash('error', 'Inquiry not found')
      return response.redirect().back()
    }

    const status = request.input('status')
    inquiry.status = status
    await inquiry.save()

    session.flash('success', 'Inquiry updated successfully')
    return response.redirect().toRoute('inquiries.index')
  }
}
