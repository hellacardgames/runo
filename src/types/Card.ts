export type Card = NumberCard | DrawTwoCard | ReverseCard | SkipCard;

type NumberCard = {
  readonly id: string;
  readonly type: "number";
  readonly color: Color;
  readonly value: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
};

type DrawTwoCard = {
  readonly id: string;
  readonly type: "drawTwo";
  readonly color: Color;
  readonly value: 20;
};

type ReverseCard = {
  readonly id: string;
  readonly type: "reverse";
  readonly color: Color;
  readonly value: 20;
};

type SkipCard = {
  readonly id: string;
  readonly type: "skip";
  readonly color: Color;
  readonly value: 20;
};

type Color = "red" | "yellow" | "green" | "blue";
