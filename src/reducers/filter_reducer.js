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
    let maxPrice = getMAxPrice(action);
    return {
      ...state,
      all_products: [...action.payload],
      filtered_Products: [...action.payload],
      filters: {
        ...state.filters,
        max_price: maxPrice,
        price: maxPrice
      }
    }
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
  else if (action.type == UPDATE_FILTERS) {
    const { name, value } = action.payload
    return { ...state, filters: { ...state.filters, [name]: value } }

  }
  else if (action.type === FILTER_PRODUCTS) {
    const { all_products } = state
    const {
      text,
      company,
      category,
      color,
      price,
      shipping
    } = state.filters
    let tempProducts = all_products

    // filtering
    if (text) {
      tempProducts = tempProducts.filter(product => product.name.toLowerCase().includes(text))
    }

    // color
    if (color !== 'all') {
      tempProducts = tempProducts.filter(product => product.colors.indexOf(color) !== -1)
    }

    // company
    if (company !== 'all') {
      tempProducts = tempProducts.filter(product => product.company === company)
    }

    //category
    if (category !== 'all') {
      tempProducts = tempProducts.filter(
        (product) => product.category === category
      )
    }

    // shipping
    if (shipping) {
      tempProducts = tempProducts.filter(product => product.shipping === true)
    }

    // price
    tempProducts = tempProducts.filter(product => product.price <= price)

    return { ...state, filtered_Products: tempProducts }
  }
  else if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      filters: {
        ...state.filters,
        text: '',
        company: 'all',
        category: 'all',
        color: 'all',
        price: state.filters.max_price,
        shipping: false
      }
    }
  }
  return state
  throw new Error(`No Matching "${action.type}" - action type`)


}
function getMAxPrice(products) {
  let tmp = 0;
  for (let index = 0; index < products.payload.length; index++) {
    if (products.payload[index].price > tmp) {
      tmp = products.payload[index].price;
    }
  }
  return tmp;
}
export default filter_reducer
