import { expect, test } from "vitest";
import { shuffle } from "./shuffle.js";

test("returns a new array", () => {
  const original = [1, 2, 3];
  const shuffled = shuffle(original);

  expect(shuffled).not.toBe(original);
});

test("does not modify the input array", () => {
  const original = [1, 2, 3];
  shuffle(original);

  expect(original).toEqual([1, 2, 3]);
});

test("returns all original elements", () => {
  const original = [1, 2, 3, 4, 5];
  const shuffled = shuffle(original);

  expect([...shuffled].sort()).toEqual([...original].sort());
});
