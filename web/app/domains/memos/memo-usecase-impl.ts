import { MemoId, MemoText } from "~/shared/value-objects/memo-value-objects";
import { MemoRepository } from "../../shared/repositories/memo/memo-repository";
import { MemoTextValidator } from "./services/memo-text-validator";
import { MemoDTO } from "~/shared/dto/memo/memo-dto";
import { MemoDtoCreator } from "./dto-creator";
import { MemoUsecase } from "~/shared/usecases/memo/memo-usecase";

export class MemoUsecaseImpl implements MemoUsecase {
  constructor(private readonly memoRepository: MemoRepository) {}

  async createMemo(text: MemoText): Promise<MemoDTO> {
    const memoTextValidator = new MemoTextValidator(this.memoRepository);
    const isDuplicate = await memoTextValidator.isDuplicate(text);
    if (isDuplicate) {
      throw new Error("同じテキストのメモが既に存在します。");
    }
    const memo = await this.memoRepository.create(text);
    return MemoDtoCreator.createMemoDTO(memo);
  }

  async updateMemo(id: MemoId, text: MemoText): Promise<MemoDTO> {
    const memo = await this.memoRepository.update(id, text);
    return MemoDtoCreator.createMemoDTO(memo);
  }

  async deleteMemo(id: MemoId): Promise<void> {
    await this.memoRepository.delete(id);
  }
}
