import React, { createContext, useState } from 'react';

const ContextApi = createContext();

const ContextProvider = ({ children }) => {
  const udata = () => {
    const storedUser = JSON.parse(localStorage.getItem("id"));
    return storedUser ? storedUser : null;
  };
  const [isLogin, setIsLogin] = useState(udata);
  const [products, setProducts] = useState([]);
  const [selectproduct, setselectproduct]=useState(null)
  const [user, setUser]=useState(null)
  const Token=localStorage.getItem("SessionId")
  

  return (
    <ContextApi.Provider value={{ isLogin, setIsLogin ,products, setProducts,selectproduct, setselectproduct,user, setUser,Token}}>
      {children}
    </ContextApi.Provider>
  );
};

export { ContextApi, ContextProvider };
