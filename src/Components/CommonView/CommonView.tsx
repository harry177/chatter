import React, { useState } from 'react';
import './CommonView.scss';
import { Header } from '../Header/Header';
import { EntryLogo } from '../EntryLogo/EntryLogo';
import { EntryForm } from '../EntryForm/EntryForm';
import { Footer } from '../Footer/Footer';

export const CommonView = () => {
  const [param, setParam] = useState(false);

  const handleParamChange = (param: React.SetStateAction<boolean>) => {
    setParam(param);
  };
  return (
    <div className="general">
      <Header />
      <div className="central">
        <EntryLogo param={param} />
        <EntryForm setProps={handleParamChange} />
      </div>
      <Footer />
    </div>
  );
};
