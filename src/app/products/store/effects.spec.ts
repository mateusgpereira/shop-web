import { fakeAsync, flush, TestBed } from '@angular/core/testing'
import { of, ReplaySubject, throwError } from 'rxjs'
import { provideMockActions } from '@ngrx/effects/testing'
import { ProductService } from 'src/app/services/product.service'
import { ErrorHandlerService } from 'src/app/services/error-handler.service'
import { getSampleProducts } from 'src/tests/data'
import { ProductEffects } from './effects'
import { fetchProducts, handleProductStateError, searchProducts } from './actions'
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
        {
          provide: ProductService,
          useValue: { fetchProducts: jest.fn(), searchProducts: jest.fn() }
        },
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
    jest.spyOn(effects, 'handleReponseError').mockImplementation()

    effects.fetchProducts$.subscribe((result) => {
      expect(result).toEqual({ productList, type: '[PRODUCT] set products' })
    })

    actions.next(fetchProducts())
    flush()

    expect(productServiceMock.fetchProducts).toBeCalled()
    expect(effects.handleReponseError).not.toBeCalled()
  }))

  it('should return observable handleProductStateError when fetchProducts fail', fakeAsync(() => {
    jest
      .spyOn(productServiceMock, 'fetchProducts')
      .mockReturnValueOnce(throwError(() => new Error('Internal Error')))

    jest.spyOn(effects, 'handleReponseError')

    effects.fetchProducts$.subscribe((result: any) => {
      expect(result).toEqual({
        error: new Error('Internal Error'),
        type: '[PRODUCT] handle product error'
      })
    })

    actions.next(fetchProducts())
    flush()

    expect(productServiceMock.fetchProducts).toBeCalled()
    expect(effects.handleReponseError).toBeCalledTimes(1)
  }))

  it('should searchProducts and return setProducts action', fakeAsync(() => {
    jest.spyOn(productServiceMock, 'searchProducts').mockReturnValueOnce(
      of({
        content: productList,
        totalPages: 1,
        totalElements: 3,
        numberOfElements: 3
      } as any)
    )
    jest.spyOn(effects, 'handleReponseError').mockImplementation()

    effects.searchProducts$.subscribe((result) => {
      expect(result).toEqual({ productList, type: '[PRODUCT] set products' })
    })

    actions.next(searchProducts({ name: 'test', page: 1, limit: 5 }))
    flush()

    expect(productServiceMock.searchProducts).toBeCalledWith('test', 1, 5)
    expect(effects.handleReponseError).not.toBeCalled()
  }))

  it('should return observable handleProductStateError when searchProducts fail', fakeAsync(() => {
    jest
      .spyOn(productServiceMock, 'searchProducts')
      .mockReturnValueOnce(throwError(() => new Error('Internal Error')))

    jest.spyOn(effects, 'handleReponseError')

    effects.searchProducts$.subscribe((result: any) => {
      expect(result).toEqual({
        error: new Error('Internal Error'),
        type: '[PRODUCT] handle product error'
      })
    })

    actions.next(searchProducts({ name: 'test', page: 1, limit: 5 }))
    flush()

    expect(productServiceMock.searchProducts).toBeCalledWith('test', 1, 5)
    expect(effects.handleReponseError).toBeCalledTimes(1)
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
