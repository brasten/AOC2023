import { Card } from './card'


export function partOne(lines: string[]): number {
  return lines
    .map(_ => Card.parseCard(_))
    .map(_ => _.totalValue())
    .reduce((a, b) => a + b, 0)
}

export function partTwo(lines: string[]): number {
  const cards = lines.map(_ => Card.parseCard(_))

  for (let i = 0; i < cards.length; i++) {
    const card = cards[i]
    const countOfMatches = card.totalMatches()
    const countOfCards = card.numberOfCopies

    for (let j = i+1; j <= i + countOfMatches; j++) {
      cards[j].incrementCopiesBy(countOfCards)
    }
  }

  return cards.reduce((a, b) => a + b.numberOfCopies, 0)
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