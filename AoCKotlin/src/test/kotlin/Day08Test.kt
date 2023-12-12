package me.brasten

import org.junit.jupiter.api.Nested
import org.junit.jupiter.api.Test
import kotlin.test.assertContentEquals
import kotlin.test.assertEquals

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
    fun `gcp()`() {
        assertEquals(5L, gcd(15L, 20L))
    }

    @Test
    fun `lcm()`() {
        assertEquals(60L, lcm(15L, 20L))
        assertEquals(6L, lcm(2L, 6L))
    }

//    @Test
//    fun `day08()`() {
//        assertEquals(6, day08(INPUT))
//    }


    @Nested
    inner class SmallDataSet {
        val SMALL_SET = listOf(
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

        val sut = Day08(SMALL_SET)

        @Test
        fun `find periodicities - small set`() {
            val periodicities = sut.getStartingNodes().map {
                sut.getRouteFor(it)
            }

            assertEquals(periodicities[0].values(), listOf(2L))
            assertEquals(periodicities[0].cycle, 2L)
            assertEquals(periodicities[1].values(), listOf(3L, 6L))
            assertEquals(periodicities[1].cycle, 6L)
        }

        @Test
        fun `find simultaneous endings - small set`() {
            val periodicities = listOf(
                Route(2L, Ring(listOf(2L))),
                Route(6L, Ring(listOf(3L, 6L))),
            )

            doCycle(periodicities)

            assertEquals(periodicities[0].values(), listOf(4L))
            assertEquals(periodicities[1].values(), listOf(3L, 6L))

            doCycle(periodicities)

            assertEquals(periodicities[0].values(), listOf(4L))
            assertEquals(periodicities[1].values(), listOf(9L, 6L))
        }

        @Test
        fun `find simultaneous endings on Day object with small set`() {
            assertEquals( 6L, sut.findEnding() )
        }
    }

    val day = Day08()

    @Test
    fun `getStartingNodes`() {
        val startingNodes = day.getStartingNodes()
        println("Starting Nodes: $startingNodes")
    }

    @Test
    fun `generatePeriodicity`() {
        val periodicities = day.getStartingNodes().map {
            day.getRouteFor(it)
        }

        println("Periodic Endings: $periodicities")
    }

    @Test
    fun `find lowest simultaneous ending`() {
        val day = Day08()

        val periodicities = day.getStartingNodes().map {
            day.getRouteFor(it)
        }

        println("Periodic Endings: $periodicities")
    }

//    @Test
    fun `actual`() {
        val fileContent = Day08Test::class.java.getResource("/day08.input.txt").readText()

        println("Day08 Results: " + day08(fileContent.lines()))
    }
}