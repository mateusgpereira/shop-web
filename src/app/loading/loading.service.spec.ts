import { TestBed } from '@angular/core/testing'

import { LoadingService } from './loading.service'

describe('LoadingService', () => {
  let service: LoadingService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(LoadingService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

  it('should emit new subject with true when show is called', () => {
    jest.spyOn(service.isLoading, 'next')

    service.show()

    expect(service.isLoading.next).toBeCalledTimes(1)
    expect(service.isLoading.next).toBeCalledWith(true)
  })

  it('should emit new subject with false when hide is called', () => {
    jest.spyOn(service.isLoading, 'next')

    service.hide()

    expect(service.isLoading.next).toBeCalledTimes(1)
    expect(service.isLoading.next).toBeCalledWith(false)
  })
})
