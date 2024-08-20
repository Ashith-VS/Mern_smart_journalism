import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { About, AllNews, DeletedJournalist, DeletedMediaAdmins, Draft, EditProfile, Home, Journalist, Login, MediaAdmin, News, NewsApproved, NewsDetail, NewsDetails, NewsRejected, NewsStatus, PageNotFound, Profile, Published, Register, SavedNews, SuperAdmin, Unauthorized } from '../screens';
import PrivateRoute from './PrivateRoute';
import Loader from '../components/Loader';

const Router = () => {

return (
<BrowserRouter>
<Loader/>
<Routes>
 {/* Public routes */}
    <Route path="/" element={<Home />} />
    <Route path="/news/:id" element={<NewsDetails />} />
    <Route path="/about" element={<About />} />
    <Route path="/login" element={<Login/>} />
    <Route path="/register" element={<Register/>} />
    <Route path="/register/:id" element={<Register/>} />
    <Route path="*" element={<PageNotFound/>} />
    
{/* Private Routes */}
       <Route element={<PrivateRoute roles={['superAdmin']} />}>
          <Route path="/admin" element={<SuperAdmin />} />
          <Route path="/admin/allnews" element={<AllNews />} />
          <Route path="/admin/allnews/:id" element={<AllNews />} />
          <Route path="/admin/deleted" element={<DeletedMediaAdmins />} />
        </Route>
        <Route element={<PrivateRoute roles={['mediaAdmin']} />}>
          <Route path="/mediaAdmin" element={<MediaAdmin />} />
          <Route path="/mediaAdmin/Status" element={<NewsStatus />} />
          <Route path="/mediaAdmin/published" element={<NewsApproved />} />
          <Route path="/mediaAdmin/rejected" element={<NewsRejected />} />
          <Route path="/mediaAdmin/deleted" element={<DeletedJournalist />} />
        </Route>
        <Route element={<PrivateRoute roles={['Journalist']} />}>
          <Route path="/journalist" element={<Journalist />} />
          <Route path="/journalist/:id" element={<Journalist />} />
          <Route path="/journalist/news" element={<News />} />
          <Route path="/journalist/news/:id" element={<NewsDetail />} />
          <Route path="/journalist/published" element={<Published />} />
          <Route path="/draft" element={<Draft />} />
        </Route>
        <Route element={<PrivateRoute roles={['user', 'mediaAdmin', 'Journalist', 'superAdmin']} />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/edit" element={<EditProfile />} />
          <Route path="/saved" element={<SavedNews />} />
        </Route>
{/* Unauthorized Route */}
        <Route path="/unauthorized" element={<Unauthorized />} />
</Routes>
</BrowserRouter>
  )
}

export default Router