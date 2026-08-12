import { expect, test } from "vitest";
import { addItemToCollection } from "./addItemToCollection.js";

test("adds item to collection", () => {
  const item1 = "item1";
  const item2 = "item2";
  const item3 = "item3";

  let collection: readonly string[] = [item1, item2];

  collection = addItemToCollection(collection, item3);

  expect(collection).toEqual([item1, item2, item3]);
});
