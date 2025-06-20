import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGODB_URI;
console.log('MONGODB_URI:', uri);
const client = new MongoClient(uri);

export async function connectDB() {
  console.log('connectDB called');
  console.log('MongoDB URI:', uri);
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    return client.db('yelpapp');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
}

export { client };