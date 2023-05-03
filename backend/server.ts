import mongoose from 'mongoose';
import express from 'express';
import { User } from './model';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser, { OptionsUrlencoded } from 'body-parser';
dotenv.config();
const app = express();
const jsonParser = express.json();

//app.use(express.static(__dirname + '/public'));

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

app.get('/api/users/:id', async (req, res) => {
  const id = req.params.id;
  const user = await User.findById(id);
  if (user) res.send(user);
  else res.sendStatus(404);
});

app.post('/api/users', jsonParser, async (req, res) => {
  if (!req.body) return res.sendStatus(400);

  const userName = req.body.name;
  const userAge = req.body.age;
  const user = new User({ name: userName, age: userAge });
  await user.save();
  res.send(user);
});

main();

process.on('SIGINT', async () => {
  await mongoose.disconnect();
  console.log('Приложение завершило работу');
  process.exit();
});
