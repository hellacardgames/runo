export function prependItemToCollection<T>(
  collection: readonly T[],
  item: T,
): readonly T[] {
  return [item, ...collection];
}
