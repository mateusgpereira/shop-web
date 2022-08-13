import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class SidenavService {
  toggleListener: Subject<boolean>

  isOpen: boolean

  constructor() {
    this.toggleListener = new Subject()
    this.isOpen = false
  }

  public toggle(): void {
    this.toggleListener.next(!this.isOpen)
  }
}
