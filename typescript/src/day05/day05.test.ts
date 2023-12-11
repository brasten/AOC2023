import { describe, expect, test } from '@jest/globals'
import day05, { PART_ONE_PARSER } from '.'
import Almanac from './Almanac'
import AlmanacMap from './AlmanacMap'

const INPUT = [
  `seeds: 79 14 55 13`,
  ``,
  `seed-to-soil map:`,
  `50 98 2`,
  `52 50 48`,
  ``,
  `soil-to-fertilizer map:`,
  `0 15 37`,
  `37 52 2`,
  `39 0 15`,
  ``,
  `fertilizer-to-water map:`,
  `49 53 8`,
  `0 11 42`,
  `42 0 7`,
  `57 7 4`,
  ``,
  `water-to-light map:`,
  `88 18 7`,
  `18 25 70`,
  ``,
  `light-to-temperature map:`,
  `45 77 23`,
  `81 45 19`,
  `68 64 13`,
  ``,
  `temperature-to-humidity map:`,
  `0 69 1`,
  `1 0 69`,
  ``,
  `humidity-to-location map:`,
  `60 56 37`,
  `56 93 4`,
]

describe('AlmanacMap', () => {
  test('parseMap() - returns map', () => {
    const map = AlmanacMap.parse(INPUT.slice(2, 5))

    expect(map.source).toEqual('seed')
    expect(map.destination).toEqual('soil')
  })

  test('destinationFor(source) - returns mapped destination or default', () => {
    const map = AlmanacMap.parse(INPUT.slice(2, 5))

    expect(map.destinationFor(1)).toEqual(1)
    expect(map.destinationFor(50)).toEqual(52)
    expect(map.destinationFor(51)).toEqual(53)
    expect(map.destinationFor(90)).toEqual(92)
    expect(map.destinationFor(51)).toEqual(53)
    expect(map.destinationFor(98)).toEqual(50)
    expect(map.destinationFor(99)).toEqual(51)
  })
})

describe('Almanac', () => {
  test('parse() -> returns Almanac', () => {
    const subject = Almanac.parse(INPUT, PART_ONE_PARSER)

    expect(subject.getSeeds()).toEqual([ [79, 1], [14, 1], [55, 1], [13, 1] ])
    expect(subject.getMapFor("seed")).not.toBeNull()
    expect(subject.getMapFor("soil")).not.toBeNull()
    expect(subject.getMapFor("fertilizer")).not.toBeNull()
    expect(subject.getMapFor("water")).not.toBeNull()
    expect(subject.getMapFor("light")).not.toBeNull()
    expect(subject.getMapFor("temperature")).not.toBeNull()
    expect(subject.getMapFor("humidity")).not.toBeNull()
  })
})

test('partOne - returns value', () => {
  expect(day05.runPart(1, INPUT)).toEqual(35)
})

test('partTwo - returns value', () => {
  expect(day05.runPart(2, INPUT)).toEqual(46)
})