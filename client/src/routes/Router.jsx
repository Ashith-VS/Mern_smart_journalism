import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { About, AllNews, Home, Journalist, Login, MediaAdmin, News, NewsApproved, NewsDetail, NewsDetails, NewsRejected, NewsStatus, Profile, Published, Register, SavedNews, SuperAdmin } from '../screens';

const Router = () => {
  return (
   <BrowserRouter>
   <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/news/:id" element={<NewsDetails />} />
    <Route path="/saved" element={<SavedNews />} />
    <Route path="/about" element={<About />} />
    <Route path="/login" element={<Login/>} />
    <Route path="/register" element={<Register/>} />
    <Route path="/register/:id" element={<Register/>} />
    <Route path="/admin" element={<SuperAdmin/>}/>
    <Route path="/admin/allnews" element={<AllNews/>}/>
    <Route path="/admin/allnews/:id" element={<AllNews/>}/>
    <Route path="/mediaAdmin"element={<MediaAdmin/>}/>
    <Route path="/mediaAdmin/Status"element={<NewsStatus/>}/>
    <Route path="/mediaAdmin/published"element={<NewsApproved/>}/>
    <Route path="/mediaAdmin/rejected"element={<NewsRejected/>}/>
    <Route path="/journalist" element={<Journalist/>} />
    <Route path="/journalist/news" element={<News/>} />
    <Route path="/journalist/news/:id" element={<NewsDetail/>} />
    <Route path="/journalist/published" element={<Published/>} />

    <Route path="/profile" element={<Profile/>} />
   </Routes>
   </BrowserRouter>
  )
}

export default Router