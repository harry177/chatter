import mongoose from 'mongoose';
import express from 'express';
import { router } from './router';
import { User } from './model';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser, { OptionsUrlencoded } from 'body-parser';
import { Server } from 'socket.io';

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
    const speaker = data.speaker;
    const mess = data.message;

    if (data.message) {
      const existedChat = await User.findOne({ name, 'chats.user': speaker });
      console.log(existedChat);
      existedChat
        ? (await User.updateOne(
            { name },
            { $push: { 'chats.$[t].messages': mess } },
            { arrayFilters: [{ 't.user': speaker }] }
          )) &&
          (await User.updateOne(
            { name: speaker },
            { $push: { 'chats.$[t].messages': mess } },
            { arrayFilters: [{ 't.user': name }] }
          ))
        : (await User.updateOne(
            { name },
            { $push: { chats: { user: speaker, messages: mess } } }
          )) &&
          (await User.updateOne(
            { name: speaker },
            { $push: { chats: { user: name, messages: mess } } }
          ));
      //console.log(existedChat);
      //await User.updateOne({ name: name }, { $push: { messages: mess } });
    }

    const user = await User.findOne({ name });
    io.emit(
      'message stack',
      user?.chats?.find((item: { user?: string | undefined }) => item.user === speaker)?.messages ||
        []
    );
  });
  socket.on('get users', async () => {
    const users = await User.find({});
    io.emit('all users', users);
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
