import { Component, OnInit } from '@angular/core'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { AppState } from '../store/types'
import { fetchProducts } from './store/actions'
import { selectProductsList } from './store/selectors'
import { Product } from './store/types'

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products$: Observable<Product[]>

  constructor(private store: Store<AppState>) {
    this.products$ = this.store.select(selectProductsList)
  }

  ngOnInit(): void {
    this.store.dispatch(fetchProducts())
  }
}
