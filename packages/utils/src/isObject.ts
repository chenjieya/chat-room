// 判断val值是否是 对象
export function isObject(val: unknown): val is Record<string, any> {
  return typeof val === 'object' && val !== null && !Array.isArray(val)
}
