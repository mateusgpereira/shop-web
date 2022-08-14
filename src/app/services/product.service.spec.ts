import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { fakeAsync, flush, TestBed } from '@angular/core/testing'
import { getSampleProducts } from 'src/tests/data'
import { Product } from '../products/store/types'
import { ProductService } from './product.service'

describe('ProductService', () => {
  let service: ProductService
  let httpMock: HttpTestingController
  let productList: Product[]

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    })
    service = TestBed.inject(ProductService)
    httpMock = TestBed.inject(HttpTestingController)
    productList = getSampleProducts()
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('should dispatch request to fetch products', fakeAsync(() => {
    const products = productList.slice(0, 2)
    service.fetchProducts().subscribe((response) => {
      expect(response).not.toBeNull()
      expect(response).toHaveLength(2)
      expect(response).toEqual(products)
    })

    const mockRequest = httpMock.expectOne('/api/products')
    expect(mockRequest.request.method).toBe('GET')

    mockRequest.flush({
      content: products,
      totalPages: 1,
      totalElements: 2,
      numberOfElements: 2
    })
    flush()
  }))

  it('should dispatch request to search products', fakeAsync(() => {
    service.searchProducts('xiaomi').subscribe((response) => {
      expect(response).not.toBeNull()
      expect(response.content).toHaveLength(3)
      expect(response.content).toEqual(productList)
      expect(response.totalElements).toEqual(3)
      expect(response.totalPages).toEqual(1)
    })

    const mockRequest = httpMock.expectOne((req) => req.url === '/api/products')

    expect(mockRequest.request.method).toBe('GET')
    expect(mockRequest.request.params.get('name')).toBe('xiaomi')
    expect(mockRequest.request.params.get('page')).toBe('0')
    expect(mockRequest.request.params.get('limit')).toBe('25')

    mockRequest.flush({
      content: productList,
      totalPages: 1,
      totalElements: 3,
      numberOfElements: 3
    })
    flush()
  }))
})
