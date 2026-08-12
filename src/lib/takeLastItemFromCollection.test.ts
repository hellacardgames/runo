import { expect, test } from "vitest";
import { takeLastItemFromCollection } from "./takeLastItemFromCollection.js";

test("takes last item from collection", () => {
  const item1 = "item1";
  const item2 = "item2";
  const item3 = "item3";

  const collection: readonly string[] = [item1, item2, item3];

  const result = takeLastItemFromCollection(collection);

  expect(result.collection).toEqual([item1, item2]);
  expect(result.item).toBe(item3);
});

test("throws if collection is empty", () => {
  const collection: unknown[] = [];

  expect(() => takeLastItemFromCollection(collection)).toThrow(
    "Collection is empty.",
  );
});
