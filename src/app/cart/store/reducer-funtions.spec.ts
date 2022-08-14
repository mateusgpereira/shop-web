import { getSampleProducts } from 'src/tests/data'
import { addToCartReducer, removeFromCartReducer } from './reducer-functions'
import { CartState } from './types'

describe('CartReducers', () => {
  let state: CartState
  const products = getSampleProducts()

  beforeEach(() => {
    const [productOne, , productThree] = products
    state = {
      shopCart: {
        items: [
          { product: productOne, quantity: 1 },
          { product: productThree, quantity: 1 }
        ],
        total: productOne.price + productThree.price
      }
    }
  })

  it('should add a new product to the cart state', () => {
    const result = addToCartReducer(state, { product: products[1] })

    expect(result.shopCart).not.toBeNull()
    expect(result.shopCart.items).toHaveLength(3)
    expect(result.shopCart.total).toBe(120)
    expect(result.shopCart.items.every((item) => products.includes(item.product))).toBe(true)
    expect(result.shopCart.items.every((item) => item.quantity === 1)).toBe(true)
  })

  it('should add productOne again to cart', () => {
    const result = addToCartReducer(state, { product: products[0] })

    expect(result.shopCart).not.toBeNull()
    expect(result.shopCart.items).toHaveLength(2)
    expect(result.shopCart.total).toBe(130)
    expect(result.shopCart.items.every((item) => products.includes(item.product))).toBe(true)
    expect(result.shopCart.items).toContainEqual({ product: products[0], quantity: 2 })
  })

  it('should remove productOne from the cart', () => {
    const result = removeFromCartReducer(state, { productId: 1 })

    expect(result.shopCart).not.toBeNull()
    expect(result.shopCart.items).toHaveLength(1)
    expect(result.shopCart.total).toBe(30)
    expect(result.shopCart.items[0]).toEqual({ product: products[2], quantity: 1 })
  })

  it('should remove productThree once from the cart having 3 of them in the state', () => {
    let tmpState = addToCartReducer(state, { product: products[2] })
    expect(tmpState.shopCart.total).toBe(110)

    tmpState = addToCartReducer(tmpState, { product: products[2] })
    expect(tmpState.shopCart.total).toBe(140)

    const result = removeFromCartReducer(tmpState, { productId: 3 })

    expect(result.shopCart).not.toBeNull()
    expect(result.shopCart.items).toHaveLength(2)
    expect(result.shopCart.total).toBe(110)
    expect(result.shopCart.items).toContainEqual({ product: products[2], quantity: 2 })
  })
})
