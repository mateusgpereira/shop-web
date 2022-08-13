import { createReducer, on } from '@ngrx/store'
import { addToCart, removeFromCart } from './actions'
import { CartState } from './types'
import { addToCartReducer, removeFromCartReducer } from './reducer-functions'

const initialState: CartState = {
  shopCart: {
    items: [],
    total: 0
  }
}

export const cartReducer = createReducer(
  initialState,
  on(addToCart, addToCartReducer),
  on(removeFromCart, removeFromCartReducer)
)
