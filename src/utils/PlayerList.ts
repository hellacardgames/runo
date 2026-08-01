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

  remove(player: T): void {
    const index = this.#list.indexOf(player);
    if (index === -1) {
      return;
    }
    if (index === this.#currentPlayerIndex) {
      this.advance();
    }
    this.#list.splice(index, 1);
    if (this.#currentPlayerIndex > index) {
      this.#currentPlayerIndex--;
    }
  }

  advance(): void {
    if (this.#list.length === 0) {
      return;
    }
    const step = this.#reversed ? -1 : 1;
    const rawIndex = this.#currentPlayerIndex + step;
    const wrappedIndex = (rawIndex + this.#list.length) % this.#list.length;
    this.#currentPlayerIndex = wrappedIndex;
  }

  changeDirection(): void {
    this.#reversed = !this.#reversed;
  }

  [Symbol.iterator](): Iterator<T> {
    return this.#list[Symbol.iterator]();
  }
}
