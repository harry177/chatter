import mongoose from 'mongoose';
import express from 'express';
import { router } from './router';
import { User } from './model';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser, { OptionsUrlencoded } from 'body-parser';
import { createServer } from 'http';
import { Server } from 'socket.io';

dotenv.config();
const app = express();

//const httpServer = createServer(app);
//const io = new Server(httpServer);

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

await mongoose.connect(process.env.DATABASE_URL || '');
const superServer = app.listen(PORT);
const io = new Server(superServer, {
  cors: {
    origin: 'http://localhost:5173',
  },
});
console.log(`Sever started on port ${PORT}`);

io.on('connection', (socket) => {
  console.log('socket connect successful');

  socket.on('chat message', async (data) => {
    console.log('Client says', data.message);

    const name = data.user;
    const mess = data.message;
    const updateMess = await User.updateOne({ name: name }, { $push: { messages: mess } });
    io.emit('message stack', updateMess);
  });
  socket.on('disconnect', () => {
    console.log('🔥: A user disconnected');
  });
});

process.on('SIGINT', async () => {
  await mongoose.disconnect();
  console.log('Приложение завершило работу');
  process.exit();
});
