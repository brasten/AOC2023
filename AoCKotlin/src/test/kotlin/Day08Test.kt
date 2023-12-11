package me.brasten

import day06.Day07Test
import me.brasten.day07.partOne
import org.junit.jupiter.api.Test
import kotlin.test.assertContentEquals
import kotlin.test.assertEquals
import kotlin.test.assertTrue

class Day08Test {

    val INPUT = listOf(
        "LR",
        "",
        "11A = (11B, XXX)",
        "11B = (XXX, 11Z)",
        "11Z = (11B, XXX)",
        "22A = (22B, XXX)",
        "22B = (22C, 22C)",
        "22C = (22Z, 22Z)",
        "22Z = (22B, 22B)",
        "XXX = (XXX, XXX)",
    )

    @Test
    fun `first light`() {
        val res = parseNode("BBB = (AAA, ZZZ)")

        assertEquals(Pair("BBB", Pair("AAA", "ZZZ")), res)
    }

    @Test
    fun `day08()`() {
        assertEquals(6, day08(INPUT))
    }

    @Test
    fun `actual`() {
        val fileContent = Day08Test::class.java.getResource("/day08.input.txt").readText()

        println("Day08 Results: " + day08(fileContent.lines()))
    }
}