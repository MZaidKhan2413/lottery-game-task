import React, { useState } from 'react';
import Home from './components/Home';
import Popup from './components/Popup';
import "./App.css"

const App = () => {
  const [popupMessage, setPopupMessage] = useState(null);
  const handlePopupClose = () => { 
    setPopupMessage(null);
  }

  return (
    <div className='app'>
      <Home setPopupMessage={setPopupMessage} />
      <Popup message={popupMessage} onClose={handlePopupClose} />
    </div>
  )
};

export default App;
