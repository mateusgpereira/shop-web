import { fakeAsync, flush, TestBed } from '@angular/core/testing'
import { of, ReplaySubject, throwError } from 'rxjs'
import { provideMockActions } from '@ngrx/effects/testing'
import { ProductService } from 'src/app/services/product.service'
import { ErrorHandlerService } from 'src/app/services/error-handler.service'
import { getSampleProducts } from 'src/tests/data'
import { ProductEffects } from './effects'
import { fetchProducts, handleProductStateError } from './actions'
import { Product } from './types'

describe('ProductEffects', () => {
  let effects: ProductEffects
  let actions: ReplaySubject<any>
  let productServiceMock: ProductService
  let errorHandlerServiceMock: ErrorHandlerService
  let productList: Product[]

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProductEffects,
        provideMockActions(() => actions),
        { provide: ProductService, useValue: { fetchProducts: jest.fn() } },
        { provide: ErrorHandlerService, useValue: { handleError: jest.fn() } }
      ]
    })

    effects = TestBed.inject(ProductEffects)
    actions = new ReplaySubject(1)
    productServiceMock = TestBed.inject(ProductService)
    errorHandlerServiceMock = TestBed.inject(ErrorHandlerService)
    productList = getSampleProducts()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should fetchProducts and return setProducts action', fakeAsync(() => {
    jest.spyOn(productServiceMock, 'fetchProducts').mockReturnValueOnce(of(productList))
    jest.spyOn(errorHandlerServiceMock, 'handleError').mockImplementation()

    effects.fetchProducts$.subscribe((result) => {
      expect(result).toEqual({ productList, type: '[PRODUCT] set products' })
    })

    actions.next(fetchProducts())
    flush()

    expect(productServiceMock.fetchProducts).toBeCalled()
    expect(errorHandlerServiceMock.handleError).not.toBeCalled()
  }))

  it('should return observable handleProductStateError when fetchProducts fail', fakeAsync(() => {
    jest
      .spyOn(productServiceMock, 'fetchProducts')
      .mockReturnValueOnce(throwError(() => new Error('Internal Error')))

    jest.spyOn(errorHandlerServiceMock, 'handleError').mockImplementation()

    effects.fetchProducts$.subscribe((result: any) => {
      expect(result).toEqual({
        error: new Error('Internal Error'),
        type: '[PRODUCT] handle product error'
      })
    })

    actions.next(fetchProducts())
    flush()

    expect(productServiceMock.fetchProducts).toBeCalled()
    expect(errorHandlerServiceMock.handleError).not.toBeCalled()
  }))

  it('should call handleError of errorHandlerService', fakeAsync(() => {
    jest.spyOn(errorHandlerServiceMock, 'handleError').mockImplementation()

    effects.handleError$.subscribe((result) => {
      expect(result).toBeFalsy()
    })

    actions.next(handleProductStateError({ error: 'message' }))
    flush()

    expect(errorHandlerServiceMock.handleError).toBeCalledTimes(1)
    expect(errorHandlerServiceMock.handleError).toBeCalledWith('message')
  }))
})
