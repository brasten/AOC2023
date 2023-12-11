import { ensure, isNil } from '../utils'

const HEADER_RE = /(\w+)-to-(\w+) map:/
const MAP_RE = /(\d+) (\d+) (\d+)/

export type Entry = {
  sourceStart: number
  destinationStart: number
  count: number
}

export class AlmanacMap {
  public source: string
  public destination: string

  private overrides = [] as Entry[]

  constructor(source: string, destination: string) {
    this.source = source
    this.destination = destination
  }

  addMappingFor(sourceId: number, destinationId: number, count: number = 1): AlmanacMap {
    this.overrides.push({ sourceStart: sourceId, destinationStart: destinationId, count })

    return this
  }

  destinationFor(sourceId: number): number {
    const mapEntry = this.overrides.find(entry => sourceId >= entry.sourceStart && sourceId < entry.sourceStart + entry.count)

    if (isNil(mapEntry)) return sourceId

    return mapEntry.destinationStart + (sourceId - mapEntry.sourceStart)
  }

  static parse(lines: string[]): AlmanacMap {
    const header = ensure(lines.shift()?.match(HEADER_RE))

    const [_, source, destination] = header

    const map = new AlmanacMap(source, destination)

    for (let line of lines) {
      const [ destId, srcId, count ] =
        ensure(line.match(MAP_RE))
          .slice(1, 5)
          .map(_ => Number.parseInt(_))

      map.addMappingFor(srcId, destId, count)
    }

    return map
  }
}

export default AlmanacMap