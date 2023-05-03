import express from 'express';
import { User } from './model';

export const router = express.Router();

//Post Method
router.post('/users', async (req, res) => {
  const data = new User({
    name: req.body.name,
    age: req.body.age,
  });
  try {
    const dataToSave = await data.save();
    res.status(200).json(dataToSave);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

//Get all Method
router.get('/users', async (req, res) => {
  try {
    const data = await User.find();
    res.send(data);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});
