import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { MockStore, provideMockStore } from '@ngrx/store/testing'
import { Subscription } from 'rxjs'
import { getSampleProducts } from 'src/tests/data'
import { SidenavService } from '../services/sidenav.service'
import { AppState } from '../store/types'

import { HeaderComponent } from './header.component'

const initialState: AppState = {
  product: {
    productList: [],
    lastError: ''
  },
  cart: {
    shopCart: {
      items: [],
      total: 0
    }
  }
}

const cartState = {
  shopCart: {
    items: [{ product: getSampleProducts()[0], quantity: 2 }],
    total: 100
  }
}

describe('HeaderComponent', () => {
  let component: HeaderComponent
  let fixture: ComponentFixture<HeaderComponent>
  let el: DebugElement
  let sidenavServiceMock: SidenavService
  let store: MockStore

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      providers: [
        { provide: SidenavService, useValue: { toggle: jest.fn() } },
        provideMockStore({ initialState })
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents()

    fixture = TestBed.createComponent(HeaderComponent)
    component = fixture.componentInstance
    el = fixture.debugElement
    fixture.detectChanges()
  })

  beforeEach(() => {
    sidenavServiceMock = TestBed.inject(SidenavService)
    store = TestBed.inject(MockStore)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
    const headerTitleEl: HTMLHeadingElement = el.query(By.css('h1')).nativeElement
    expect(headerTitleEl.textContent).toBe('Smart Hardware Shop')
    expect(component.totalCartItems).toBe(0)
  })

  it('should dispatch method to toggle sidenav', () => {
    jest.spyOn(sidenavServiceMock, 'toggle').mockImplementation()

    const cartButtonEl: HTMLButtonElement = el.query(By.css('.btn-cart')).nativeElement
    cartButtonEl.click()

    expect(sidenavServiceMock.toggle).toBeCalledTimes(1)
  })

  it('should assert quantity badge is hidden when totalCartItems is 0', () => {
    const cartButton = el.query(By.css('.btn-cart'))

    expect(cartButton.properties['matBadgeHidden']).toBe('true')
    expect(cartButton.attributes['matBadgeColor']).toBe('accent')
    expect(cartButton.properties['matBadge']).toBe('0')
  })

  it('should show quantity badge when totalCartItems is greater than 0', () => {
    store.setState({ ...initialState, cart: { ...cartState } })
    store.refreshState()
    fixture.detectChanges()

    const cartButton = el.query(By.css('.btn-cart'))

    expect(cartButton.properties['matBadgeHidden']).toBe('false')
    expect(cartButton.attributes['matBadgeColor']).toBe('accent')
    expect(cartButton.properties['matBadge']).toBe('2')
  })

  it('should unsubscribe from cart$ on ngOnDestroy hook', () => {
    jest.spyOn(component.stateSubscription as Subscription, 'unsubscribe')

    component.ngOnDestroy()

    expect(component.stateSubscription?.unsubscribe).toBeCalledTimes(1)
  })
})
