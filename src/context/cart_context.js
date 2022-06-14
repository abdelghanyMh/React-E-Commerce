import React, { useEffect, useContext, useReducer } from 'react'
import reducer from '../reducers/cart_reducer'
import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
  CLEAR_CART,
  COUNT_CART_TOTALS,
} from '../actions'

// get the cart value form the locale storage
const getLocalStorage = () => {
  const cart = localStorage.getItem('cart')
  return cart ? JSON.parse(cart) : []
}

const initialState = {
  cart: getLocalStorage(),
  total_items: 0,
  total_amount: 0,
  shipping_fee: 534
}

const CartContext = React.createContext()

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)


  const AddToCart = ({ id, mainColor, amount, product }) => {
    dispatch({ type: ADD_TO_CART, payload: { id, color: mainColor, amount, product } })
  }

  // remove item 
  const removeItem = (id) => {
    console.log('wtf');
    dispatch({ type: REMOVE_CART_ITEM, payload: id })

  }

  // toggle amount 
  const toggleAmount = (id, value) => {
    dispatch({ type: TOGGLE_CART_ITEM_AMOUNT, payload: { id, value } })
  }

  // clear cart 
  const clearCart = () => {
    dispatch({ type: CLEAR_CART })
  }

  // store the cart locally on change to save item on renrender
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.cart))
  }, [state.cart])
  return (
    <CartContext.Provider value={{ ...state, AddToCart, removeItem, toggleAmount, clearCart }}>{children}</CartContext.Provider>
  )
}
// make sure use
export const useCartContext = () => {
  return useContext(CartContext)
}
