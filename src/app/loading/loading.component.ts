import { Component } from '@angular/core'
import { Subject } from 'rxjs'
import { LoadingService } from './loading.service'

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent {
  public loading: Subject<boolean> = this.loadingService.isLoading

  constructor(private loadingService: LoadingService) {}
}
