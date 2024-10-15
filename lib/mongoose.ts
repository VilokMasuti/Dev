import mongoose from 'mongoose'

let isConnected = false

export const connectToDatabase = async () => {
  mongoose.set('strictQuery', true)

  if (!process.env.MONGODB_URI) {
    return console.log('MISSING MONGODB_URL')
  }

  if (isConnected) {
    return console.log('MongoDB is already connected')
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'Dev',
    })
    isConnected = true
    console.log('MongoDB connected')
  } catch (error) {
    console.log('MongoDB connection failed', error)
  }
}
