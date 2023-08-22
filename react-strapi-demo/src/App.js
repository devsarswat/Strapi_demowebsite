import React from 'react';
import NavBar from './Component/Nevbar/NavBar'; 
import Routs from './Component/Routs/Routs'; 
import { ContextProvider } from './Component/Routs/ContextApi'; 
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";


const App = () => {
  return (
    <ContextProvider>
      <NavBar />
      <Routs />
    </ContextProvider>
  );
};

export default App;
