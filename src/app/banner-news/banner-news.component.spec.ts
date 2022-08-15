import { ComponentFixture, TestBed } from '@angular/core/testing'

import { BannerNewsComponent } from './banner-news.component'

describe('BannerNewsComponent', () => {
  let component: BannerNewsComponent
  let fixture: ComponentFixture<BannerNewsComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BannerNewsComponent]
    }).compileComponents()

    fixture = TestBed.createComponent(BannerNewsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
