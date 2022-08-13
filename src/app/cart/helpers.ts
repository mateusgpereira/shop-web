import { CartItem } from './store/types'

export const sumPriceTotal = (items: CartItem[]): number => {
  return items.reduce((total, item) => {
    const itemSubtotal = item.product.price * item.quantity
    return total + itemSubtotal
  }, 0)
}
