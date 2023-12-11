export class Card {

  public id: number
  public winningNumbers: number[]
  public cardNumbers: number[]

  public numberOfCopies: number = 1

  constructor(id: number) {
    this.id = id
    this.winningNumbers = [] as number[]
    this.cardNumbers = [] as number[]
  }

  incrementCopiesBy(n: number): Card {
    this.numberOfCopies += n
    return this
  }

  addWinningNumbers(numbers: number[]): Card {
    this.winningNumbers.push(...numbers)
    return this
  }

  addCardNumbers(numbers: number[]): Card {
    this.cardNumbers.push(...numbers)
    return this
  }

  totalMatches(): number {
    return this.cardNumbers
      .filter(_ => this.winningNumbers.includes(_))
      .length
  }

  totalValue(): number {
    const numberOfWinningCardNumbers = this.totalMatches()
    if (numberOfWinningCardNumbers == 0) return 0

    return 2 ** (numberOfWinningCardNumbers - 1)
  }

  /**
   * INPUT: `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53`
   *
   * Builds a new Card from input if possible.
   */
  static parseCard(line: string): Card {
    const ret = /Card\s+(\d+):([\s\d]+)\|([\s*\d]+)/

    const match = line.match(ret)
    if (match == null) throw new Error(`Invalid card input: ${line}`)

    const [_, id, winningNumbers, cardNumbers] = match

    return new Card(Number.parseInt(id))
      .addCardNumbers(toNumbers(cardNumbers))
      .addWinningNumbers(toNumbers(winningNumbers))
  }
}

function toNumbers(line: string): number[] {
  return line.split(' ')
    .filter(_ => _ != "")
    .map(_ => Number.parseInt(_))
}