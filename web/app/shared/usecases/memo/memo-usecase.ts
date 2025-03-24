import { MemoDTO } from "../../dto/memo/memo-dto";
import { MemoId, MemoText } from "../../value-objects/memo-value-objects";

export interface MemoUsecase {
  createMemo(text: MemoText): Promise<MemoDTO>;
  updateMemo(id: MemoId, text: MemoText): Promise<MemoDTO>;
  deleteMemo(id: MemoId): Promise<void>;
}
