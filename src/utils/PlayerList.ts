export class PlayerList<
  T extends { readonly id: string },
> implements Iterable<T> {
  #list: T[] = [];
  #reversed = false;
  #currentPlayerIndex = 0;

  get currentPlayer(): T | undefined {
    return this.#list[this.#currentPlayerIndex];
  }

  get isReversed(): boolean {
    return this.#reversed;
  }

  get length(): number {
    return this.#list.length;
  }

  getAt(index: number): T | undefined {
    return this.#list[index];
  }

  findById(id: string): T | undefined {
    return this.#list.find((p) => p.id === id);
  }

  add(player: T): void {
    this.#list.push(player);
  }

  changeDirection(): void {
    this.#reversed = !this.#reversed;
  }

  [Symbol.iterator](): Iterator<T> {
    return this.#list[Symbol.iterator]();
  }
}
