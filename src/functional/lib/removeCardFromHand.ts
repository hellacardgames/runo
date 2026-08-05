type Player = {
  readonly hand: readonly unknown[];
};

type Card<TPlayer extends Player> = TPlayer["hand"][number];

export function removeCardFromHand<TPlayer extends Player>(
  player: TPlayer,
  card: Card<TPlayer>,
): TPlayer {
  const cardIndex = player.hand.indexOf(card);

  if (cardIndex === -1) {
    throw new Error(`Card does not exist in hand.`);
  }

  return {
    ...player,
    hand: player.hand.filter((_, i) => i !== cardIndex),
  };
}
