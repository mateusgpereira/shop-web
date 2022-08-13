import { createAction, props } from '@ngrx/store'
import { CartItem } from './types'

export const addToCart = createAction('[CART] add product to cart', props<{ item: CartItem }>())
