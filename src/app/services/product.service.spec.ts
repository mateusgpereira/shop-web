import { TestBed } from '@angular/core/testing'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { SAMPLE_PRODUCTS } from 'src/tests/data'
import { ProductService } from './product.service'
import { Product } from '../products/store/types'

describe('ProductService', () => {
  let service: ProductService
  let httpMock: HttpTestingController
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    })
    service = TestBed.inject(ProductService)
    httpMock = TestBed.inject(HttpTestingController)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('should dispatch request to fetch products', () => {
    const products: Product[] = SAMPLE_PRODUCTS.slice(0, 2)

    service.fetchProducts().subscribe((response) => {
      expect(response).not.toBeNull()
      expect(response).toHaveLength(2)
      expect(response).toEqual(products)
    })

    const mockRequest = httpMock.expectOne('/api/products')
    expect(mockRequest.request.method).toBe('GET')

    mockRequest.flush(products)
  })
})
