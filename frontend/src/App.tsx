import React, { MutableRefObject, useEffect, useRef, useState } from 'react';
import { CommonView } from './Components/CommonView/CommonView';
import { Header } from './Components/Header/Header';
import { Footer } from './Components/Footer/Footer';
import './App.scss';

export const App = () => {
  const [data, setData] = useState('');

  const handleDataChange = (data: React.SetStateAction<string>) => {
    setData(data);
  };

  const viewportMeta = useRef() as MutableRefObject<HTMLMetaElement>;
  let isZoomAllowed = true;

  function handleInputStart(): void {
    isZoomAllowed = false;
    viewportMeta.current.setAttribute('user-scalable', 'no');
  }

  function handleInputEnd(): void {
    isZoomAllowed = true;
    viewportMeta.current.setAttribute('user-scalable', 'yes');
  }

  function handleInputFocus(): void {
    isZoomAllowed = false;
    viewportMeta.current.setAttribute('user-scalable', 'no');
  }

  function handleInputBlur(): void {
    isZoomAllowed = true;
    viewportMeta.current.setAttribute('user-scalable', 'yes');
  }

  function handleDocumentTouchMove(event: TouchEvent): void {
    if (!isZoomAllowed) {
      event.preventDefault();
    }
  }

  useEffect(() => {
    viewportMeta.current = document.querySelector('meta[name="viewport"]') as HTMLMetaElement;

    const inputs = document.querySelectorAll('input');
    inputs.forEach((input) => {
      input.addEventListener('touchstart', handleInputStart);
      input.addEventListener('mousedown', handleInputStart);
      input.addEventListener('touchend', handleInputEnd);
      input.addEventListener('mouseup', handleInputEnd);
      input.addEventListener('focus', handleInputFocus);
      input.addEventListener('blur', handleInputBlur);
    });

    document.addEventListener('touchmove', handleDocumentTouchMove, { passive: false });

    return () => {
      inputs.forEach((input) => {
        input.removeEventListener('touchstart', handleInputStart);
        input.removeEventListener('mousedown', handleInputStart);
        input.removeEventListener('touchend', handleInputEnd);
        input.removeEventListener('mouseup', handleInputEnd);
        input.removeEventListener('focus', handleInputFocus);
        input.removeEventListener('blur', handleInputBlur);
      });

      document.removeEventListener('touchmove', handleDocumentTouchMove);
    };
  }, []);

  return (
    <div className="general">
      <Header dispatchExit={handleDataChange} user={data} />
      <CommonView dispatchData={handleDataChange} finalData={data} />
      <Footer />
    </div>
  );
};

export default App;
