import mongoose from 'mongoose';

const dataSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
  },
});

export const User = mongoose.model('User', dataSchema);
