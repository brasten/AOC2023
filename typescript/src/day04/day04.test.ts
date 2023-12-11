import { expect, test } from '@jest/globals'
import day04, { partOne, partTwo } from '.'
import { Card } from './card'

const INPUT = [
  `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53`,
  `Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19`,
  `Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1`,
  `Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83`,
  `Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36`,
  `Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`,
]

test('Card.parseCard(cardInput) - returns card', () => {
  expect( Card.parseCard(INPUT[0]) )
    .toEqual(
      new Card(1)
        .addWinningNumbers([41, 48, 83, 86, 17])
        .addCardNumbers([83, 86, 6, 31, 17, 9, 48, 53])
    )

  expect( Card.parseCard(`Card   1:  8 86 59 90 68 52 55 24 37 69 | 10 55  8 86  6 62 69 68 59 37 91 90 24 22 78 61 58 89 52 96 95 94 13 36 81`) )
    .toEqual(
      new Card(1)
        .addWinningNumbers([8, 86, 59, 90, 68, 52, 55, 24, 37, 69])
        .addCardNumbers([10, 55, 8, 86, 6, 62, 69, 68, 59, 37, 91, 90, 24, 22, 78, 61, 58, 89, 52, 96, 95, 94, 13, 36, 81])
    )
})

test('card copy system', () => {
  const card = Card.parseCard(INPUT[0])
  expect(card.numberOfCopies).toEqual(1)

  card.incrementCopiesBy(5)
  expect(card.numberOfCopies).toEqual(6)
})

test('Card.totalValue() - returns card winnings', () => {
  const cards = INPUT.map(_ => Card.parseCard(_))

  expect( cards[0].totalValue() ).toEqual(8)
  expect( cards[1].totalValue() ).toEqual(2)
  expect( cards[2].totalValue() ).toEqual(2)
  expect( cards[3].totalValue() ).toEqual(1)
  expect( cards[4].totalValue() ).toEqual(0)
  expect( cards[5].totalValue() ).toEqual(0)
})

test('Card.totalMatches() - returns card matching numbers', () => {
  const cards = INPUT.map(_ => Card.parseCard(_))

  expect( cards[0].totalMatches() ).toEqual(4)
  expect( cards[1].totalMatches() ).toEqual(2)
  expect( cards[2].totalMatches() ).toEqual(2)
  expect( cards[3].totalMatches() ).toEqual(1)
  expect( cards[4].totalMatches() ).toEqual(0)
  expect( cards[5].totalMatches() ).toEqual(0)
})

test('partOne(INPUT) - returns scratch card value', () => {
  expect( partOne(INPUT) ).toEqual(13)
  expect( day04.runPart(1, INPUT) ).toEqual(13)
})

test('partTwo(INPUT) - returns number of cards', () => {
  expect( partTwo(INPUT) ).toEqual(30)
  expect( day04.runPart(2, INPUT) ).toEqual(30)
})