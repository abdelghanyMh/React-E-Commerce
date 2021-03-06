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
  Private,
  AuthWrapper
} from './pages'

function App() {
  return (
    <AuthWrapper>
      <Router>
        <Navbar />
        <Sidebar />
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='about' element={<About />} />
          <Route path='cart' element={<Cart />} />
          <Route path='products'  >
            <Route index element={<Products />} />
            <Route path=':id' element={<SingleProduct />} />
          </Route>
          <Route path='checkout'
            element={
              <Private>
                <Checkout />
              </Private>
            }
          />
          <Route path='*' element={<Error />} />
        </Routes>
        <Footer />
      </Router >
    </AuthWrapper>
  )
}

export default App
