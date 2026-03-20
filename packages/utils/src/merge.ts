import { isObject } from './isObject'

export function deepMerge<T>(target: T, source: any): T {
  if (!source) return target

  const result = { ...target }

  for (const key in source) {
    if (source.hasOwnProperty(key)) {
      if (isObject(source[key]) && isObject(result[key])) {
        result[key] = deepMerge(result[key], source[key])
      } else {
        result[key] = source[key]
      }
    }
  }

  return result
}
