import { MemoId, MemoText } from "~/shared/value-objects/memo-value-objects";
import { Memo } from "./memo";

export interface MemoRepository {
  findAll(): Promise<Memo[]>;
  findById(id: MemoId): Promise<Memo | null>;
  create(text: MemoText): Promise<Memo>;
  update(id: MemoId, text: MemoText): Promise<Memo>;
  delete(id: MemoId): Promise<void>;
}
