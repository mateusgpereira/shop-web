import { createReducer, on } from '@ngrx/store'
import { addToCart } from './actions'
import { CartItem, CartState } from './types'

const initialState: CartState = {
  cart: {
    items: [],
    total: 0
  }
}

export const cartReducer = createReducer(
  initialState,
  on(addToCart, (state, payload) => {
    const items: CartItem[] = [...state.cart.items]
    items.push(payload.item)

    return {
      ...state,
      cart: {
        items,
        total: items.length
      }
    }
  })
)
