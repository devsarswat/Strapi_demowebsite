import { useContext, useEffect } from "react";
import { ContextApi } from "./Routs/ContextApi";
import axios from "axios";

function Userdata() {
  const { setUser, Token, isLogin} = useContext(ContextApi);

  useEffect(() => {
    if(isLogin){
    axios.get('http://localhost:1337/api/users/me', {
      headers: {
        Authorization: `Bearer ${Token}`,
      },
    })
    .then((res) => setUser(res.data))
    .catch((error) => console.error(error));
}
  }, [isLogin,Token,setUser]); 
  return null;
}
 

export default Userdata;