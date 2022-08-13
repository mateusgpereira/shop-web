import { createAction, props } from '@ngrx/store'
import { Product } from 'src/app/products/store/types'

export const addToCart = createAction('[CART] add product to cart', props<{ product: Product }>())

export const removeFromCart = createAction(
  '[CART] remove item from cart',
  props<{ productId: number }>()
)
