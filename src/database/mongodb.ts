import mongoose from 'mongoose';

export default async function connect() {
  try {
    await mongoose.connect(process.env.MONGODB || '');
  } catch (error) {
    throw new Error(
      'Please define the MONGODB environment variable inside .env. Error: ' +
        error
    );
  }
}
