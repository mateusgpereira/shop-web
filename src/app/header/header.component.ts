import { Component, OnDestroy, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable, Subscription } from 'rxjs'
import { sumTotalItems } from '../cart/helpers'
import { selectCart } from '../cart/store/selectors'
import { Cart } from '../cart/store/types'
import { SidenavService } from '../services/sidenav.service'
import { AppState } from '../store/types'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  totalCartItems: number

  cart$: Observable<Cart>

  stateSubscription: Subscription | undefined

  constructor(private sidenavService: SidenavService, private store: Store<AppState>) {
    this.cart$ = this.store.select(selectCart)
    this.totalCartItems = 0
  }

  ngOnInit(): void {
    this.stateSubscription = this.cart$.subscribe((cart) => {
      this.totalCartItems = sumTotalItems(cart.items)
    })
  }

  ngOnDestroy(): void {
    if (this.stateSubscription) {
      this.stateSubscription.unsubscribe()
    }
  }

  sideNavTooggle(): void {
    this.sidenavService.toggle()
  }
}
