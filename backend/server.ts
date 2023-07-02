import mongoose from 'mongoose';
import express from 'express';
import path from 'path';
import { router } from './router';
import { User, messageStack } from './model';
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

const __dirname1 = path.resolve();

mongoose.connect(process.env.DATABASE_URL || '');

app.use(express.static(path.join(__dirname1, '/frontend/dist')));

app.get('*', (req, res) =>
  res.sendFile(path.resolve(__dirname1, 'frontend', 'dist', 'index.html'))
);

const superServer = app.listen(PORT);
const io = new Server(superServer, {
  cors: {
    origin: '*',
  },
});
console.log(`Server started on port ${PORT}`);

io.on('connection', (socket) => {
  console.log('socket connect successful');

  socket.on('join room', async (data) => {
    try {
      const resultedChat = await messageStack.findOne({
        chatters: [data.user, data.speaker].sort((a, b) => (a < b ? -1 : 1)),
      });
      if (!resultedChat) {
        await messageStack.insertMany({
          chatters: [data.user, data.speaker].sort((a, b) => (a < b ? -1 : 1)),
          messages: [],
        });
      }
      socket.join(data.room);

      console.log(socket.rooms);

      console.log(`${data.user} joins room: ${data.room}`);

      const finalChat = await messageStack.findOne({
        chatters: [data.user, data.speaker].sort((a, b) => (a < b ? -1 : 1)),
      });
      io.to(data.room).emit('message stack', finalChat?.messages || []);
    } catch (e) {
      console.error(e);
    }
  });

  socket.on('chat message', async (data) => {
    console.log('Client says', data.message);

    const name = data.user;
    const speaker = data.speaker;
    const mess = data.message;

    //await socket.join([name, speaker].sort((a, b) => (a < b ? -1 : 1)).join(''));

    if (data.message) {
      const newChat = await messageStack.findOne({
        chatters: [name, speaker].sort((a, b) => (a < b ? -1 : 1)),
      });
      if (!newChat) {
        await messageStack.insertMany({
          chatters: [name, speaker].sort((a, b) => (a < b ? -1 : 1)),
          messages: [mess],
        });
      } else
        await messageStack.updateOne(
          { chatters: [name, speaker].sort((a, b) => (a < b ? -1 : 1)) },
          { $push: { messages: mess } }
        );

      /*const existedChat = await User.findOne({ name, 'chats.user': speaker });
      existedChat
        ? (await User.updateOne(
            { name },
            { $push: { 'chats.$[t].messages': { hero: name, comment: mess } } },
            { arrayFilters: [{ 't.user': speaker }] }
          )) &&
          (await User.updateOne(
            { name: speaker },
            { $push: { 'chats.$[t].messages': { hero: name, comment: mess } } },
            { arrayFilters: [{ 't.user': name }] }
          ))
        : (await User.updateOne(
            { name },
            { $push: { chats: { user: speaker, messages: { hero: name, comment: mess } } } }
          )) &&
          (await User.updateOne(
            { name: speaker },
            { $push: { chats: { user: name, messages: { hero: name, comment: mess } } } }
          ));*/

      /*newChat
        ? await messageStack.updateOne({ $push: { messages: mess } })
        : new messageStack(
            { chatters: [name, speaker].sort((a, b) => (a < b ? 1 : -1)) },
            { messages: [mess] }
          );*/
    }

    const resultedChat = await messageStack.findOne({
      chatters: [name, speaker].sort((a, b) => (a < b ? -1 : 1)),
    });

    io.to([name, speaker].sort((a, b) => (a < b ? -1 : 1)).join('')).emit(
      'message stack',
      resultedChat?.messages || []
    );

    /*const user = await User.findOne({ name });
    io.emit(
      'message stack',
      user?.chats?.find((item: { user?: string | undefined }) => item.user === speaker)?.messages ||
        []
    );*/
    /*const neededChat = await messageStack.findOne({
      chatters: [name, speaker].sort((a, b) => (a < b ? -1 : 1)),
    });
    io.to([name, speaker].sort((a, b) => (a < b ? -1 : 1)).join('')).emit(
      'message stack',
      neededChat?.messages || []
    );*/
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
