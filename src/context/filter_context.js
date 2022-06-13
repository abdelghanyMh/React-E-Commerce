import React, { useEffect, useContext, useReducer } from 'react'
import reducer from '../reducers/filter_reducer'
import {
  LOAD_PRODUCTS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'
import { useProductsContext } from './products_context'

const initialState = {
  filtered_Products: [],
  all_products: [],
  grid_view: true
}

const FilterContext = React.createContext()

export const FilterProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  // get the products array 
  // cant do it inside the reducer cuz its simple fct not a react component or  a hnother hook so we cant invoke a hook inside it 
  const { products } = useProductsContext()
  useEffect(() => { dispatch({ type: LOAD_PRODUCTS, payload: products }) }, [products])



  return (
    <FilterContext.Provider value={{ ...state }}>
      {children}
    </FilterContext.Provider>
  )
}
// make sure use
export const useFilterContext = () => {
  return useContext(FilterContext)
}
