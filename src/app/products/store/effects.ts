import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { Action } from '@ngrx/store'
import { catchError, map, Observable, of, switchMap } from 'rxjs'
import { ErrorHandlerService } from 'src/app/services/error-handler.service'
import { ProductService } from 'src/app/services/product.service'
import { fetchProducts, handleProductStateError, searchProducts, setProducts } from './actions'

@Injectable()
export class ProductEffects {
  fetchProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fetchProducts),
      switchMap(() => {
        return this.productService.fetchProducts().pipe(
          map((response) => setProducts({ productList: response })),
          catchError(this.handleReponseError)
        )
      })
    )
  })

  searchProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(searchProducts),
      switchMap((action) => {
        return this.productService.searchProducts(action.name, action.page, action.limit).pipe(
          map((response) => {
            return setProducts({ productList: response.content })
          }),
          catchError(this.handleReponseError)
        )
      })
    )
  })

  handleError$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(handleProductStateError),
        switchMap((action) => {
          return of(this.errorHandlerService.handleError(action.error))
        })
      )
    },
    { dispatch: false }
  )

  constructor(
    private productService: ProductService,
    private actions$: Actions,
    private errorHandlerService: ErrorHandlerService
  ) {}

  public handleReponseError(error: any): Observable<Action> {
    return of(handleProductStateError({ error }))
  }
}
