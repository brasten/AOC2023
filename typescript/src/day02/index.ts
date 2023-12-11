
export type Roll = {
  red: number
  green: number
  blue: number
}

export type Game = {
  id: number
  rolls: Roll[]
}

export function parseRoll(roll: string): Roll {
  const result = { red: 0, green: 0, blue: 0 }
  const cubeDescs = roll.split(',').map(_ => _.trim())

  for (const desc of cubeDescs) {
    const [count, color] = desc.split(' ')

    result[color as keyof Roll] = parseInt(count)
  }

  if (Object.keys(result).length > 3)
    throw new Error("Too many colors")

  return result
}

export function parseGame(line: string): Game {
  const result = { id: 0, rolls: [] } as Game
  const [gameName, rollDescs] = line.split(": ")

  result.id = parseInt(gameName.split(" ")[1])
  result.rolls = rollDescs.split(';').map(parseRoll)

  return result
}

export function isGamePossible(constraints: Roll, rolls: Roll[]): boolean {
  return !rolls.some(_ =>
    _.red > constraints.red
    || _.green > constraints.green
    || _.blue > constraints.blue
  )
}

export function requiredCubes(rolls: Roll[]): Roll {
  return rolls.reduce(
    (acc, _) => ({
      red: Math.max(acc.red, _.red),
      green: Math.max(acc.green, _.green),
      blue: Math.max(acc.blue, _.blue),
    }),
    { red: 0, green: 0, blue: 0 }
  )
}

export function partOne(input: string[], constraint: Roll): number {
  return input
    .map(parseGame)
    .filter(_ => isGamePossible(constraint, _.rolls))
    .reduce((acc, _) => acc + _.id, 0)
}

export function partTwo(input: string[]): number {
  return input
    .map(parseGame)
    .map(_ => _.rolls)
    .map(requiredCubes)
    .map(_ => _.red * _.green * _.blue)
    .reduce((acc, _) => acc + _, 0)
}

export default {
  runPart(partNum: number, input: string[]): number {
    switch (partNum) {
      case 1: return partOne(input, { red: 12, green: 13, blue: 14 })
      case 2: return partTwo(input)
      default: throw new Error(`Invalid part ${partNum}`)
    }
  }
}