import { createReducer, on } from '@ngrx/store'
import { setProducts } from './actions'
import { ProductState } from './types'

const initialState: ProductState = {
  productList: [],
  lastError: ''
}

export const productReducer = createReducer(
  initialState,
  on(setProducts, (state, payload): ProductState => {
    return {
      ...state,
      productList: payload.productList
    }
  })
)
