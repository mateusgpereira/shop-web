import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { catchError, map, of, switchMap } from 'rxjs'
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

  constructor(private productService: ProductService, private actions$: Actions) {}
}
