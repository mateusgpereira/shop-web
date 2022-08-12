export interface Product {
  id: number
  name: string
  price: number
  imageUrl: string
}

export interface ProductState {
  productList: Product[]
  lastError: any
}
