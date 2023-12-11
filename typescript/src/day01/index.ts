

export function fromDigits(digits: number[]): number {
  return parseInt(digits.join(''))

}

export function parseDigitAt(
  line: string,
  idx: number,
): number | null {
    const char = parseInt(line[idx])

    return !isNaN(char) ? char : null
}

type Parser = (line: string, idx: number) => number | null

export function parseDigits(line: string, parser: Parser): [number, number] {
  let first: number | null = null
  let last: number | null = null

  for (let i = 0; i < line.length; i++) {
    first = first ?? parser(line, i)
    last = last ?? parser(line, line.length - i - 1)

    if (first != null && last != null) break
  }

  if (first == null || last == null)
    throw new Error('No digits found')

  return [first, last]
}

const DIGITS = new Map(Object.entries({
  '0': 0,
  '1': 1,
  '2': 2,
  '3': 3,
  '4': 4,
  '5': 5,
  '6': 6,
  '7': 7,
  '8': 8,
  '9': 9,
  'zero': 0,
  'one': 1,
  'two': 2,
  'three': 3,
  'four': 4,
  'five': 5,
  'six': 6,
  'seven': 7,
  'eight': 8,
  'nine': 9
}))

export function parseNumberAt(
  line: string,
  idx: number,
): number | null {
  for (let i = 0; i <= 5; i++) {
    const num = DIGITS.get(line.slice(idx, idx + i))
    if (num != undefined) return num

    if (Array.from(DIGITS.keys()).find(key => key.startsWith(line.slice(idx, idx + i))) == undefined) break
  }

    return null
}

export function calibrationValue(
  input: string[],
  parser: (line: string, idx: number) => number | null,
): number {
  return input
    .map(_ => parseDigits(_, parser))
    .map(fromDigits)
    .reduce((acc, val) => acc + val, 0)
}


export default {
  runPart(partNum: number, input: string[]): number {
    switch (partNum) {
      case 1: return calibrationValue(input, parseDigitAt)
      case 2: return calibrationValue(input, parseNumberAt)
      default: throw new Error(`Invalid part ${partNum}`)
    }
  }
}