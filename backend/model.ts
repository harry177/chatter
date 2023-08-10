import mongoose from 'mongoose';

const dataSchema = new mongoose.Schema({
  name: {
    required: true,
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

const messageSchema = new mongoose.Schema({
  chatters: {
    required: true,
    type: Array,
  },
  messages: {
    type: [{ hero: String, comment: String }],
  },
});

export const User = mongoose.model('User', dataSchema);
export const messageStack = mongoose.model('messageStack', messageSchema);
