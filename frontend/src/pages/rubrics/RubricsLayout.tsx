import { Outlet } from "react-router-dom";

export default function RubricsLayout() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-foreground"> Rubrics</h1>
        <p className="text-muted-foreground">
          Manage and organize healthcare LLM evaluation rubrics
        </p>
      </div>
      <Outlet />
    </div>
  );
}