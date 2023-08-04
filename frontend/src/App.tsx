import React, { useState } from 'react';
import { CommonView } from './Components/CommonView/CommonView';
import { Header } from './Components/Header/Header';
import { Footer } from './Components/Footer/Footer';
import './App.scss';

export const App = () => {
  const [data, setData] = useState('');

  const handleDataChange = (data: React.SetStateAction<string>) => {
    setData(data);
  };

  if (!data) {
    sessionStorage.removeItem('chat');
  }

  return (
    <div className="general">
      <Header dispatchExit={handleDataChange} user={data} />
      <CommonView dispatchData={handleDataChange} finalData={data} />
      <Footer />
    </div>
  );
};

export default App;
