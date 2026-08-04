/**
 * Fisher-Yates algorithm (also known as the Knuth shuffle).
 */
export function shuffle<T>(items: readonly T[]): readonly T[] {
  const itemsCopy = [...items];
  for (let i = itemsCopy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [itemsCopy[i], itemsCopy[j]] = [itemsCopy[j]!, itemsCopy[i]!];
  }
  return itemsCopy;
}
