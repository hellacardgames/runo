type Player = { readonly hand: readonly unknown[] };

type Card<TPlayer extends Player> = TPlayer["hand"][number];

export function addCardToHand<TPlayer extends Player>(
  player: TPlayer,
  card: Card<TPlayer>,
): TPlayer {
  return { ...player, hand: [...player.hand, card] };
}
