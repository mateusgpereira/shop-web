import { Component } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { AppState } from '../store/types'
import { removeFromCart } from './store/actions'
import { selectCart } from './store/selectors'
import { Cart } from './store/types'

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  cart$: Observable<Cart>

  constructor(private store: Store<AppState>) {
    this.cart$ = this.store.select(selectCart)
  }

  onRemoveItem(productId: number): void {
    this.store.dispatch(removeFromCart({ productId }))
  }
}
