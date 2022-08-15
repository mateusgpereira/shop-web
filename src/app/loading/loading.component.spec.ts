import { ComponentFixture, TestBed } from '@angular/core/testing'
import { NgxLoadingModule } from 'ngx-loading'

import { LoadingComponent } from './loading.component'
import { LoadingService } from './loading.service'

describe('LoadingComponent', () => {
  let component: LoadingComponent
  let fixture: ComponentFixture<LoadingComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxLoadingModule],
      declarations: [LoadingComponent],
      providers: [LoadingService]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
