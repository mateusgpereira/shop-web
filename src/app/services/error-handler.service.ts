import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  public handleError(error: any): void {
    // logic to handle errors should go here
    // eslint-disable-next-line no-console
    console.error(error)
  }
}
