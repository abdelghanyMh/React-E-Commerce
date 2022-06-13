import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'

const filter_reducer = (state, action) => {
  if (action.type === LOAD_PRODUCTS) {
    return { ...state, all_products: [...action.payload], filtered_Products: [...action.payload] }
    // return { ..state, all_products: action.payload, filtered_Products: action.payload }
    // this wrong cuz all_products,filtered_Products will point to the same place in the memory 
  }
  return state
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default filter_reducer
