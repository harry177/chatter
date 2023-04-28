import React, { useState } from 'react';
import './CommonView.scss';
import { Header } from '../Header/Header';
import { EntryLogo } from '../EntryLogo/EntryLogo';
import { EntryForm } from '../EntryForm/EntryForm';
import { Footer } from '../Footer/Footer';
import { Chat } from '../Chat/Chat';

export const CommonView = () => {
  const [param, setParam] = useState(false);
  const [data, setData] = useState('');

  const handleParamChange = (param: React.SetStateAction<boolean>) => {
    setParam(param);
  };

  const handleDataChange = (data: React.SetStateAction<string>) => {
    setData(data);
  }
  
  return (
    <div className="general">
      <Header user={data} />
      <div className="central">
        <EntryLogo param={param} />
        <EntryForm setProps={handleParamChange} setName={handleDataChange} />
        <Chat open={param} />
      </div>
      <Footer />
    </div>
  );
};
