import mongoose from 'mongoose';
import express from 'express';
import { User } from './model';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser, { OptionsUrlencoded } from 'body-parser';

dotenv.config();
const app = express();
const jsonParser = express.json();

const corsOptions = {
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200,
  methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
  allowedHeaders: ['Content-Type', 'Access-Control-Allow-Origin'],
};

app.use(bodyParser.urlencoded({ extended: true } as OptionsUrlencoded | undefined));
app.use(bodyParser.json());
app.use(cors(corsOptions));

async function main() {
  try {
    await mongoose.connect(process.env.DATABASE_URL || '');
    app.listen(3000);
    console.log('Сервер ожидает подключения...');
  } catch (err) {
    return console.log(err);
  }
}

app.get('/api/users', async (req, res) => {
  const users = await User.find({});
  res.send(users);
});

app.get('/api/users/:email', async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const user = await User.findById(email);

  if (!user) {
    return res.status(400).json({ message: 'There is no user with such email!' });
  } else if (user && password !== res)
    if (user) {
      res.send(user);
    } else res.sendStatus(404);
});

app.post('/api/users', jsonParser, async (req, res) => {
  if (!req.body) return res.sendStatus(400);

  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const tryEmail = await User.findOne({ email });
  if (tryEmail) {
    return res.status(400).json({ message: 'User with such email is aready existed' });
  }
  const tryName = await User.findOne({ name });
  if (tryName) {
    return res.status(400).json({ message: 'User with such name is aready existed' });
  }
  const user = new User({ name: name, email: email, password: password });
  await user.save();
  res.send(user);
});

main();

process.on('SIGINT', async () => {
  await mongoose.disconnect();
  console.log('Приложение завершило работу');
  process.exit();
});
