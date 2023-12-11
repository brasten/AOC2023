package me.brasten.day07

enum class HandType {
    HIGH,
    ONE_PAIR,
    TWO_PAIR,
    THREE_KIND,
    FULL_HOUSE,
    FOUR_KIND,
    FIVE_KIND
}

enum class CardType {
    JOKER,
    TWO,
    THREE,
    FOUR,
    FIVE,
    SIX,
    SEVEN,
    EIGHT,
    NINE,
    TEN,
    QUEEN,
    KING,
    ACE;

    fun toChar(): Char =
        when (this) {
            CardType.TWO -> '2'
            CardType.THREE -> '3'
            CardType.FOUR -> '4'
            CardType.FIVE -> '5'
            CardType.SIX -> '6'
            CardType.SEVEN -> '7'
            CardType.EIGHT -> '8'
            CardType.NINE -> '9'
            CardType.TEN -> 'T'
            CardType.JOKER -> 'J'
            CardType.QUEEN -> 'Q'
            CardType.KING -> 'K'
            CardType.ACE -> 'A'
        }


    companion object {
        fun fromChar(card: Char): CardType = when (card) {
            '2' -> TWO
            '3' -> THREE
            '4' -> FOUR
            '5' -> FIVE
            '6' -> SIX
            '7' -> SEVEN
            '8' -> EIGHT
            '9' -> NINE
            'T' -> TEN
            'J' -> JOKER
            'Q' -> QUEEN
            'K' -> KING
            'A' -> ACE
            else -> throw Exception("Invalid card type")
        }
    }
}

class Hand(
    val cards: List<CardType>,
    val type: HandType,
): Comparable<Hand> {

    override fun toString(): String {
        return cards
            .map { it.toChar() }
            .joinToString("")
    }

    override fun compareTo(other: Hand): Int {
        val typeComparison = this.type.compareTo(other.type)
        if (typeComparison != 0) return typeComparison

        for (cardPair in cards.zip(other.cards)) {
            val cardPairComparison = cardPair.first.compareTo(cardPair.second)
            if (cardPairComparison != 0) return cardPairComparison
        }

        return 0
    }
}

fun parseCards(handStr: String): List<CardType> {
    return handStr.map { CardType.fromChar(it) }
}

fun parseHand(handStr: String): Hand {
    val cards = parseCards(handStr)
    return Hand(cards, getHandType(cards))
}

fun getHandType(cards: List<CardType>): HandType {
    val cardCounts: MutableMap<CardType, Int> =
        mutableMapOf(*CardType.entries.map { Pair(it, 0) }.toTypedArray())

    for (card in cards) {
        cardCounts[card] = (cardCounts[card] ?: 0) + 1
    }

    val jokers = cardCounts.remove(CardType.JOKER) ?: 0
    if (jokers == 5) return HandType.FIVE_KIND

    val cardPatterns = cardCounts
        .values
        .toList()
        .filter { it != 0 }
        .sortedDescending()
        .toMutableList()

    cardPatterns[0] += jokers

    return when (cardPatterns) {
        listOf(5) -> HandType.FIVE_KIND
        listOf(4, 1) -> HandType.FOUR_KIND
        listOf(3, 2) -> HandType.FULL_HOUSE
        listOf(3, 1, 1) -> HandType.THREE_KIND
        listOf(2, 2, 1) -> HandType.TWO_PAIR
        listOf(2, 1, 1, 1) -> HandType.ONE_PAIR
        else -> HandType.HIGH
    }
}

fun partOne(input: List<String>): Long {
    return input
        .map { it.split(" ") }
        .map {
            Pair(
                parseHand(it[0]),
                it[1].toLong(),
            )
        }
        .sortedBy { it.first }
        .mapIndexed { index, wager ->
            wager.second * (index + 1)
        }
        .sum()
}