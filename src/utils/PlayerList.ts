export class PlayerList<T> implements Iterable<T> {
  #list: T[] = [];
  #reversed = false;
  #currentPlayerIndex = 0;

  get currentPlayer(): T | undefined {
    return this.#list[this.#currentPlayerIndex];
  }

  set currentPlayer(player: T) {
    const index = this.#list.indexOf(player);
    if (index === -1) {
      throw new Error("Player not found.");
    }
    this.#currentPlayerIndex = index;
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

  find(predicate: (player: T) => boolean): T | undefined {
    return this.#list.find(predicate);
  }

  map<U>(fn: (player: T, index: number) => U): U[] {
    return this.#list.map(fn);
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
