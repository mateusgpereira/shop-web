import { SAMPLE_PRODUCTS } from 'src/tests/data'
import { sumPriceTotal } from './helpers'

describe('CartHelpers', () => {
  const proucts = [...SAMPLE_PRODUCTS]

  it('should sumTotalPrice and return the value 200', () => {
    const result = sumPriceTotal([
      { product: proucts[0], quantity: 1 },
      { product: proucts[1], quantity: 3 },
      { product: proucts[2], quantity: 1 }
    ])

    expect(result).toBe(200)
  })

  it('should return 0 for an empty array of items', () => {
    expect(sumPriceTotal([])).toBe(0)
  })
})
