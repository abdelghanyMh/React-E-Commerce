import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from '../actions'

const cart_reducer = (state, action) => {
  if (action.type === ADD_TO_CART) {
    const { id, color, amount, product } = action.payload
    const tenpItem = state.cart.find(i => i.id === id + color)
    if (tenpItem) {

      // add the same item but update the amount value
      const tempCart = state.cart.map(cartItem => {

        if (cartItem.id === id + color) {

          let newAmount = cartItem.amount + amount

          // handel newAmount >>> item in stock 
          newAmount = newAmount > cartItem.max ? cartItem.max : newAmount

          return {
            ...cartItem,
            amount: newAmount
          }
        }
        else {
          return cartItem
        }
      })

      return { ...state, cart: tempCart }

    } else {
      const newITem = {
        id: id + color,
        name: product.name,
        color,
        amount,
        image: product.images[0].url,
        price: product.price,
        max: product.stock
      }
      return {
        ...state,
        cart: [...state.cart, newITem]
      }
    }
    state.cart.push({ ...action.payload })
    state.total_items += action.payload.amount * action.payload.product.price
    state.total_amount += action.payload.amount
    return { ...state }
  }
  else if (action.type === REMOVE_CART_ITEM) {
    const tempCart = state.cart.filter(item => item.id !== action.payload)
    console.log(action.payload);
    return { ...state, cart: tempCart }
  }
  else if (action.type === CLEAR_CART) {
    return { ...state, cart: [] }
  }
  else if (action.type === TOGGLE_CART_ITEM_AMOUNT) {
    const { id, value } = action.payload

    const tempCart = state.cart.map(item => {
      if (item.id == id) {

        value === 'inc' ? ++item.amount : --item.amount

        item.amount < 1 ? item.amount = 1 : item.amount = item.amount

        item.amount > item.max ? item.amount = item.max : item.amount = item.amount

      }
      return item
    })

    return { ...state, tempCart }

  }
  return state
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default cart_reducer
