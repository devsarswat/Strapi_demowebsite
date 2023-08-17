import React, { createContext, useState } from 'react';

const ContextApi = createContext();

const ContextProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <ContextApi.Provider value={{ isLogin, setIsLogin }}>
      {children}
    </ContextApi.Provider>
  );
};

export { ContextApi, ContextProvider };
