import mongoose from 'mongoose';
import express from 'express';
import path from 'path';
import { router } from './router';
import { User, messageStack } from './model';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser, { OptionsUrlencoded } from 'body-parser';
import { Server } from 'socket.io';

interface SocketData {
  username: string;
  joinRoom: (data: { user: string; speaker: string; formerSpeaker: string; room: string }) => void;
  getUsers: () => void;
  chatMessage: (data: { user: string; speaker: string; message: string }) => void;
}

interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
  note: (f: string[]) => string[];
}

interface ClientToServerEvents {
  note: (f: string[]) => void;
  messageStack: (
    data: { hero?: string | undefined; comment?: string | undefined }[] | undefined
  ) => void;
  allUsers: (a: string[]) => void;
}

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
const io = new Server<SocketData, ClientToServerEvents, ServerToClientEvents>(superServer, {
  cors: {
    origin: '*',
  },
});
console.log(`Server started on port ${PORT}`);

io.use((socket, next) => {
  const username = socket.handshake.auth.user;
  if (!username) {
    return next(new Error('invalid username'));
  }
  socket.data.username = username;
  next();
});

io.on('connection', (socket) => {
  console.log('socket connect successful');

  const users: string[] = [];
  users.push(socket.data.username);

  console.log(users);
  socket.emit('note', users);

  socket.on('joinRoom', async (data) => {
    if (data.formerSpeaker) {
      socket.leave([data.user, data.formerSpeaker].sort((a, b) => (a < b ? -1 : 1)).join(''));
    }
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
      //io.to(data.room).emit('message stack', finalChat?.messages || []);
      io.to(data.room)
        .to(socket.id)
        .emit('messageStack', finalChat?.messages || []);
    } catch (e) {
      console.error(e);
    }
  });

  socket.on('chatMessage', async (data) => {
    console.log('Client says', data.message);

    const name = data.user;
    const speaker = data.speaker;
    const mess = data.message;

    if (data.message) {
      const newChat = await messageStack.findOne({
        chatters: [name, speaker].sort((a, b) => (a < b ? -1 : 1)),
      });
      if (!newChat) {
        await messageStack.insertMany({
          chatters: [name, speaker].sort((a, b) => (a < b ? -1 : 1)),
          messages: [{ hero: name, comment: mess }],
        });
      } else
        await messageStack.updateOne(
          { chatters: [name, speaker].sort((a, b) => (a < b ? -1 : 1)) },
          { $push: { messages: { hero: name, comment: mess } } }
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

    io.to([name, speaker].sort((a, b) => (a < b ? -1 : 1)).join(''))
      .to(socket.id)
      .emit('messageStack', resultedChat?.messages || []);

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
  socket.on('getUsers', async () => {
    const resultedUsers = [];
    const users = await User.find({});
    //const range = Object.values(users);
    for (const i of users) {
      resultedUsers.push(users[users.indexOf(i)].name);
    }
    io.to(socket.id).emit('allUsers', resultedUsers);
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
