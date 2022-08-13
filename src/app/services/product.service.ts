import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { Product } from '../products/store/types'

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private httpClient: HttpClient) {}

  public fetchProducts(): Observable<Product[]> {
    return this.httpClient.get<Product[]>('/api/products')
  }
}
