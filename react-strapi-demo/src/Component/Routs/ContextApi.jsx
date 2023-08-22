import React, { createContext, useState } from 'react';

const ContextApi = createContext();

const ContextProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [products, setProducts] = useState([]);
  const [selectproduct, setselectproduct]=useState(null)

  return (
    <ContextApi.Provider value={{ isLogin, setIsLogin ,products, setProducts,selectproduct, setselectproduct}}>
      {children}
    </ContextApi.Provider>
  );
};

export { ContextApi, ContextProvider };
