import { Component } from '@angular/core'
import { SidenavService } from '../sidenav/sidenav.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(private sidenavService: SidenavService) {}

  sideNavTooggle(): void {
    this.sidenavService.toggle()
  }
}
