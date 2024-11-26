import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/todoapp';

const connectToDB = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('CONNECTED TO MONGODB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Salir del proceso si no se puede conectar a la base de datos
  }
};

export default connectToDB
