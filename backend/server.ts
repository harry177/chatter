import mongoose from 'mongoose';
import express from 'express';
import path from 'path';
import { router } from './router';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser, { OptionsUrlencoded } from 'body-parser';
import { socketServer } from './socketServer';

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

const __dirname1 = path.resolve();

mongoose.connect(process.env.DATABASE_URL || '');

app.use(express.static(path.join(__dirname1, '/frontend/dist')));

app.get('*', (req, res) =>
  res.sendFile(path.resolve(__dirname1, 'frontend', 'dist', 'index.html'))
);

const superServer = app.listen(PORT);
socketServer(superServer, PORT);

process.on('SIGINT', async () => {
  await mongoose.disconnect();
  console.log('Приложение завершило работу');
  process.exit();
});
