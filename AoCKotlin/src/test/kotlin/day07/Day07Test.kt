package day06

import me.brasten.day07.*
import org.junit.jupiter.api.Nested
import org.junit.jupiter.api.Test
import kotlin.test.assertContentEquals
import kotlin.test.assertEquals
import kotlin.test.assertTrue

class Day07Test {

    val INPUT = listOf(
        "32T3K 765",
        "T55J5 684",
        "KK677 28",
        "KTJJT 220",
        "QQQJA 483",
    )

    @Test
    fun `hand types`() {
        assertEquals(HandType.ONE_PAIR, getHandType(parseCards("32T3K")))
        assertEquals(HandType.FOUR_KIND, getHandType(parseCards("T55J5")))
        assertEquals(HandType.TWO_PAIR, getHandType(parseCards("KK677")))
        assertEquals(HandType.FOUR_KIND, getHandType(parseCards("KTJJT")))
        assertEquals(HandType.FOUR_KIND, getHandType(parseCards("QQQJA")))

        assertTrue(HandType.ONE_PAIR < HandType.TWO_PAIR)
    }

    @Test
    fun `hand comparisons`() {
        val twoPair = parseHand("32T3K")
        val threeOfAKind = parseHand("QQQJA")
        val lesserThreeOfAKind = parseHand("T55J5")

        assert(twoPair < threeOfAKind)
        assert(lesserThreeOfAKind < threeOfAKind)
    }

    @Test
    fun `hand sorting`() {
        val hands = listOf("32T3K", "T55J5", "KK677", "KTJJT", "QQQJA")
            .map { parseHand(it) }
            .sortedDescending()

        assertContentEquals(
            listOf("KTJJT", "QQQJA", "T55J5", "KK677", "32T3K"),
            hands.map { it.toString() }
        )
    }

    @Test
    fun `partOne example`() {
        assert( partOne(INPUT) == 5905L )
    }

    @Test
    fun `partOne actual`() {
        val fileContent = Day07Test::class.java.getResource("/day07.input.txt").readText()

        println("Day07 Results: " + partOne(fileContent.lines()))
    }
}