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
    var nextStep = 'L'

    println("starting Location -> ${currentNodes.joinToString("/")}")

    val beenThere = mutableMapOf<String, Boolean>()
    val breadcrumbs = mutableListOf<String>()

    while (!currentNodes.all { it.endsWith("Z") }) {
        val stepIdx = steps.mod(directions.length)
        println("stepIdx -> ${stepIdx}")
        val key = "${currentNodes[0]}/${stepIdx}"
        breadcrumbs.add(key)
        if (beenThere[key] == true) {
            println("We've seen this location before! ${key}")
            throw IllegalStateException("We've seen this location before! ${key} -> ${breadcrumbs.joinToString("->")}")
        }
        beenThere[key] = true

        if (beenThere.size.mod(1_000_000) == 0) {
            println("Seen ${beenThere.size} combinations")
        }

        nextStep = directions[stepIdx]
        if (steps.mod(10_000_000) == 0) {
            println("Steps -> ${steps}")
            println("Nodes -> ${currentNodes.joinToString(",")}")
        }

        for (i in 0..<currentNodes.size) {
            currentNodes[i] = when (nextStep) {
                'L' -> nodes[currentNodes[i]]!!.first
                'R' -> nodes[currentNodes[i]]!!.second
                else -> throw IllegalStateException()
            }
        }

        steps++
    }

    return steps
}


fun doCycle(periods: List<Route>) {
    val trailingRoute = periods.minByOrNull { it.lowestEnding() }
    trailingRoute?.skipLowest()
}

fun gcd(a: Long, b: Long): Long =
    if (b == 0L) a
    else gcd(b, a.mod(b))

fun lcm(a: Long, b: Long): Long =
    (a / gcd(a, b)) * b

class Route(
    val cycle: Long,
    val endings: Ring,
) {
    fun lowestEnding() = endings.getCurrent()

    fun skipLowest() = endings.incrementCurrentBy(cycle)

    fun count() = endings.count()

    fun values() = endings.values()
}

class Ring(
    values: List<Long>
) {
    private var cursor = 0
    private val availableValues = values.sorted().toMutableList()

    fun getCurrent() = availableValues[cursor]

    fun count() = availableValues.count()
    fun values() = availableValues.toList()

    fun incrementCurrentBy(inc: Long) {
        availableValues[cursor] += inc
        cursor = cursor.inc().mod(availableValues.size)
    }
}

fun List<Route>.currentEndings(): Set<Long> =
    map { it.lowestEnding() }.toSet()

class Day08(
    private val lines: List<String> = Day08::class.java.getResource("/day08.input.txt").readText().lines(),
) {
    private val directions = lines[0]
    private val nodes = lines
        .subList(2, lines.size)
        .map { parseNode(it) }
        .toMap()

    fun getStartingNodes(): List<String> =
        nodes.keys.filter { it.endsWith("A") }

    fun findEnding(): Long {
        val routes = getStartingNodes()
            .map(::getRouteFor)

        return routes
            .map { it.cycle }
            .reduce { acc, it -> lcm(acc, it) }

//        var currentEndings = routes.currentEndings()
//
//        while (currentEndings.size > 1) {
//            if (currentEndings.size < 5) {
//                val highest = currentEndings.max()
//
//                println("Current Endings -> ${currentEndings.map { "$it (+${highest - it})" }.joinToString(" / ")}")
//            }
//
//            doCycle(routes)
//            currentEndings = routes.currentEndings()
//        }
//
//        return currentEndings.first()
    }

    fun getRouteFor(node: String): Route {
        var steps = 0L
        var nextStep: Char

        val beenThere = mutableMapOf<String, Boolean>()
        val breadcrumbs = mutableListOf<Long>()
        var currentNode = node
        var key = "$currentNode/0"

        while (beenThere[key] != true) {
            val stepIdx = steps.mod(directions.length)

            if (currentNode.endsWith("Z")) {
                breadcrumbs.add(steps)
            }

            beenThere[key] = true
            nextStep = directions[stepIdx]

            currentNode = when (nextStep) {
                'L' -> nodes[currentNode]!!.first
                'R' -> nodes[currentNode]!!.second
                else -> throw IllegalStateException()
            }

            steps++
            key = "$currentNode/${steps.mod(directions.length)}"
        }

        return Route(steps-1, Ring(breadcrumbs))
    }

    fun run() {

        println("Day08 Results: " + day08(lines))
    }
}