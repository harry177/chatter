import mongoose from 'mongoose';
import express from 'express';
import { User } from './model';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser, { OptionsUrlencoded } from 'body-parser';

dotenv.config();
const app = express();

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

//const urlencodedParser = express.urlencoded({ extended: false } as OptionsUrlencoded | undefined);

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

app.post('/api/login', async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const user = await User.findOne({ email });
  console.log(user);
  console.log(req.body);
  if (!user) {
    return res.json({ message: 'There is no user with such email!' });
  }
  if (user && user.password !== password) {
    return res.json({ message: 'Your password is incorrect' });
  }
  if (user && user.password === password) {
    return res.json({ name: user.name });
  }
});

app.post('/api/register', async (req, res) => {
  if (!req.body) res.sendStatus(400);

  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const tryEmail = await User.findOne({ email });
  if (tryEmail) {
    return res.json({ message: 'User with such email is aready existed' });
  }
  if (!tryEmail) {
    const user = new User({ name: name, email: email, password: password });
    user.save();
    res.send(user);
  }
});

main();

process.on('SIGINT', async () => {
  await mongoose.disconnect();
  console.log('Приложение завершило работу');
  process.exit();
});
