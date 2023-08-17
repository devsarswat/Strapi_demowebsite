import React, {useContext} from 'react'
import {Routes, Route, Navigate} from "react-router-dom"
import Login from '../Login/Login'
import Registration from '../Registration/Registration'
import Home from '../Home/Home';
import ProductCard from '../product/ProductCard';
import { ContextApi } from './ContextApi'


const Routs = () => {
  
  return (
      <Routes>
      {/* <Route path='/' element={<Home/>}/> */}
      <Route path='/product' element={<ProductCard/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signin' element={<Registration/>}/>
      <Route path='/*' element={<Home/>}/>
      <Route path='/' element={<PrivateRoute element={<Home/>}/>}/>
      </Routes>
   
  )
}
const PrivateRoute=({element})=>{
  const{isLogin}=useContext(ContextApi)
  return isLogin ? element :<Navigate to='/login'/>;
}
export default Routs
