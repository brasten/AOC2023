package me.brasten.day05

enum class Category {
    SEED,
    SOIL,
    FERTILIZER,
    WATER,
    LIGHT,
    TEMPERATURE,
    HUMIDITY
}

class AlmanacMap {

}

data class SeedRange(
    val start: Int,
    val length: Int,
)

class Almanac {
    private val categories: MutableMap<Category, AlmanacMap> = mutableMapOf()
    private val seedRanges: MutableList<SeedRange> = mutableListOf()

    fun addSeeds(seeds: List<SeedRange>) {
        seedRanges.addAll(seeds)
    }

    companion object {
        fun parse(lines: List<String>): Almanac {
            val retVal = Almanac()
            val buffer = mutableListOf<String>()

            for (line in lines) {
                if (line.startsWith("seeds:")) {
                    val seeds = line.split(":")
                        .last()
                        .split(" ")
                        .map { it.trim() }
                        .filter { it !== "" }
                        .map { it.toInt() }
                        .chunked(2)
                        .map { SeedRange(it[0], it[1]) }

                    retVal.addSeeds(seeds)
                } else if (line.trim() == "") {
                    if (buffer.isNotEmpty()) {

                    }
                } else {

                }
            }

//            println("seeds -> ${seeds}")

//            println("next line -> ${lineIter.take(3).toList()}")

            return retVal
        }
    }
}