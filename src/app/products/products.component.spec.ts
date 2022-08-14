import { NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, fakeAsync, flush, TestBed } from '@angular/core/testing'
import { FormsModule } from '@angular/forms'
import { By } from '@angular/platform-browser'
import { LetModule } from '@ngrx/component'
import { MockStore, provideMockStore } from '@ngrx/store/testing'
import { getSampleProducts } from 'src/tests/data'

import { ProductsComponent } from './products.component'
import { selectProductsList } from './store/selectors'
import { Product } from './store/types'

const initialState = {
  product: {
    productList: [],
    lastError: ''
  }
}

describe('ProductsComponent', () => {
  let component: ProductsComponent
  let fixture: ComponentFixture<ProductsComponent>
  let store: MockStore
  let productList: Product[]

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LetModule, FormsModule],
      declarations: [ProductsComponent],
      providers: [provideMockStore({ initialState })],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents()

    fixture = TestBed.createComponent(ProductsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  beforeEach(() => {
    store = TestBed.inject(MockStore)
    productList = getSampleProducts()
    store.overrideSelector(selectProductsList, productList)
    store.refreshState()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should not render product list component', fakeAsync(() => {
    jest.spyOn(store, 'dispatch').mockImplementation()
    fixture = TestBed.createComponent(ProductsComponent)
    component = fixture.componentInstance

    component.products$.subscribe((products) => {
      expect(products).toHaveLength(3)
    })

    fixture.detectChanges()
    flush()

    const productListEl = fixture.debugElement.query(By.css('app-product-list')).nativeElement

    expect(productListEl).toBeTruthy()
    expect(productListEl.products).toEqual(productList)
    expect(store.dispatch).toBeCalledTimes(1)
    expect(store.dispatch).toBeCalledWith({ type: '[PRODUCT] fecth products' })
  }))

  it('should not dispatch action on call to onSearchSubmit with empty searchText', () => {
    jest.spyOn(store, 'dispatch').mockImplementation()
    component.onSearchSubmit()

    expect(store.dispatch).not.toBeCalled()
  })

  it('should dispatch searchProducts action onSearchSubmit', () => {
    jest.spyOn(store, 'dispatch').mockImplementation()

    const searchInputEl: HTMLInputElement = fixture.debugElement.query(
      By.css('form .search-box input[name="searchText"]')
    ).nativeElement

    searchInputEl.value = 'smartwatch'
    searchInputEl.dispatchEvent(new Event('input'))
    fixture.detectChanges()

    const submitButtonEl: HTMLButtonElement = fixture.debugElement.query(
      By.css('form .search-box button')
    ).nativeElement
    submitButtonEl.click()
    fixture.detectChanges()

    expect(component.searchText).toBe('smartwatch')
    expect(store.dispatch).toBeCalledTimes(1)
    expect(store.dispatch).toBeCalledWith({
      name: 'smartwatch',
      type: '[PRODUCT] search products'
    })
  })
})
