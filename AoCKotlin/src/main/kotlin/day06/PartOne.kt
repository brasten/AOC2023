package me.brasten.day06

fun String.parseValues(): Long =
    split(":")
        .last()
        .split(" ")
        .map { it.trim() }
        .filter { it != "" }
        .joinToString("")
        .toLong()

fun partOne(lines: List<String>): Long {
    val timeLine = listOf( lines[0].parseValues() )
    val distanceLine = listOf( lines[1].parseValues() )

    return distanceLine
        .zip(timeLine)
        .map { (d, t) ->
            (0..t)
                .asSequence()
                .map { buildUp -> (t - buildUp) * buildUp }
                .filter { it > d }
                .fold(0) { acc: Int, l: Long -> acc + 1 }
        }
        .fold(1L) { acc, i -> acc * i }
}