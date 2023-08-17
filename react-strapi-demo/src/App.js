import React from 'react';
import NavBar from './Component/Nevbar/NavBar'; 
import Routs from './Component/Routs/Routs'; 
import { ContextProvider } from './Component/Routs/ContextApi';  

const App = () => {
  return (
    <ContextProvider>
      <NavBar />
      <Routs />
    </ContextProvider>
  );
};

export default App;
