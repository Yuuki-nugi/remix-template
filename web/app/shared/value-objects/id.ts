export class Id {
  constructor(private readonly value: number) {}

  getValue(): number {
    return this.value;
  }

  equals(other: Id): boolean {
    return this.value === other.value;
  }
}
