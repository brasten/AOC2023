import * as bx from './box'
import * as cs from './coords'
import * as v from './values'

export enum CharType {
  Number,
  Symbol,
  Gear,
  Empty,
}

export function clearNumber(
  matrix: Matrix,
  position: bx.Box,
) {
  for (let i = position.coords.x; i < position.coords.x + position.len; i++) {
    matrix[position.coords.y][i] = '.'
  }
}

type Matrix = string[][]

// function deduplicatePositions(positions: Box[]): Box[] {
//   return Array.from(
//     positions.reduce((acc, [, y]) => {
//       if (pos == null) return acc

//       const key = `${pos.idx}/${pos.len}/${y}`
//       const value = extract(matrix[y], pos)

//       acc.set(key, value)
//       return acc
//     }, new Map<string, Box>())
//     .values()
//   )
// }

export function getType(
  line: Matrix,
  coords: cs.Coords,
): CharType {
  const char = line[coords.y][coords.x]

  if (char == ".") return CharType.Empty
  if (!isNaN(Number.parseInt(char))) return CharType.Number

  if (char == "*") {
    const ratios = getAdjacentCoords(coords)
      .map(coords => findNumberLocation(line, coords))
      .reduce(bx.uniquer, [] as bx.Box[])

    if (ratios.length == 2) return CharType.Gear
  }

  return CharType.Symbol
}

export function extract(
  matrix: Matrix,
  position: bx.Box,
): number {
  const line = matrix[position.coords.y]
  const digits = parseInt(line.slice(position.coords.x, position.coords.x + position.len).join(''))

  if (isNaN(digits)) throw new Error('No digits found')
  return digits
}

export function findNumberLocation(
  matrix: Matrix,
  coords: cs.Coords,
): bx.Box | null {
  let start = coords.x
  let len = 0
  const line = matrix[coords.y]

  for (let i = start; i >= 0; i--) {
    const char = line[i]

    if (isNaN(Number.parseInt(char))) {
      break
    }

    start = i
    len++
  }

  for (let i = (start + len); i < line.length; i++) {
    const char = line[i]

    if (isNaN(Number.parseInt(char))) {
      break
    }

    len++
  }

  return len == 0 ? null : { coords: cs.make(start, coords.y), len }
}

export function getAdjacentCoords(_: {
  x: number,
  y: number,
}): cs.Coords[] {
  const coords = [] as cs.Coords[]

  for (let x = _.x - 1; x <= _.x + 1; x++) {
    for (let y = _.y - 1; y <= _.y + 1; y++) {
      if (x == _.x && y == _.y) continue

      coords.push({ x, y })
    }
  }

  return coords
}


export function* allCoordsIn(lines: string[][]): Iterable<{ x: number, y: number }> {
  for (let y = 0; y < lines.length; y++) {
    for (let x = 0; x < lines[y].length; x++) {
      yield { x, y }
    }
  }
}

export function partOne(lines: string[]): number {
  const matrix = lines
    .map(_ => _.split(''))

  const values = Array.from(allCoordsIn(matrix))
    .filter(_ => [CharType.Symbol, CharType.Gear].includes(getType(matrix, _)))
    .flatMap(_ => getAdjacentCoords(_))
    .map((_): bx.Box | null => findNumberLocation(matrix, _))
    .reduce(bx.uniquer, [] as bx.Box[])
    .map(_ => v.make(String(extract(matrix, _)), _))

  return Array.from(values)
    .reduce((acc, _) => acc + Number.parseInt(_.text), 0)
}

const getRatiosFromCoords = (matrix: Matrix) =>
  (adjacentsToGear: cs.Coords[]) => {
    return adjacentsToGear.map(_ => findNumberLocation(matrix, _))
      .reduce(bx.uniquer, [] as bx.Box[])
      .map(_ => v.make(String(extract(matrix, _)), _))
  }

const productOfValues =
  (values: v.Value[]) =>
    values.reduce(
      (acc, _) => acc * Number.parseInt(_.text),
      1,
    )

export function partTwo(lines: string[]): number {
  const matrix = lines
    .map(_ => _.split(''))

  return Array.from(allCoordsIn(matrix))
    .filter(_ => [CharType.Gear].includes(getType(matrix, _)))
    .map(_ => getAdjacentCoords(_))
    .map(getRatiosFromCoords(matrix))
    .filter(_ => _.length == 2)
    .map(productOfValues)
    .reduce((acc, _) => acc + _, 0)
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