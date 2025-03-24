import { MemoRepository } from "./memo-repository";
import { PrismaMemoRepository } from "../../../domains/memos/prisma-memo-repository";

export function createMemoRepository(): MemoRepository {
  return new PrismaMemoRepository();
}
