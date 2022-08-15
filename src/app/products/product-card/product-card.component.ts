import { Component, Input } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar'
import { Store } from '@ngrx/store'
import { addToCart } from 'src/app/cart/store/actions'
import { AppState } from 'src/app/store/types'
import { Product } from '../store/types'

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
  @Input()
  product!: Product

  public readonly fallbackImage = 'assets/imgs/placeholder.png'

  constructor(private store: Store<AppState>, private snackBar: MatSnackBar) {}

  onAddToCart(product: Product): void {
    this.store.dispatch(addToCart({ product }))
    this.openSnackBar('Item added to cart!')
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, undefined, { duration: 3000, panelClass: 'snackbar-success' })
  }
}
