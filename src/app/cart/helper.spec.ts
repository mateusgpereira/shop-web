import { getSampleProducts } from 'src/tests/data'
import { sumPriceTotal, sumTotalItems } from './helpers'

describe('CartHelpers', () => {
  const proucts = getSampleProducts()

  it('should sumTotalPrice and return the value 200', () => {
    const result = sumPriceTotal([
      { product: proucts[0], quantity: 1 },
      { product: proucts[1], quantity: 3 },
      { product: proucts[2], quantity: 1 }
    ])

    expect(result).toBe(200)
  })

  it('should return 0 when sumPriceTotal is called with empty array', () => {
    expect(sumPriceTotal([])).toBe(0)
  })

  it('should sumTotalItems and return the value 200', () => {
    const result = sumTotalItems([
      { product: proucts[0], quantity: 1 },
      { product: proucts[1], quantity: 3 },
      { product: proucts[2], quantity: 1 }
    ])

    expect(result).toBe(5)
  })

  it('should return 0 when sumTotalItems is called with empty array', () => {
    expect(sumTotalItems([])).toBe(0)
  })
})
