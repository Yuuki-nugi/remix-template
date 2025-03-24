import { MemoUsecase } from "~/shared/usecases/memo/memo-usecase";
import { createMemoRepository } from "../../repositories/memo/memo-repository-factory";
import { MemoUsecaseImpl } from "~/domains/memos/memo-usecase-impl";

export function createMemoUsecase(): MemoUsecase {
  const memoRepository = createMemoRepository();
  return new MemoUsecaseImpl(memoRepository);
}
