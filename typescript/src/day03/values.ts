import * as bx from './box'

export type Value = {
  text: string
  box: bx.Box
}

export function make(text: string, box: bx.Box): Value {
  return { text, box }
}

export function overlapsWith(a: Value, b: Value): boolean {
  return bx.overlapsWith(a.box, b.box)
}
