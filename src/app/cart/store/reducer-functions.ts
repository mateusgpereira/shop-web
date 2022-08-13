import { Product } from 'src/app/products/store/types'
import { sumPriceTotal } from '../helpers'
import { CartState, CartItem } from './types'

interface AddToCartPayload {
  product: Product
}

export const addToCartReducer = (state: CartState, { product }: AddToCartPayload): CartState => {
  const items: CartItem[] = [...state.shopCart.items]
  const itemIndex = items.findIndex((item) => item.product === product)

  if (itemIndex >= 0) {
    items[itemIndex] = { product, quantity: items[itemIndex].quantity + 1 }
  } else {
    items.push({ product, quantity: 1 })
  }

  return {
    ...state,
    shopCart: {
      items,
      total: sumPriceTotal(items)
    }
  }
}

interface RemoveFromCartPayload {
  productId: number
}

export const removeFromCartReducer = (
  state: CartState,
  { productId }: RemoveFromCartPayload
): CartState => {
  const items = [...state.shopCart.items]
  const foundIndex = items.findIndex((item) => item.product.id === productId)
  const foundItem = items[foundIndex]

  if (!foundItem) {
    return state
  }

  if (foundItem.quantity === 1) {
    items.splice(foundIndex, 1)
  } else {
    items[foundIndex] = { product: foundItem.product, quantity: foundItem.quantity - 1 }
  }

  return {
    ...state,
    shopCart: {
      ...state.shopCart,
      items,
      total: sumPriceTotal(items)
    }
  }
}
