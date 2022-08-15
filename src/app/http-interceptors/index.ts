import { HTTP_INTERCEPTORS } from '@angular/common/http'
import { Provider } from '@angular/core'

import { LoadingInterceptor } from '../loading/loading.interceptor'

export const httpInterceptorsProviders: Provider[] = [
  { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true }
]
