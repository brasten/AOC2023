import { expect, test } from '@jest/globals'
import day03, { CharType, clearNumber, extract, findNumberLocation, getAdjacentCoords, getType, partOne, partTwo } from '.'
import * as box from './box'
import * as coords from './coords'

const INPUT = [
  `467..114..`,
  `...*......`,
  `..35..633.`,
  `......#...`,
  `617*......`,
  `.....+.58.`,
  `..592.....`,
  `......755.`,
  `...$.*....`,
  `.664.598..`,
].map(_ => _.split(''))

const inputCopy = () => INPUT.map(line => line.map(_ => _))

// 2:16

// for x, y in INPUT:
// - look for symbol
// - if symbol, then check for number in adjecent cells
// - if number -> scan left/right for additional digits
// - remove number from matrix and return for processing

test('findNumberLocation(matrix, coords) - returns idx/length of digits to replace', () => {
  expect(findNumberLocation(INPUT, coords.make(0, 0))).toEqual(box.make(0, 0, 3))
  expect(findNumberLocation(INPUT, coords.make(6, 0))).toEqual(box.make(5, 0, 3))
  expect(findNumberLocation(INPUT, coords.make(4, 0))).toEqual(null)
})

test('extract(line, position) - returns number as position', () => {
  expect(extract(INPUT, box.make(0, 0, 3))).toEqual(467)
  expect(extract(INPUT, box.make(5, 0, 3))).toEqual(114)
})

test('boxOverlapsWith(a, b) - returns true if boxes occupy same space', () => {
  const overlapResult = box.overlapsWith(
    box.make(1, 1, 5),
    box.make(3, 1, 4),
  )

  expect(overlapResult).toBeTruthy()
})

test('clearNumber(line, position) - mutates string to clear position', () => {
  const matrixCopy = inputCopy()

  clearNumber(matrixCopy, box.make(0, 0, 3))
  clearNumber(matrixCopy, box.make(5, 0, 3))

  expect(matrixCopy[0]).toEqual(`..........`.split(''))
})

test('getType() - returns whether a character is a symbol', () => {
  expect(getType(INPUT, { x: 1, y: 0 })).toEqual(CharType.Number)
  expect(getType(INPUT, { x: 6, y: 3 })).toEqual(CharType.Symbol)
  expect(getType(INPUT, { x: 4, y: 3 })).toEqual(CharType.Empty)
  expect(getType(INPUT, { x: 3, y: 1 })).toEqual(CharType.Gear)
})

test('get adjecent cells', () => {
  const result = getAdjacentCoords({ x: 4, y: 4 })

  expect(result).toContainEqual({ x: 3, y: 3 })
  expect(result).toContainEqual({ x: 4, y: 3 })
  expect(result).toContainEqual({ x: 5, y: 3 })
  expect(result).toContainEqual({ x: 3, y: 4 })
  expect(result).toContainEqual({ x: 5, y: 4 })
  expect(result).toContainEqual({ x: 3, y: 5 })
  expect(result).toContainEqual({ x: 4, y: 5 })
  expect(result).toContainEqual({ x: 5, y: 5 })
})

test('partOne() - returns sum', () => {
  expect( partOne(INPUT.map(_ => _.join(''))) ).toEqual(4361)
  expect( day03.runPart(1, INPUT.map(_ => _.join(''))) ).toEqual(4361)
})


// part 2: 9:26

test('partTwo() - returns sum', () => {
  expect( partTwo(INPUT.map(_ => _.join(''))) ).toEqual(467835)
  expect( day03.runPart(2, INPUT.map(_ => _.join(''))) ).toEqual(467835)
})
