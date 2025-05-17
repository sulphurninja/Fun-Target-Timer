import mongoose from 'mongoose'

const connectDB = async () => {
  try {
    // Check existing connection
    if (mongoose.connections[0].readyState) {
      console.log('Already connected to MongoDB')
      return;
    }

    // Set mongoose options
    mongoose.set("strictQuery", false);

    // Add connection URL validation
    if (!process.env.MONGODB_URL) {
      throw new Error('MONGODB_URL environment variable is not defined')
    }

    console.log('Attempting MongoDB connection...')

    // Connect with better error handling
    const conn = await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 60000, // Significantly increase timeout for cloud environments
      socketTimeoutMS: 90000,
      connectTimeoutMS: 60000,
      maxPoolSize: 10,
      minPoolSize: 2, // Keep some connections open
      maxIdleTimeMS: 30000, // Close idle connections after 30 seconds
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    if (error.name === 'MongoServerSelectionError') {
      console.error('This likely indicates network connectivity issues or incorrect connection string');
    }
    throw error;
  }
}

export default connectDB;
