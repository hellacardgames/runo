import type { Color } from "../types/Card.js";

export function isColor(color: string): color is Color {
  return ["blue", "green", "red", "yellow"].includes(color);
}
