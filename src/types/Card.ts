export type Card = NumberCard | DrawTwoCard | ReverseCard | SkipCard;

type NumberCard = {
  readonly type: "number";
  readonly color: Color;
  readonly value: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
};

type DrawTwoCard = {
  readonly type: "drawTwo";
  readonly color: Color;
  readonly value: 20;
};

type ReverseCard = {
  readonly type: "reverse";
  readonly color: Color;
  readonly value: 20;
};

type SkipCard = {
  readonly type: "skip";
  readonly color: Color;
  readonly value: 20;
};

type Color = "red" | "yellow" | "green" | "blue";
