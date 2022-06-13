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
  else if (action.type === SET_LISTVIEW) {
    return { ...state, grid_view: false }
  }
  else if (action.type === SET_GRIDVIEW) {
    return { ...state, grid_view: true }
  }
  else if (action.type === UPDATE_SORT) {
    return { ...state, sort: action.payload }
  }
  else if (action.type === SORT_PRODUCTS) {
    const { filtered_Products, sort } = state
    let sortedProducts = []

    if (sort === 'price-lowest') {
      sortedProducts = filtered_Products.sort((a, b) => a.price - b.price) // For ascending sort (lower to highest price)
    } else if (sort === 'price-highest') {
      sortedProducts = filtered_Products.sort((a, b) => b.price - a.price) // For descending sort (highest to lower price)
    }
    else if (sort === 'name-a') {
      sortedProducts = filtered_Products.sort((a, b) => a.name.localeCompare(b.name)) // For ascending sort A-Z
    }
    else if (sort === 'name-z') {
      sortedProducts = filtered_Products.sort((a, b) => b.name.localeCompare(a.name)) // For ascending sort Z-A

    }
    return { ...state, filtered_Products: sortedProducts }

  }
  return state
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default filter_reducer
