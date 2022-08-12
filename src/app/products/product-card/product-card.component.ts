import { Component, Input } from '@angular/core'
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
}
