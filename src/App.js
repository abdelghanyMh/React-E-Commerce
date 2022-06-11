import React from 'react'
import { Navbar, Sidebar, Footer } from './components'

import {
  BrowserRouter as Router, Routes, Route,
} from "react-router-dom";

// import pages 
import {
  Home,
  About,
  Products,
  SingleProduct,
  Cart,
  Checkout,
  Error,
  Private
} from './pages'


function App() {
  return (
    <Router>
      <Navbar />
      <Sidebar />

      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='about' element={<About />} />
        <Route path='cart' element={<Cart />} />
        <Route path='products' element={<Products />} >
          <Route path=':id' element={<SingleProduct />} />
        </Route>
        <Route path='checkout' element={<Checkout />} />
        <Route path='*' element={<Error />} />
      </Routes>
      <Footer />
    </Router >
  )
}

export default App
