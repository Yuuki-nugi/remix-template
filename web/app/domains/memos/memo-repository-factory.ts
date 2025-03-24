import { MemoRepository } from "./memo-repository";
import { PrismaMemoRepository } from "./prisma-memo-repository";

export function createMemoRepository(): MemoRepository {
  return new PrismaMemoRepository();
}
