import mongoose from 'mongoose';

let isConnected: boolean = false;

export const connectToDatabase = async () => {
  mongoose.set('strictQuery', true);

  if (!process.env.MONGODB_URI) {
    return console.log('MONGODB_URI not found');
  }

  if (isConnected) {
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'devflow',
    });

    isConnected = true;

    console.log('MongoDB is connected');
  } catch (error) {
    console.log('MongoDB connection error', error);
  }
};
