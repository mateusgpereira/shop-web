import { NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'

import { HomeComponent } from './home.component'

describe('HomeComponent', () => {
  let component: HomeComponent
  let fixture: ComponentFixture<HomeComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents()

    fixture = TestBed.createComponent(HomeComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()

    const el = fixture.debugElement
    const productsEl = el.query(By.css('.products .container-xl app-products'))
    const cartEl: HTMLElement = el.query(By.css('app-sidenav > app-cart')).nativeElement

    expect(productsEl).toBeTruthy()
    expect(cartEl).toBeTruthy()
    expect(cartEl.hasAttribute('app-sidenav-content')).toBe(true)
  })
})
