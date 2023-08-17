import React, { createContext, useState } from 'react';

const ContextApi = createContext();

const ContextProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [products, setProducts] = useState([]);

  return (
    <ContextApi.Provider value={{ isLogin, setIsLogin ,products, setProducts}}>
      {children}
    </ContextApi.Provider>
  );
};

export { ContextApi, ContextProvider };
