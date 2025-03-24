import { Form } from "@remix-run/react";
import { MemoViewModel } from "../memo-view-model";
import { MemoId } from "~/shared/value-objects/memo-value-objects";

type Props = {
  item: MemoViewModel;
  onEdit: (id: MemoId) => void;
};

export function MemoListItem({ item, onEdit }: Props) {
  return (
    <li className="mb-2">
      <span className="mr-4">{item.text.getValue()}</span>
      <button
        className="bg-blue-500 text-white px-2 py-1 mr-2"
        onClick={() => onEdit(item.id)}
      >
        編集
      </button>
      <Form method="post" className="inline">
        <input type="hidden" name="id" value={item.id.getValue()} />
        <button
          type="submit"
          name="_intent"
          value="delete"
          className="bg-red-500 text-white px-2 py-1"
        >
          削除
        </button>
      </Form>
    </li>
  );
}
