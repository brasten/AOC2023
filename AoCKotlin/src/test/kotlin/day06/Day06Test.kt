package day06

import me.brasten.day06.parseValues
import me.brasten.day06.partOne
import org.junit.jupiter.api.Test
import kotlin.test.assertEquals

class Day06Test {
    val INPUT = listOf(
        "Time:      7  15   30",
        "Distance:  9  40  200",
    )

    @Test
    fun `partOne()`() {
        val result = partOne(INPUT)

        assertEquals(71503, result)
    }

    @Test
    fun `parseValues()`() {
        val result = INPUT[0].parseValues()

        assertEquals(71530, result)
    }

    @Test
    fun `doPartOne test`() {
        val fileContent = Day06Test::class.java.getResource("/day06.input.txt").readText()

        println("Results: " + partOne(fileContent.lines()))
    }
}