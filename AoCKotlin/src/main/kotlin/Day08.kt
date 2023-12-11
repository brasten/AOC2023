package me.brasten

fun parseNode(line: String): Pair<String, Pair<String, String>> {
    val nodeDescRe = Regex("(\\w+) = \\((\\w+), (\\w+)\\)")

    val matches = nodeDescRe.find(line)
    requireNotNull(matches)

    return Pair(
        matches.groupValues[1],
        Pair(
            matches.groupValues[2],
            matches.groupValues[3],
        ),
    )
}

fun day08(lines: List<String>): Long {
    val directions = lines[0]

    val nodes = lines
        .subList(2, lines.size)
        .map { parseNode(it) }
        .toMap()

    val currentNodes = nodes
        .keys
        .filter { it.endsWith("A") }
        .toMutableList()

    var steps = 0L

    while (!currentNodes.all { it.endsWith("Z") }) {
        val nextStep = directions[steps.mod(directions.length)]

        currentNodes.forEachIndexed { idx, elem ->
            currentNodes[idx] = when (nextStep) {
                'L' -> nodes[elem]!!.first
                'R' -> nodes[elem]!!.second
                else -> throw IllegalStateException()
            }
        }

        steps++
    }

    return steps
}