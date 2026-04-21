import { expect, test } from 'vitest'
import { capitalizeFirstLetter } from './capitalizeFirstLetter'

test('capitalizes the first letter', () => {
  expect(capitalizeFirstLetter('testing')).toBe('Testing')
})