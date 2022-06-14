import axios from 'axios'
import React, { useContext, useEffect, useReducer } from 'react'
import reducer from '../reducers/products_reducer'
import { products_url as url } from '../utils/constants'
import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
} from '../actions'

const initialState = {
  isSidebarOpen: false,
  products_loading: false,
  products_error: false,
  products: [],
  featured_products: [],
  single_product_loading: false,
  single_product_error: false,
  single_product: {},
}

const ProductsContext = React.createContext()

export const ProductsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  // close side bar 
  const closeSidebar = () => {
    dispatch({ type: SIDEBAR_CLOSE })
  }
  // open side bar 
  const openSidebar = () => {
    dispatch({ type: SIDEBAR_OPEN })
  }

  //  fetch products 
  const fetchProducts = async (url) => {
    dispatch({ type: GET_PRODUCTS_BEGIN })
    try {
      const response = await axios.get(url)
      const single_product = await response.data
      dispatch({ type: GET_PRODUCTS_SUCCESS, payload: single_product })

    } catch (error) {
      dispatch({ type: GET_PRODUCTS_ERROR })
    }
  }

  //  fetch single product 
  const fetchSingleProduct = async (single_product_url) => {
    
    dispatch({ type: GET_SINGLE_PRODUCT_BEGIN })
    try {
      const response = await axios.get(single_product_url)
      const single_product = await response.data
      
      dispatch({ type: GET_SINGLE_PRODUCT_SUCCESS, payload: single_product })

      
    } catch (error) {
      console.log('fk');
      dispatch({ type: GET_SINGLE_PRODUCT_ERROR })
    }
  }

  useEffect(() => {
    fetchProducts(url)

  }, [])
  return (
    <ProductsContext.Provider value={{ ...state, closeSidebar, openSidebar, fetchSingleProduct }}>
      {children}
    </ProductsContext.Provider>
  )
}
// make sure use
export const useProductsContext = () => {
  return useContext(ProductsContext)
}
