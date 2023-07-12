import React, { useEffect, useRef, useState } from 'react';
import './Chat.styles.scss';
import { ChatField } from '../ChatField/ChatField';
import { ChatInput } from '../ChatInput/ChatInput';
import { ChatUsers } from '../ChatUsers/ChatUsers';
import { socket } from '../../socket';

interface IChat {
  user: string;
}

export const Chat: React.FC<IChat> = ({ user }) => {
  const [state, setState] = useState('');
  const [chat, setChat] = useState('');

  const [connect, setConnect] = useState(false);

  const [online, setOnline] = useState<string[]>([]);
  const onlineRef = useRef<string[]>(online);

  const handleChatState = (chat: React.SetStateAction<string>) => {
    setChat(chat);
    setState('');
  };

  const handleStorageChange = (state: React.SetStateAction<string>) => {
    setState(state);
  };

  useEffect(() => {
    onlineRef.current = online;
  }, [online]);

  useEffect(() => {
    if (user) {
      console.log('User active!');
      socket.auth = { user };
      socket.connect();
      socket.emit('addUser', user);
      socket.on('getUsers', (users) => {
        console.log(users);
        if (
          users.length !== onlineRef.current.length ||
          users.every((value: string, index: number) => value !== onlineRef.current[index])
        ) {
          setOnline(users);
        }
      });
      return () => {
        socket.disconnect();
        socket.off('getUsers');
      };
    } else {
      console.log('No user');
    }
  }, [user, connect]);

  useEffect(() => {
    if (!user) {
      setOnline([]);
    }
  }, [user]);

  useEffect(() => {
    socket.on('getFinalUsers', (users) => {
      if (user) {
        console.log(users);
        if (
          users.length !== onlineRef.current.length ||
          users.every((value: string, index: number) => value !== onlineRef.current[index])
        ) {
          setOnline(users);
        }
        if (
          !users.find((mainUser: string) => {
            mainUser === user;
          }) &&
          user !== ''
        ) {
          //online.length !== 0 ? setOnline([]) : console.log(online);
          setConnect((prevState) => !prevState);
        }
      } else {
        setChat('');
      }
    });
    return () => {
      socket.off('getFinalUsers');
    };
  }, [user, online]);

  console.log(user);
  console.log(online);
  console.log(chat);
  console.log(state);

  if (!user) return null;
  return (
    <div className="chat">
      <ChatUsers dispatchChatState={handleChatState} online={online} user={user} />
      <div className="right-chat__block">
        <ChatField storage={state} chatSpeaker={chat} online={online} user={user} />
        <ChatInput setStorage={handleStorageChange} chatSpeaker={chat} />
      </div>
    </div>
  );
};
