// import { BaseSeeder } from '@adonisjs/lucid/seeders'
// import Category from '../../app/models/category.js'
// import { v4 as uuid } from 'uuid'

// export default class CategorySeeder extends BaseSeeder {
//   public async run () {

//     /* =========================
//        VEHICLES
//     ========================= */
//     const vehicles = await Category.create({
//       id: uuid(),
//       name: 'Vehicles',
//       slug: 'vehicles',
//       position: 1,
//     })

//     const bikes = await Category.create({
//       id: uuid(),
//       name: 'Bikes',
//       slug: 'bikes',
//       parentId: vehicles.id,
//     })

//     await Category.createMany([
//       { id: uuid(), name: 'Electric Bikes', slug: 'electric-bikes', parentId: bikes.id },
//       { id: uuid(), name: 'Sports Bikes', slug: 'sports-bikes', parentId: bikes.id },
//       { id: uuid(), name: 'Scooters', slug: 'scooters', parentId: bikes.id },
//     ])

//     const cars = await Category.create({
//       id: uuid(),
//       name: 'Cars',
//       slug: 'cars',
//       parentId: vehicles.id,
//     })

//     await Category.createMany([
//       { id: uuid(), name: 'SUV', slug: 'suv', parentId: cars.id },
//       { id: uuid(), name: 'Sedan', slug: 'sedan', parentId: cars.id },
//       { id: uuid(), name: 'Hatchback', slug: 'hatchback', parentId: cars.id },
//     ])

//     await Category.create({
//       id: uuid(),
//       name: 'Commercial Vehicles',
//       slug: 'commercial-vehicles',
//       parentId: vehicles.id,
//     })

//     /* =========================
//        ELECTRONICS
//     ========================= */
//     const electronics = await Category.create({
//       id: uuid(),
//       name: 'Electronics',
//       slug: 'electronics',
//       position: 2,
//     })

//     await Category.createMany([
//       { id: uuid(), name: 'Mobiles', slug: 'mobiles', parentId: electronics.id },
//       { id: uuid(), name: 'Laptops', slug: 'laptops', parentId: electronics.id },
//       { id: uuid(), name: 'Tablets', slug: 'tablets', parentId: electronics.id },
//       { id: uuid(), name: 'TV & Entertainment', slug: 'tv-entertainment', parentId: electronics.id },
//       { id: uuid(), name: 'Accessories', slug: 'electronics-accessories', parentId: electronics.id },
//     ])

//     /* =========================
//        HOME & LIVING
//     ========================= */
//     const home = await Category.create({
//       id: uuid(),
//       name: 'Home & Living',
//       slug: 'home-living',
//       position: 3,
//     })

//     await Category.createMany([
//       { id: uuid(), name: 'Furniture', slug: 'furniture', parentId: home.id },
//       { id: uuid(), name: 'Home Appliances', slug: 'home-appliances', parentId: home.id },
//       { id: uuid(), name: 'Kitchen Items', slug: 'kitchen-items', parentId: home.id },
//       { id: uuid(), name: 'Tools & Hardware', slug: 'tools-hardware', parentId: home.id },
//     ])

//     /* =========================
//        MACHINERY & INDUSTRIAL
//     ========================= */
//     const machinery = await Category.create({
//       id: uuid(),
//       name: 'Machinery & Industrial',
//       slug: 'machinery-industrial',
//       position: 4,
//     })

//     await Category.createMany([
//       { id: uuid(), name: 'Construction Machinery', slug: 'construction-machinery', parentId: machinery.id },
//       { id: uuid(), name: 'Agricultural Equipment', slug: 'agricultural-equipment', parentId: machinery.id },
//       { id: uuid(), name: 'Factory Machines', slug: 'factory-machines', parentId: machinery.id },
//       { id: uuid(), name: 'Electrical Equipment', slug: 'electrical-equipment', parentId: machinery.id },
//     ])

//     /* =========================
//        FASHION
//     ========================= */
//     const fashion = await Category.create({
//       id: uuid(),
//       name: 'Fashion',
//       slug: 'fashion',
//       position: 5,
//     })

//     await Category.createMany([
//       { id: uuid(), name: 'Men', slug: 'men-fashion', parentId: fashion.id },
//       { id: uuid(), name: 'Women', slug: 'women-fashion', parentId: fashion.id },
//       { id: uuid(), name: 'Kids', slug: 'kids-fashion', parentId: fashion.id },
//       { id: uuid(), name: 'Footwear', slug: 'footwear', parentId: fashion.id },
//     ])

//     /* =========================
//        BOOKS & EDUCATION
//     ========================= */
//     const books = await Category.create({
//       id: uuid(),
//       name: 'Books & Education',
//       slug: 'books-education',
//       position: 6,
//     })

//     await Category.createMany([
//       { id: uuid(), name: 'Academic Books', slug: 'academic-books', parentId: books.id },
//       { id: uuid(), name: 'Competitive Exams', slug: 'competitive-exams', parentId: books.id },
//       { id: uuid(), name: 'E-books & PDFs', slug: 'ebooks-pdfs', parentId: books.id },
//     ])

//     /* =========================
//        SPORTS & HOBBIES
//     ========================= */
//     const sports = await Category.create({
//       id: uuid(),
//       name: 'Sports & Hobbies',
//       slug: 'sports-hobbies',
//       position: 7,
//     })

//     await Category.createMany([
//       { id: uuid(), name: 'Gym Equipment', slug: 'gym-equipment', parentId: sports.id },
//       { id: uuid(), name: 'Sports Gear', slug: 'sports-gear', parentId: sports.id },
//       { id: uuid(), name: 'Musical Instruments', slug: 'musical-instruments', parentId: sports.id },
//     ])

//     /* =========================
//        REAL ESTATE
//     ========================= */
//     const realEstate = await Category.create({
//       id: uuid(),
//       name: 'Real Estate',
//       slug: 'real-estate',
//       position: 8,
//     })

//     await Category.createMany([
//       { id: uuid(), name: 'Plots', slug: 'plots', parentId: realEstate.id },
//       { id: uuid(), name: 'Houses', slug: 'houses', parentId: realEstate.id },
//       { id: uuid(), name: 'Shops', slug: 'shops', parentId: realEstate.id },
//     ])

//     /* =========================
//        MISC
//     ========================= */
//     await Category.create({
//       id: uuid(),
//       name: 'Others',
//       slug: 'others',
//       position: 9,
//     })
//   }
// }
