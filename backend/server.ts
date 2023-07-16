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
/*const io = new Server<SocketData, ClientToServerEvents>(superServer, {
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

const users: string[] = [];

io.on('connection', (socket) => {
  console.log('socket connect successful');

  socket.emit('newConnect');

  socket.on('addUser', (newUser) => {
    if (!users.some((user) => user === newUser)) {
      users.push(newUser);
    }
    users.sort((a, b) => (a < b ? -1 : 1));
    io.emit('getUsers', users);
  });

  console.log(users);

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
    }

    const resultedChat = await messageStack.findOne({
      chatters: [name, speaker].sort((a, b) => (a < b ? -1 : 1)),
    });

    io.to([name, speaker].sort((a, b) => (a < b ? -1 : 1)).join(''))
      .to(socket.id)
      .emit('messageStack', resultedChat?.messages || []);
  });

  socket.on('getAll', async () => {
    const resultedUsers = [];
    const users = await User.find({});

    for (const i of users) {
      resultedUsers.push(users[users.indexOf(i)].name);
    }
    io.to(socket.id).emit('allUsers', resultedUsers);
  });

  socket.on('disconnect', () => {
    users.splice(users.indexOf(socket.data.username), 1);
    users.sort((a, b) => (a < b ? -1 : 1));
    io.emit('getFinalUsers', users);
    console.log('🔥: A user disconnected');
  });
});*/

process.on('SIGINT', async () => {
  await mongoose.disconnect();
  console.log('Приложение завершило работу');
  process.exit();
});
