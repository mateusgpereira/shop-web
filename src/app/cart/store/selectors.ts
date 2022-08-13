import { createSelector } from '@ngrx/store'
import { AppState } from 'src/app/store/types'

export const selectCartState = (state: AppState) => state.cart

export const selectCart = createSelector(selectCartState, (state) => state.shopCart)
