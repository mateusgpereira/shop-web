import { HttpRequest } from '@angular/common/http'
import { TestBed } from '@angular/core/testing'
import { Observable } from 'rxjs'
import { LoadingInterceptor } from './loading.interceptor'
import { LoadingService } from './loading.service'

describe('LoadingInterceptor', () => {
  let interceptor: LoadingInterceptor

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoadingInterceptor, LoadingService]
    })
    interceptor = TestBed.inject(LoadingInterceptor)
  })

  it('should be created', () => {
    expect(interceptor).toBeTruthy()
  })

  it('should correctly call show and hide of loadingService ', () => {
    const loadingService = TestBed.inject(LoadingService)
    jest.spyOn(loadingService, 'show')
    jest.spyOn(loadingService, 'hide')

    const next: any = {
      handle: () => {
        return new Observable((subscriber) => {
          subscriber.complete()
        })
      }
    }

    interceptor.intercept(new HttpRequest('GET', '/test'), next).subscribe()

    expect(loadingService.show).toBeCalled()
    expect(loadingService.hide).toBeCalled()
  })
})
