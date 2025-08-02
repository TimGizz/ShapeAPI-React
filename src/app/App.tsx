import { useState } from 'react';
import '../styles/global.css';
import '../styles/_variables.css';
import '../styles/font.css';
import { RouterProvider } from 'react-router-dom';
import router from './Router';
import { LangContext } from '../context/LangContext';

function App() {
  const [lang, setLang] = useState<'ru' | 'en'>((localStorage.getItem('lang') as 'ru' | 'en') || 'ru');
  return (
    <>
      <LangContext.Provider value={{ lang, setLang }}>
        <RouterProvider router={router} />
      </LangContext.Provider>
    </>
  );
}

export default App;
