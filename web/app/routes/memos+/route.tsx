import { redirect, type ActionFunctionArgs } from "@remix-run/node";
import {
  Outlet,
  useFetcher,
  useLoaderData,
  useNavigate,
} from "@remix-run/react";
import { MemoId } from "~/shared/value-objects/memo-value-objects";
import { MemoViewModel } from "~/view/memo/memo-view-model";
import { createMemoRepository } from "~/shared/repositories/memo/memo-repository-factory";
import { MemoListItem } from "~/view/memo/components/MemoListItem";
import { createMemoUsecase } from "~/shared/usecases/memo/memo-usecase-factory";

export async function loader() {
  const memoRepository = createMemoRepository();
  const memos = await memoRepository.findAll();
  return {
    memos: memos.map((m) => m.toJSON()),
  };
}

export async function action({ request }: ActionFunctionArgs) {
  const memoUsecase = createMemoUsecase();
  const form = await request.formData();
  const method = request.method;

  if (method === "DELETE") {
    const id = new MemoId(Number(form.get("id")));
    await memoUsecase.deleteMemo(id);
    return redirect("/memos");
  }

  return redirect("/memos");
}

export default function MemosPage() {
  const data = useLoaderData<typeof loader>();
  const memos = data.memos.map((dto) => MemoViewModel.fromDTO(dto));

  const navigate = useNavigate();
  const fetcher = useFetcher();

  return (
    <div>
      <h1>メモ一覧</h1>
      <button
        className="bg-green-600 text-white px-4 py-2 mb-4"
        onClick={() => {
          navigate("new");
        }}
      >
        新規作成
      </button>
      <ul>
        {memos.map((item) => (
          <MemoListItem
            key={item.id.getValue()}
            item={item}
            onEdit={() => {
              navigate(`${item.id.getValue()}/edit`);
            }}
            onDelete={() => {
              navigate(`${item.id.getValue()}/delete`);
              fetcher.submit({
                method: "delete",
                action: `${item.id.getValue()}/delete`,
              });
            }}
          />
        ))}
      </ul>
      <Outlet />
    </div>
  );
}
