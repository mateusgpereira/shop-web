import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, fakeAsync, flush, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { LetModule } from '@ngrx/component'
import { MockStore, provideMockStore } from '@ngrx/store/testing'
import { getSampleProducts } from 'src/tests/data'
import { Product } from '../products/store/types'
import { AppState } from '../store/types'

import { CartComponent } from './cart.component'
import { CartState } from './store/types'

const initialState: AppState = {
  product: {
    productList: [],
    lastError: ''
  },
  cart: {
    shopCart: {
      items: [],
      total: 0
    }
  }
}

describe('CartComponent', () => {
  let component: CartComponent
  let fixture: ComponentFixture<CartComponent>
  let store: MockStore
  let el: DebugElement
  let productList: Product[]
  let cart: CartState

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LetModule],
      declarations: [CartComponent],
      providers: [provideMockStore({ initialState })],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents()

    fixture = TestBed.createComponent(CartComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
    el = fixture.debugElement
  })

  beforeEach(() => {
    store = TestBed.inject(MockStore)
    store.refreshState()
    productList = getSampleProducts()
    cart = {
      shopCart: {
        items: [{ product: productList[0], quantity: 2 }],
        total: 100
      }
    }
  })

  it('should create', () => {
    expect(component).toBeTruthy()
    expect(el.query(By.css('.cart .cart-list'))).toBeFalsy()
  })

  it('should render cart list when cart observables emits items', fakeAsync(() => {
    store.setState({ ...initialState, cart })
    store.refreshState()

    fixture.detectChanges()
    flush()

    expect(el.query(By.css('.cart .cart-list'))).toBeTruthy()
  }))

  it('should assert that cart-list has one item', fakeAsync(() => {
    store.setState({ ...initialState, cart })
    store.refreshState()

    fixture.detectChanges()
    flush()
    expect(el.queryAll(By.css('.cart .cart-list .cart-line'))).toHaveLength(1)
  }))

  it('should assert that cart-list has three items', fakeAsync(() => {
    cart = {
      shopCart: {
        items: [
          { product: productList[0], quantity: 1 },
          { product: productList[1], quantity: 1 },
          { product: productList[2], quantity: 1 }
        ],
        total: 120
      }
    }

    store.setState({ ...initialState, cart })
    store.refreshState()

    fixture.detectChanges()
    flush()
    expect(el.queryAll(By.css('.cart .cart-list .cart-line'))).toHaveLength(3)
  }))

  it('should assert that cart item is correctly rendered', fakeAsync(() => {
    store.setState({ ...initialState, cart })
    store.refreshState()

    fixture.detectChanges()
    flush()

    const cartItem = el.query(By.css('.cart .cart-list .cart-item'))
    const productImgEl: HTMLImageElement = cartItem.query(By.css('img')).nativeElement
    const productPriceEl: HTMLSpanElement = cartItem.query(By.css('span.price')).nativeElement

    const removeBtnEl: HTMLButtonElement = cartItem.query(
      By.css('button:first-of-type')
    ).nativeElement
    const productNameEl: HTMLParagraphElement = cartItem.query(
      By.css('p.cart-item-name')
    ).nativeElement

    const quantityBadge = cartItem.query(By.css('span:first-of-type'))

    expect(removeBtnEl.hasAttribute('mat-icon-button')).toBe(true)
    expect(productImgEl.src).toBe('http://awesomeimg.com/one.png')
    expect(productNameEl.textContent).toContain('product one')
    expect(quantityBadge.properties['matBadge']).toBe('2')
    expect(quantityBadge.properties['matBadgeHidden']).toBe('false')
    expect(quantityBadge.attributes['matBadgeColor']).toBe('primary')
    expect(productPriceEl.textContent).toBe('100.00 €')
  }))

  it('should assert that cart item with quantity 1 does not display the quantity badge', fakeAsync(() => {
    cart = {
      shopCart: {
        items: [{ product: productList[0], quantity: 1 }],
        total: 50
      }
    }
    store.setState({ ...initialState, cart })
    store.refreshState()

    fixture.detectChanges()
    flush()

    const quantityBadge = el.query(By.css('.cart .cart-list .cart-item span:first-of-type'))

    expect(quantityBadge.properties['matBadge']).toBe('1')
    expect(quantityBadge.properties['matBadgeHidden']).toBe('true')
    expect(quantityBadge.attributes['matBadgeColor']).toBe('primary')
  }))

  it('should call removeFromCart when button click', fakeAsync(() => {
    jest.spyOn(store, 'dispatch').mockImplementation()

    store.setState({ ...initialState, cart })
    store.refreshState()

    fixture.detectChanges()
    flush()

    const removeBtnEl: HTMLButtonElement = el.query(
      By.css('.cart .cart-list .cart-item button:first-of-type')
    ).nativeElement

    removeBtnEl.click()
    fixture.detectChanges()
    flush()

    expect(store.dispatch).toBeCalledTimes(1)
    expect(store.dispatch).toBeCalledWith({ productId: 1, type: '[CART] remove item from cart' })
  }))

  it('should display empty message when there are no items in the cart', fakeAsync(() => {
    cart = {
      shopCart: {
        items: [],
        total: 0
      }
    }
    store.setState({ ...initialState, cart })
    store.refreshState()

    fixture.detectChanges()
    flush()

    const cartEmpty = el.query(By.css('.cart .cart-empty'))

    expect(cartEmpty).toBeTruthy()
    expect(cartEmpty.query(By.css('p')).nativeElement.textContent).toBe(
      'Your shopping cart is empty. Add a few products and come back here :)'
    )
    expect(cartEmpty.query(By.css('i.fa-solid.fa-cart-arrow-down'))).toBeTruthy()
  }))
})
