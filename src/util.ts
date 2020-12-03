export function serialize(obj: unknown): object {
  return JSON.parse(JSON.stringify(obj, Object.getOwnPropertyNames(obj)));
}
