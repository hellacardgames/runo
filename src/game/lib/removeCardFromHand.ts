import { removeItem } from "@hellacardgames/lib";

type Player = {
  readonly hand: readonly unknown[];
};

type Card<TPlayer extends Player> = TPlayer["hand"][number];

export function removeCardFromHand<TPlayer extends Player>(
  player: TPlayer,
  card: Card<TPlayer>,
): TPlayer {
  return {
    ...player,
    hand: removeItem(player.hand, card),
  };
}
