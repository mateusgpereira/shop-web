import { NO_ERRORS_SCHEMA } from '@angular/core'
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing'
import { MatSidenavModule } from '@angular/material/sidenav'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { SidenavService } from '../services/sidenav.service'

import { SidenavComponent } from './sidenav.component'

describe('SidenavComponent', () => {
  let component: SidenavComponent
  let fixture: ComponentFixture<SidenavComponent>
  let sideNavService: SidenavService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatSidenavModule, NoopAnimationsModule],
      declarations: [SidenavComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [SidenavService]
    }).compileComponents()

    fixture = TestBed.createComponent(SidenavComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
    sideNavService = TestBed.inject(SidenavService)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should call toggle on MatDrawer reference', fakeAsync(() => {
    jest.spyOn(component.sideNav, 'toggle').mockImplementation()

    sideNavService.toggle()
    fixture.detectChanges()

    expect(component.sideNav.toggle).toBeCalledTimes(1)
  }))
})
