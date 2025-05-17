import mongoose from 'mongoose'

const connectDB = () => {
  // Check existing connection
  if (mongoose.connections[0].readyState) {
    console.log('Already connected.')
    return Promise.resolve();
  }

  // Set mongoose options
  mongoose.set("strictQuery", false);

  // Return the connection promise so we can await it
  return new Promise((resolve, reject) => {
    mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // Add these critical timeout options
      serverSelectionTimeoutMS: 15000, // Timeout after 15s instead of default 30s
      socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
      connectTimeoutMS: 15000, // Give up initial connection after 15s
    })
    .then(connection => {
      console.log("Connected to MongoDB successfully");
      resolve(connection);
    })
    .catch(err => {
      console.error("MongoDB connection error:", err);
      reject(err);
    });
  });
}

export default connectDB;
