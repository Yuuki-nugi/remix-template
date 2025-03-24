import { MemoId, MemoText } from "~/shared/value-objects/memo-value-objects";

export class Memo {
  constructor(public readonly id: MemoId, public text: MemoText) {}

  toJSON() {
    return {
      id: this.id.getValue(),
      text: this.text.getValue(),
    };
  }

  updateText(newText: MemoText) {
    this.text = newText;
  }
}
