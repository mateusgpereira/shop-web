import { Product } from 'src/app/products/store/types'

export interface CartItem {
  product: Product
  quantity: number
}

export interface Cart {
  items: CartItem[]
  total: number
}

export interface CartState {
  shopCart: Cart
}
