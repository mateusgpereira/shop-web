import { createSelector } from '@ngrx/store'
import { AppState } from 'src/app/store/types'

const productStateSelector = (state: AppState) => state.product

export const selectProductsList = createSelector(productStateSelector, (state) => state.productList)
