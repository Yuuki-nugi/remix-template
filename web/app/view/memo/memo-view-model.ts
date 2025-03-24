import { MemoDTO } from "~/shared/dto/memo/memo-dto";
import { MemoId, MemoText } from "~/shared/value-objects/memo-value-objects";

export class MemoViewModel {
  constructor(
    public readonly id: MemoId,
    private _text: MemoText,
    public isEditing: boolean = false
  ) {}

  get text(): MemoText {
    return this._text;
  }

  set text(value: MemoText) {
    this._text = value;
  }

  static fromDTO(dto: MemoDTO): MemoViewModel {
    return new MemoViewModel(new MemoId(dto.id), new MemoText(dto.text));
  }

  toDTO(): MemoDTO {
    return { id: this.id.getValue(), text: this.text.getValue() };
  }
}
