import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { getSampleProducts } from 'src/tests/data'
import { Product } from '../store/types'

import { ProductListComponent } from './product-list.component'

describe('ProductListComponent', () => {
  let component: ProductListComponent
  let fixture: ComponentFixture<ProductListComponent>
  let el: DebugElement
  let productList: Product[]

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductListComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents()

    fixture = TestBed.createComponent(ProductListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
    el = fixture.debugElement
    productList = getSampleProducts()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
    expect(el.query(By.css('app-product-card'))).toBeFalsy()
  })

  it('should render app product card when a list of products is provided', () => {
    component.products = productList
    fixture.detectChanges()

    const cardList = el.queryAll(By.css('app-product-card'))
    const cardEl = cardList[0]

    expect(cardList).toHaveLength(3)
    expect(cardEl.properties['product']).toEqual(productList[0])
  })
})
