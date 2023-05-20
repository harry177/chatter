import React, { useState } from 'react';
import './ChatField.scss';
import { io, Socket } from 'socket.io-client';

interface IChatField {
  storage: string;
}

/*interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
}

interface ClientToServerEvents {
  hello: () => void;
}

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io();*/

const socket = io('http://localhost:3000');

export const ChatField: React.FC<IChatField> = ({ storage }) => {
  const have = JSON.parse(localStorage.getItem('stack') || '[]');
  const user = localStorage.getItem('user');

  const [state, setState] = useState([]);
  if (storage) {
    socket.emit('chat message', {
      user,
      message: storage,
    });
    socket.on('message stack', (msg) => {
      console.log(msg);
      setState(msg);
    });
  }

  console.log(state);

  return (
    <div className="chat-field">
      {(storage || !storage) &&
        have.map((message: string) => {
          return <p key={have.indexOf(message)}>{message}</p>;
        })}
    </div>
  );
};
