import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { SidenavService } from '../services/sidenav.service'

import { HeaderComponent } from './header.component'

describe('HeaderComponent', () => {
  let component: HeaderComponent
  let fixture: ComponentFixture<HeaderComponent>
  let el: DebugElement
  let sidenavServiceMock: SidenavService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      providers: [{ provide: SidenavService, useValue: { toggle: jest.fn() } }],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents()

    fixture = TestBed.createComponent(HeaderComponent)
    component = fixture.componentInstance
    el = fixture.debugElement
    fixture.detectChanges()
  })

  beforeEach(() => {
    sidenavServiceMock = TestBed.inject(SidenavService)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
    const headerTitleEl: HTMLHeadingElement = el.query(By.css('h1')).nativeElement
    expect(headerTitleEl.textContent).toBe('Smart Hardware Shop')
  })

  it('should dispath method to toggle sidenav', () => {
    jest.spyOn(sidenavServiceMock, 'toggle').mockImplementation()

    const cartButtonEl: HTMLButtonElement = el.query(By.css('.btn-cart')).nativeElement
    cartButtonEl.click()

    expect(sidenavServiceMock.toggle).toBeCalledTimes(1)
  })
})
