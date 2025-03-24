import { MemoDTO } from "~/shared/dto/memo/memo-dto";
import { Memo } from "./memo";

export class MemoDtoCreator {
  static createMemoDTO(memoModel: Memo): MemoDTO {
    return {
      id: memoModel.id.getValue(),
      text: memoModel.text.getValue(),
    };
  }
}
