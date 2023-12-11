import * as coords from './coords'

export type Box = {
  coords: coords.Coords
  len: number
}

export function make(x: number, y: number, len: number): Box {
  return { coords: coords.make(x, y), len }
}

export function overlapsWith(a: Box, b: Box): boolean {
  if (a.coords.y != b.coords.y) return false

  const xPos = [a, b]
    .map(_ => [_.coords.x, _.coords.x + _.len])
    .sort((a, b) => a[0] - b[0])

  return xPos[0][1] >= xPos[1][0]
}

export const uniquer =
  (acc: Box[], box: Box | null): Box[] => {
    if (box == null) return acc
    if (acc.some(_ => overlapsWith(_, box))) return acc

    return [...acc, box]
  }
