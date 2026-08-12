import { expect, test } from "vitest";
import { isColor } from "./isColor.js";

test("returns true for valid colors", () => {
  expect(isColor("blue")).toBe(true);
  expect(isColor("green")).toBe(true);
  expect(isColor("red")).toBe(true);
  expect(isColor("yellow")).toBe(true);
});

test("returns false for invalid colors", () => {
  expect(isColor("bluE")).toBe(false);
  expect(isColor("grEEn")).toBe(false);
  expect(isColor("Red")).toBe(false);
  expect(isColor("yellOW")).toBe(false);
  expect(isColor("pink")).toBe(false);
  expect(isColor("purple")).toBe(false);
  expect(isColor("white")).toBe(false);
  expect(isColor("black")).toBe(false);
});
