import { Component, OnInit, ViewChild } from '@angular/core'
import { MatDrawer } from '@angular/material/sidenav'
import { SidenavService } from './sidenav.service'

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  @ViewChild('drawer')
  sideNav!: MatDrawer

  constructor(private sidenavService: SidenavService) {}

  ngOnInit(): void {
    this.sidenavService.toggleListener.subscribe(() => {
      this.sideNavTooggle()
    })
  }

  sideNavTooggle(): void {
    this.sideNav.toggle()
  }
}
