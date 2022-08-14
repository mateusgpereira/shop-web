import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, map, of, switchMap } from 'rxjs'
import { ErrorHandlerService } from 'src/app/services/error-handler.service'
import { ProductService } from 'src/app/services/product.service'
import { fetchProducts, handleProductStateError, setProducts } from './actions'

@Injectable()
export class ProductEffects {
  fetchProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(fetchProducts),
      switchMap(() => {
        return this.productService.fetchProducts().pipe(
          map((response) => setProducts({ productList: response })),
          catchError((error) => of(handleProductStateError({ error })))
        )
      })
    )
  })

  handleErrora$ = createEffect(
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
}
