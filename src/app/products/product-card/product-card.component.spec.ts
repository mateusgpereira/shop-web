import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { MatSnackBar } from '@angular/material/snack-bar'
import { MatTooltipModule } from '@angular/material/tooltip'
import { By } from '@angular/platform-browser'
import { MockStore, provideMockStore } from '@ngrx/store/testing'
import { getSampleProducts } from 'src/tests/data'
import { Product } from '../store/types'
import { ProductCardComponent } from './product-card.component'

describe('ProductCardComponent', () => {
  let component: ProductCardComponent
  let fixture: ComponentFixture<ProductCardComponent>
  let el: DebugElement
  let productList: Product[]

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatTooltipModule],
      declarations: [ProductCardComponent],
      providers: [provideMockStore(), { provide: MatSnackBar, useValue: { open: jest.fn() } }],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents()

    fixture = TestBed.createComponent(ProductCardComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
    el = fixture.debugElement
    productList = getSampleProducts()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
    expect(component.fallbackImage).toBe('assets/imgs/placeholder.png')
    expect(el.query(By.css('mat-card.product-card'))).toBeFalsy()
  })

  it('should render card when product input is provided', () => {
    const [product] = productList
    component.product = product
    fixture.detectChanges()

    const card = el.query(By.css('mat-card.product-card'))
    const productNameEl: HTMLParagraphElement = card.query(
      By.css('mat-card-header p.product-title')
    ).nativeElement
    const productImgEl: HTMLImageElement = card.query(By.css('img')).nativeElement

    expect(productNameEl.textContent).toBe(product.name)
    expect(productImgEl.src).toBe(product.imageUrl)
    expect(productImgEl.hasAttribute('mat-card-image')).toBe(true)
  })

  it('should render card with fallbacak image when product does not have one', () => {
    const [product] = productList
    component.product = { ...product, imageUrl: '' }

    fixture.detectChanges()

    const card = el.query(By.css('mat-card.product-card'))
    const productNameEl: HTMLParagraphElement = card.query(
      By.css('mat-card-header p.product-title')
    ).nativeElement
    const productImgEl: HTMLImageElement = card.query(By.css('img')).nativeElement

    expect(productNameEl.textContent).toBe(product.name)
    expect(productImgEl.src).toBe('http://localhost/assets/imgs/placeholder.png')
    expect(productImgEl.hasAttribute('mat-card-image')).toBe(true)
  })

  it('should correctly render card action buttons', () => {
    const [product] = productList
    component.product = product

    fixture.detectChanges()

    const actionButtons = el.queryAll(
      By.css('mat-card.product-card mat-card-actions .btn-group button')
    )

    expect(actionButtons).toBeTruthy()
    expect(actionButtons[0].nativeElement.textContent).toContain('Details')
    expect(actionButtons[0].nativeElement.hasAttribute('mat-stroked-button')).toBe(true)
    expect(actionButtons[0].nativeElement.getAttribute('color')).toBe('primary')
    expect(actionButtons[1].nativeElement.textContent).toBe('Add to Cart')
    expect(actionButtons[1].nativeElement.hasAttribute('mat-flat-button')).toBe(true)
    expect(actionButtons[1].nativeElement.getAttribute('color')).toBe('primary')
  })

  it('should dispatch action addToCart on button click', () => {
    const store = TestBed.inject(MockStore)
    jest.spyOn(store, 'dispatch').mockImplementation()

    const snackBarMock = TestBed.inject(MatSnackBar)
    jest.spyOn(snackBarMock, 'open').mockImplementation()

    const [product] = productList
    component.product = product

    fixture.detectChanges()

    const addToCartBtnEl: HTMLButtonElement = el.query(
      By.css('mat-card.product-card mat-card-actions .btn-group button:last-child')
    ).nativeElement

    addToCartBtnEl.click()

    fixture.detectChanges()

    expect(store.dispatch).toBeCalledTimes(1)
    expect(store.dispatch).toBeCalledWith({
      product: {
        id: 1,
        imageUrl: 'http://awesomeimg.com/one.png',
        name: 'product one',
        price: 50
      },
      type: '[CART] add product to cart'
    })

    expect(snackBarMock.open).toBeCalledTimes(1)
    expect(snackBarMock.open).toBeCalledWith('Item added to cart!', undefined, {
      duration: 3000,
      panelClass: 'snackbar-success'
    })
  })
})
