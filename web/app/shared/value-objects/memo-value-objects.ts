import { Id } from "./id";

export class MemoId extends Id {
  constructor(value: number) {
    super(value);
  }
}

export class MemoText {
  constructor(private readonly value: string) {
    if (value.length > 100) {
      throw new Error("テキストは100文字以内で入力してください。");
    }

    if (value.length === 0) {
      throw new Error("テキストは空文字列では入力できません。");
    }
  }

  getValue(): string {
    return this.value;
  }
}
