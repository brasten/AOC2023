import { ensure } from '../utils'
import AlmanacMap from './AlmanacMap'


export class Almanac {

  private seeds = [] as [number, number][]
  private maps = new Map<string, AlmanacMap>()

  constructor() {
  }

  getMapFor(source: string): AlmanacMap {
    return ensure(this.maps.get(source))
  }

  addSeeds(seeds: [number, number][]): Almanac {
    this.seeds.push(...seeds)
    return this
  }

  getSeeds(): [number, number][] {
    return this.seeds
  }

  addMap(map: AlmanacMap): Almanac {
    this.maps.set(map.source, map)

    return this
  }

  static parse(lines: string[], seedAdapter: (seeds: number[]) => [number, number][]): Almanac {
    const ret = new Almanac()

    const seeds = lines[0]
      ?.split(":")[1]
      ?.split(" ")
      .map(_ => _.trim())
      .filter(_ => _ != '')
      .map(_ => Number.parseInt(_)) ?? []

    ret.addSeeds(seedAdapter(seeds))

    const buffer = [] as string[]

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim()
      if (line != '') {
        buffer.push(line)
      } else if (buffer.length > 0) {
        ret.addMap(AlmanacMap.parse(buffer))
        buffer.length = 0
      }
    }

    if (buffer.length > 0)
      ret.addMap(AlmanacMap.parse(buffer))

    return ret
  }

}

export default Almanac