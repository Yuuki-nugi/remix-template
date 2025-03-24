import { MemoText } from "../memo";
import { MemoRepository } from "../../../shared/repositories/memo/memo-repository";

export class MemoTextValidator {
  constructor(private readonly memoRepository: MemoRepository) {}

  async isDuplicate(text: MemoText): Promise<boolean> {
    const memos = await this.memoRepository.findAll();
    return memos.some((memo) => memo.text === text);
  }
}
