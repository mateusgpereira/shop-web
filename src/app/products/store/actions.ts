import { createAction, props } from '@ngrx/store'
import { Product } from './types'

export const fetchProducts = createAction('[PRODUCT] fecth products')

export const setProducts = createAction(
  '[PRODUCT] set products',
  props<{ productList: Product[] }>()
)

export const searchProducts = createAction(
  '[PRODUCT] search products',
  props<{ name: string; page?: number; limit?: number }>()
)

export const handleProductStateError = createAction(
  '[PRODUCT] handle product error',
  props<{ error: any }>()
)
