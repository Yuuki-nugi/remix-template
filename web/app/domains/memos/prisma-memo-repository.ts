import { prisma } from "~/shared/lib/prisma";
import { Memo } from "./memo";
import { MemoRepository } from "./memo-repository";
import { MemoId, MemoText } from "~/shared/value-objects/memo-value-objects";

export class PrismaMemoRepository implements MemoRepository {
  async findAll(): Promise<Memo[]> {
    const memos = await prisma.memo.findMany();
    return memos.map(
      (memo) => new Memo(new MemoId(memo.id), new MemoText(memo.text))
    );
  }

  async findById(id: MemoId): Promise<Memo | null> {
    const memo = await prisma.memo.findUnique({ where: { id: id.getValue() } });
    if (!memo) {
      return null;
    }
    return new Memo(new MemoId(memo.id), new MemoText(memo.text));
  }

  async create(text: MemoText): Promise<Memo> {
    const memo = await prisma.memo.create({ data: { text: text.getValue() } });
    return new Memo(new MemoId(memo.id), new MemoText(memo.text));
  }

  async update(id: MemoId, text: MemoText): Promise<Memo> {
    const memo = await prisma.memo.update({
      where: { id: id.getValue() },
      data: { text: text.getValue() },
    });
    return new Memo(new MemoId(memo.id), new MemoText(memo.text));
  }

  async delete(id: MemoId): Promise<void> {
    await prisma.memo.delete({ where: { id: id.getValue() } });
  }
}
