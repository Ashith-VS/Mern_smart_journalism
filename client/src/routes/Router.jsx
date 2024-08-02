import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Articles, Home, Journalist, Login, MediaAdmin, Notification, Profile, Register, SuperAdmin } from '../screens';


const Router = () => {
  return (
   <BrowserRouter>
   <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login/>} />
    <Route path="/register" element={<Register/>} />
    <Route path="/admin" element={<SuperAdmin/>}/>
    <Route path="/mediaAdmin"element={<MediaAdmin/>}/>
    <Route path="/mediaAdmin/notification"element={<Notification/>}/>
    <Route path="/journalist" element={<Journalist/>} />
    <Route path="/journalist/news" element={<Articles/>} />
    <Route path="/profile" element={<Profile/>} />
   </Routes>
   </BrowserRouter>
  )
}

export default Router