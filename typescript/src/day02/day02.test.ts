import { expect, test } from '@jest/globals'
import { isGamePossible, parseGame, parseRoll, partOne, partTwo, requiredCubes } from '.'

const INPUT = [
  `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green`,
  `Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue`,
  `Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red`,
  `Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red`,
  `Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`,
]

test('parseRoll() - returns Roll object', () => {
  expect( parseRoll('3 blue, 4 red') )
    .toEqual({
      red: 4,
      green: 0,
      blue: 3,
    })
})

test('parseGame() - returns game object', () => {
  expect( parseGame(INPUT[0]) ).toEqual({
    id: 1,
    rolls: [
      { red: 4, green: 0, blue: 3 },
      { red: 1, green: 2, blue: 6 },
      { red: 0, green: 2, blue: 0 },
    ]
  })

  expect( parseGame(INPUT[2]) ).toEqual({
    id: 3,
    rolls: [
      { red: 20, green: 8,  blue: 6 },
      { red: 4,  green: 13, blue: 5 },
      { red: 1,  green: 5,  blue: 0 },
    ]
  })
})

test('isGamePossible(constraints, game) - return true if possible, otherwise false', () => {
  const constraints = {
    red: 4,
    green: 3,
    blue: 2,
  }

  expect(
    isGamePossible(
      constraints,
      [
        { red: 4, green: 0, blue: 1 },
        { red: 1, green: 2, blue: 2 },
        { red: 0, green: 2, blue: 0 },
      ]
    )
  ).toBeTruthy()

  expect(
    isGamePossible(
      constraints,
      [
        { red: 5, green: 0, blue: 1 },
        { red: 1, green: 2, blue: 2 },
        { red: 0, green: 2, blue: 3 },
      ]
    )
  ).toBeFalsy()
})

test('requiredCubes(game) - returns minimum number of cubes required', () => {
  expect( requiredCubes(parseGame(INPUT[0]).rolls) ).toEqual({ red: 4, green: 2, blue: 6 })
  expect( requiredCubes(parseGame(INPUT[1]).rolls) ).toEqual({ red: 1, green: 3, blue: 4 })
  expect( requiredCubes(parseGame(INPUT[2]).rolls) ).toEqual({ red: 20, green: 13, blue: 6 })
  expect( requiredCubes(parseGame(INPUT[3]).rolls) ).toEqual({ red: 14, green: 3, blue: 15 })
  expect( requiredCubes(parseGame(INPUT[4]).rolls) ).toEqual({ red: 6, green: 3, blue: 2 })
})

test('partOne() - returns sum', () => {
  const result = partOne(INPUT, { red: 12, green: 13, blue: 14 })

  expect(result).toEqual(8)
})

test('partTwo() - returns sum', () => {
  const result = partTwo(INPUT)

  expect(result).toEqual(2286)
})