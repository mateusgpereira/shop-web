import { CartState } from '../cart/store/types'
import { ProductState } from '../products/store/types'

export interface AppState {
  product: ProductState
  cart: CartState
}
