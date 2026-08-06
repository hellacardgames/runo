import { expect, test } from "vitest";
import { prependItemToCollection } from "./prependItemToCollection.js";

test("prepends item to collection", () => {
  const item1 = "item1";
  const item2 = "item2";
  const item3 = "item3";

  let collection: readonly string[] = [item1, item2];

  collection = prependItemToCollection(collection, item3);

  expect(collection).toEqual([item3, item1, item2]);
});
