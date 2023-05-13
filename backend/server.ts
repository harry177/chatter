import mongoose from 'mongoose';
import express from 'express';
import { router } from './router';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser, { OptionsUrlencoded } from 'body-parser';

dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000;

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

app.use('/api', router);

async function main() {
  try {
    await mongoose.connect(process.env.DATABASE_URL || '');
    app.listen(PORT);
    console.log(`Sever started on port ${PORT}`);
  } catch (err) {
    return console.log(err);
  }
}

main();

process.on('SIGINT', async () => {
  await mongoose.disconnect();
  console.log('Приложение завершило работу');
  process.exit();
});
