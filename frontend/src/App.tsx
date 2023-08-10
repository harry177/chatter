import React from 'react';
import { CommonView } from './Components/CommonView/CommonView';
import { Header } from './Components/Header/Header';
import { Footer } from './Components/Footer/Footer';
import { useAppSelector } from './app/hooks';
import './App.scss';

export const App = () => {
  const user = useAppSelector((state) => state.user.user);

  if (!user) {
    sessionStorage.removeItem('chat');
  }

  return (
    <div className="general">
      <Header />
      <CommonView />
      <Footer />
    </div>
  );
};

export default App;
