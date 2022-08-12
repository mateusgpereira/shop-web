import { ActionReducerMap } from '@ngrx/store'
import { cartReducer } from '../cart/reducers'
import { ProductEffects } from '../products/store/effects'
import { productReducer } from '../products/store/reducers'
import { AppState } from './types'

export const appReducer: ActionReducerMap<AppState> = {
  product: productReducer,
  cart: cartReducer
}

export const effects: any[] = [ProductEffects]
