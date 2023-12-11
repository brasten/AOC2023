import { ensure } from '../utils'
import Almanac from './Almanac'

function* seedsFor(seedDesc: [number, number]): Iterable<number> {
  for (let i = seedDesc[0]; i <= seedDesc[0] + seedDesc[1]; i++) {
    yield(i)
  }
}

export function doProcess(lines: string[], parser: SeedParser): number {
  const almanac = Almanac.parse(lines, parser)

  const maps = [
    almanac.getMapFor("seed"),
    almanac.getMapFor("soil"),
    almanac.getMapFor("fertilizer"),
    almanac.getMapFor("water"),
    almanac.getMapFor("light"),
    almanac.getMapFor("temperature"),
    almanac.getMapFor("humidity"),
  ]

  let lowestResult = Number.MAX_SAFE_INTEGER

  for (let seedDesc of almanac.getSeeds()) {
    for (let seed of seedsFor(seedDesc)) {
      const destination = maps.reduce(
        (val, map) => map.destinationFor(val),
        seed,
      )

      lowestResult = Math.min(lowestResult, destination)
    }
  }

  return lowestResult
}

export function partOne(lines: string[]): number {
  return doProcess(lines, PART_ONE_PARSER)
}

export type SeedParser = (seeds: number[]) => [number, number][]

export const PART_ONE_PARSER: SeedParser  = _ => _.map(seed => [seed, 1])
export const PART_TWO_PARSER: SeedParser  = s => {
  const seeds = Array.from(s)
  const result = [] as [number, number][]

  while (seeds.length > 1) {
    result.push([ ensure(seeds.shift()), ensure(seeds.shift()) ])
  }

  return result
}

export function partTwo(lines: string[]): number {
  return doProcess(lines, PART_TWO_PARSER)
}

export default {
  runPart(partNum: number, input: string[]): number {
    switch (partNum) {
      case 1: return partOne(input)
      case 2: return partTwo(input)
      default: throw new Error(`Invalid part ${partNum}`)
    }
  }
}