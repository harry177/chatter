import React, { useState } from 'react';
import { CommonView } from './Components/CommonView/CommonView';
import { Header } from './Components/Header/Header';
import { Footer } from './Components/Footer/Footer';
import './App.scss';
export const App = () => {
    const [data, setData] = useState('');
    const handleDataChange = (data) => {
        setData(data);
    };
    return (React.createElement("div", { className: "general" },
        React.createElement(Header, { user: data }),
        React.createElement(CommonView, { dispatchData: handleDataChange, finalData: data }),
        React.createElement(Footer, null)));
};
export default App;
