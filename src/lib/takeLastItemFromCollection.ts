type TakeLastItemFromCollectionResult<T> = {
  readonly collection: readonly T[];
  readonly item: T;
};

export function takeLastItemFromCollection<T>(
  collection: readonly T[],
): TakeLastItemFromCollectionResult<T> {
  if (collection.length === 0) {
    throw new Error("Collection is empty.");
  }

  const newCollection = [...collection];
  const item = newCollection.pop()!;

  return {
    collection: newCollection,
    item,
  };
}
