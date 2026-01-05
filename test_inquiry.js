// Simple test script to check inquiry creation
import VehicleMake from './app/models/vehicle_make.js'
import VehicleModel from './app/models/vehicle_model.js'
import Inquiry from './app/models/inquiry.js'

async function testInquiry() {
  try {
    console.log('Testing vehicle makes...')
    const makes = await VehicleMake.all()
    console.log('Vehicle makes:', makes.map(m => ({ id: m.id, name: m.name })))
    
    console.log('Testing vehicle models...')
    const models = await VehicleModel.all()
    console.log('Vehicle models:', models.map(m => ({ id: m.id, name: m.name })))
    
    if (makes.length === 0) {
      console.log('No vehicle makes found. Creating sample data...')
      await VehicleMake.create({ name: 'Toyota' })
      await VehicleMake.create({ name: 'Honda' })
    }
    
    if (models.length === 0) {
      console.log('No vehicle models found. Creating sample data...')
      await VehicleModel.create({ name: 'Corolla' })
      await VehicleModel.create({ name: 'Civic' })
    }
    
    console.log('Test completed successfully!')
  } catch (error) {
    console.error('Error in test:', error)
  }
}

testInquiry()
