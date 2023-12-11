export function isNil<T>(obj: T | null | undefined): obj is null | undefined {
  return obj == null || obj == undefined
}

export function ensure<T>(obj: T | null | undefined): T {
  if (isNil(obj)) throw new Error("Invalid object")

  return obj
}