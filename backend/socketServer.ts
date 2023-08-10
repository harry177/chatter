import { Server } from 'socket.io';
import { User, messageStack } from './model';
import http from 'http';

interface SocketData {
  username: string;
  joinRoom: (data: { user: string; speaker: string; formerSpeaker: string; room: string }) => void;
  getAll: () => void;
  chatMessage: (data: { user: string; speaker: string; message: string }) => void;
  addUser: (data: string) => void;
}

interface ClientToServerEvents {
  messageStack: (
    data: { hero?: string | undefined; comment?: string | undefined }[] | undefined
  ) => void;
  allUsers: (a: string[]) => void;
  getUsers: (data: string[]) => void;
  getFinalUsers: (data: string[]) => void;
  newConnect: () => void;
}

export const socketServer = (server: http.Server, PORT: string | number) => {
  const io = new Server<SocketData, ClientToServerEvents>(server, {
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

    socket.on('addUser', async (newUser) => {
      const resultedUsers = [];
      const allUsers = await User.find({});

      for (const i of allUsers) {
        resultedUsers.push(allUsers[allUsers.indexOf(i)].name);
      }
      io.emit('allUsers', resultedUsers);

      if (!users.some((user) => user === newUser)) {
        users.push(newUser);
      }
      users.sort((a, b) => (a < b ? -1 : 1));
      io.emit('getUsers', users);
      console.log(users);
    });

    socket.on('joinRoom', async (data) => {
      if (data.formerSpeaker) {
        socket.leave([data.user, data.formerSpeaker].sort((a, b) => (a < b ? -1 : 1)).join(''));
        console.log(
          `${data.user} leaves room: ${[data.user, data.formerSpeaker]
            .sort((a, b) => (a < b ? -1 : 1))
            .join('')}`
        );
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
      // Getting a list of active rooms
      const activeRooms = [];

      for (const [room, _] of io.sockets.adapter.rooms.entries()) {
        const socketsInRoom = io.sockets.adapter.rooms.get(room);

        if (socketsInRoom && socketsInRoom.size > 0) {
          activeRooms.push(room);
        }
      }

      // Output of the active rooms list to the console
      console.log('Active chat rooms:');
      activeRooms.forEach((room) => {
        console.log(room);
      });
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
      io.emit('allUsers', resultedUsers);
    });

    socket.on('disconnect', () => {
      users.splice(users.indexOf(socket.data.username), 1);
      users.sort((a, b) => (a < b ? -1 : 1));
      io.emit('getFinalUsers', users);
      console.log('🔥: A user disconnected');
      console.log(users);
      // Getting a list of active rooms
      const activeRooms = [];

      for (const [room, _] of io.sockets.adapter.rooms.entries()) {
        const socketsInRoom = io.sockets.adapter.rooms.get(room);

        if (socketsInRoom && socketsInRoom.size > 0) {
          activeRooms.push(room);
        }
      }

      // Output of the active rooms list to the console
      console.log('Active chat rooms:');
      activeRooms.forEach((room) => {
        console.log(room);
      });
    });
  });
};
