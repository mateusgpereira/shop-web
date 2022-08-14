import { HttpClient, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { map, Observable } from 'rxjs'
import { Product } from '../products/store/types'
import { Page } from './types'

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private httpClient: HttpClient) {}

  public fetchProducts(): Observable<Product[]> {
    return this.httpClient.get<Page<Product>>('/api/products').pipe(map((result) => result.content))
  }

  public searchProducts(
    name: string,
    page: number = 0,
    limit: number = 25
  ): Observable<Page<Product>> {
    return this.httpClient.get<Page<Product>>('/api/products', {
      params: new HttpParams().set('name', name).set('page', page).set('limit', limit)
    })
  }
}
