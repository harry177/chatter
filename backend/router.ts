import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from './model';

const createEntryToken = (id: object) => {
  const payload = {
    id,
  };
  return jwt.sign(payload, process.env.SECRET as string, { expiresIn: '24h' });
};

export const router = express.Router();

router.get('/users', async (req, res) => {
  const users = await User.find({});
  res.send(users);
});

router.post('/login', async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const user = await User.findOne({ email });
  if (!user) {
    return res.json({ message: 'There is no user with such email!' });
  }
  const validPass = bcrypt.compareSync(password, user.password);
  if (user && !validPass) {
    return res.json({ message: 'Your password is incorrect' });
  }
  if (user && validPass) {
    //const token = createEntryToken(user._id);
    return res.json({ name: user.name });
  }
});

router.post('/register', async (req, res) => {
  if (!req.body) res.sendStatus(400);

  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const tryEmail = await User.findOne({ email });
  if (tryEmail) {
    return res.json({ message: 'User with such email is aready existed' });
  }
  if (!tryEmail) {
    const tryName = await User.findOne({ name });
    if (tryName) {
      return res.json({ message: 'User with such name is aready existed' });
    } else {
      const hashPass = bcrypt.hashSync(password, 7);
      const user = new User({ name: name, email: email, password: hashPass });
      user.save();
      const token = createEntryToken(user._id);
      res.send({ user: user, token: token });
    }
  }
});
