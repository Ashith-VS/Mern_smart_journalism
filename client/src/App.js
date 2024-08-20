import React from 'react'
import Router from './routes/Router'
import Modal from 'react-modal';
import "./App.css"
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
Modal.setAppElement('#root');

const App = () => {
  return (
    <div>
      <Router />
    </div>
  )
}

export default App