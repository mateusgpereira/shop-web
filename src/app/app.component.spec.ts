import { NO_ERRORS_SCHEMA } from '@angular/core'
import { TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { RouterTestingModule } from '@angular/router/testing'
import { AppComponent } from './app.component'

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents()
  })

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent)
    const app = fixture.componentInstance
    expect(app).toBeTruthy()
  })

  it('should render header, home and footer components', () => {
    const fixture = TestBed.createComponent(AppComponent)
    fixture.detectChanges()
    const el = fixture.debugElement

    expect(el.query(By.css('app-header'))).toBeTruthy()
    expect(el.query(By.css('app-home'))).toBeTruthy()
    expect(el.query(By.css('app-footer'))).toBeTruthy()
  })
})
