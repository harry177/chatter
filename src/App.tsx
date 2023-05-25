import React, { useState } from 'react';
import './App.scss';
import { CommonView } from './Components/CommonView/CommonView';
import { Header } from './Components/Header/Header';
import { Footer } from './Components/Footer/Footer';

export const App = () => {
  const [data, setData] = useState('');

  const handleDataChange = (data: React.SetStateAction<string>) => {
    setData(data);
  };
  return (
    <div className="general">
      <Header user={data} />
      <CommonView dispatchData={handleDataChange} finalData={data} />
      <Footer />
    </div>
  );
};

export default App;
