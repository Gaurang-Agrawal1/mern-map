import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Login from './components/Login'
import Register from './components/Register'
import Home from './components/Home'
import UploadArt from './components/UploadArt'
import Image from './components/Image'
import Profile from './components/Profile'

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/home' element={<Home />}></Route>
        <Route path='/addArt' element={<UploadArt />}></Route>
        <Route path='/image/:id' element={<Image />}></Route>
        <Route path='/profile' element={<Profile />}></Route>
      </Routes>
    </Router>
  )
}

export default App
