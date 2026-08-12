import { expect, test } from "vitest";
import { removeItemFromCollection } from "./removeItemFromCollection.js";

test("removes item from collection", () => {
  const item1 = "item1";
  const item2 = "item2";
  const item3 = "item3";

  let collection: readonly string[] = [item1, item2, item3];

  collection = removeItemFromCollection(collection, item3);

  expect(collection).toEqual([item1, item2]);
});

test("throws if item does not exist in collection", () => {
  const item1 = "item1";
  const item2 = "item2";
  const item3 = "item3";

  const collection: readonly string[] = [item1, item2];

  expect(() => removeItemFromCollection(collection, item3)).toThrow(
    "Item does not exist in collection.",
  );
});
