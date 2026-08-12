export type Card = NumberCard | DrawTwoCard | ReverseCard | SkipCard | WildCard;

export type NumberCard = {
  readonly id: string;
  readonly type: "number";
  readonly color: Color;
  readonly value: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
};

export type DrawTwoCard = {
  readonly id: string;
  readonly type: "drawTwo";
  readonly color: Color;
};

export type ReverseCard = {
  readonly id: string;
  readonly type: "reverse";
  readonly color: Color;
};

export type SkipCard = {
  readonly id: string;
  readonly type: "skip";
  readonly color: Color;
};

export type WildCard = {
  readonly id: string;
  readonly type: "wild";
  readonly isDrawFour: boolean;
};

export type DiscardedCard =
  NumberCard | DrawTwoCard | ReverseCard | SkipCard | DiscardedWildCard;

type DiscardedWildCard = {
  readonly type: "discardedWild";
  readonly card: WildCard;
  readonly color: Color;
};

export type Color = "red" | "yellow" | "green" | "blue";
