import { TestBed } from '@angular/core/testing'
import { filter } from 'rxjs'

import { SidenavService } from './sidenav.service'

describe('SidenavService', () => {
  let service: SidenavService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(SidenavService)
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
    expect(service.isOpen).toBeFalsy()
  })

  it('should toggle isOpen property to true', () => {
    service.toggleListener.subscribe((result) => {
      expect(result).toBeTruthy()
    })

    service.toggle()

    expect(service.isOpen).toBeTruthy()
  })

  it('should toggle twice and make isOpen property false', () => {
    service.toggleListener.pipe(filter((_, index) => index === 1)).subscribe((result) => {
      expect(result).toBeFalsy()
    })

    service.toggle()
    expect(service.isOpen).toBeTruthy()

    service.toggle()
    expect(service.isOpen).toBeFalsy()
  })
})
