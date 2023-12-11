import arg from 'arg'
import assert from 'assert'
import { readFile } from 'fs/promises'

import day01 from './day01'
import day02 from './day02'
import day03 from './day03'
import day04 from './day04'
import day05 from './day05'

const args = arg({
  '--day': Number,
  '--part': Number,
})

const day = args['--day']
const part = args['--part']
assert(day != undefined, 'Day is required')
assert(part != undefined, 'Part is required')

export interface Runner {
  runPart(partNum: number, input: string[]): number
}

const DAILY_RUNNERS: Runner[] = [
  day01,
  day02,
  day03,
  day04,
  day05,
]

// const TASK_MAP = new Map<string, [string, (_: string[]) => string]>([
//   ["1/1", ['day1.input.txt', (_: string[]) => String(day01.calibrationValue(_, day01.parseDigitAt))]],
//   ["1/2", ['day1.input.txt', (_: string[]) => String(day01.calibrationValue(_, day01.parseNumberAt))]],
//   ["2/1", ['day2.input.txt', (_: string[]) => String(day02.partOne(_, { red: 12, green: 13, blue: 14 }))]],
//   ["2/2", ['day2.input.txt', (_: string[]) => String(day02.partTwo(_))]],
//   ["3/1", ['day3.input.txt', (_: string[]) => String(day03.partOne(_))]],
//   ["3/2", ['day3.input.txt', (_: string[]) => String(day03.partTwo(_))]],
//   ["4/1", ['day4.input.txt', (_: string[]) => String(day04.partOne(_))]],
//   ["4/2", ['day4.input.txt', (_: string[]) => String(day04.partTwo(_))]],
//   ["4/2", ['day5.input.txt', (_: string[]) => String(day05.part(_))]],
// ])

console.log(`Running day ${day}, part ${part}`)

const runner = DAILY_RUNNERS[day - 1]
assert(runner != undefined, 'Runner not found')

const inputFile = `day${day}.input.txt`
const contents = await readFile(inputFile, 'utf-8')

const result = runner.runPart(part, contents.split('\n'))
console.log(`Result: ${result}`)
