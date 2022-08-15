import { CartItem } from './store/types'

export const sumPriceTotal = (items: CartItem[]): number => {
  return items.reduce((total, item) => {
    return total + item.product.price * item.quantity
  }, 0)
}

export const sumTotalItems = (items: CartItem[]): number => {
  return items.reduce((total, item) => total + item.quantity, 0)
}
