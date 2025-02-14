import { type RouteConfig, index, prefix, route, layout } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),

  ...prefix("task", [
    layout("layouts/TaskLayout.tsx", [
      // index(""),
      route("add", "routes/showAddForm.tsx"),
      route("list", "routes/showTasks.tsx"),
      route("update/:id", "routes/showTaskCard.tsx")
    ]),
  ])
] satisfies RouteConfig;
