import { describe, expect, test } from '@jest/globals'
import { calibrationValue, fromDigits, parseDigitAt, parseDigits, parseNumberAt } from '.'

const INPUT_ONE = `two74119onebtqgnine`
const INPUT_TWO = `fivethreeonezblqnsfk1`

test('fromDigits([number, number]) - returns number from concat\'d digits', () => {
  expect(fromDigits([1, 2])).toEqual(12)
})

describe('Part 1', () => {
  test('parseDigits() - returns first and last number from input', () => {
    const outputOne = parseDigits(INPUT_ONE, parseDigitAt)
    const outputTwo = parseDigits(INPUT_TWO, parseDigitAt)

    expect(outputOne).toEqual([7, 9])
    expect(outputTwo).toEqual([1, 1])
  })

  test('partOne() - returns sum', () => {
    const result = calibrationValue([INPUT_ONE, INPUT_TWO], parseDigitAt)

    expect(result).toEqual(90)
  })
})

describe('Part 2', () => {
  test('parseNumberAt() - returns first and last number (digit or text) from input', () => {
    expect(parseNumberAt(INPUT_ONE, 0)).toEqual(2)
    expect(parseNumberAt(INPUT_ONE, 1)).toEqual(null)
    expect(parseNumberAt(INPUT_ONE, 3)).toEqual(7)
    expect(parseNumberAt(INPUT_TWO, 4)).toEqual(3)
  })

  // test('partTwo() - returns sum', () => {
  //   const result = partOne([INPUT_ONE, INPUT_TWO].join('\n'))

  //   expect(result).toEqual(90)
  // })
})