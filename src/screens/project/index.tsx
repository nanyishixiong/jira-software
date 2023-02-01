import { Link } from "react-router-dom";
import { Routes, Route, Navigate } from "react-router";
import { KanbanScreen } from "screens/kanban";
import { EpicScreen } from "screens/epic";

export const ProjectScreen = () => {
  return (
    <>
      <h1>ProjectScreen</h1>
      {/* to={'/kanban'} 如果在路由前加斜杠，就表示从根路由开始，而不是在当前路由开始*/}
      <Link to={"kanban"}>看板</Link>
      <Link to={"epic"}>任务组</Link>
      <Routes>
        <Route path="/kanban" element={<KanbanScreen />} />
        <Route path="/epic" element={<EpicScreen />} />
        <Route
          path="*"
          element={<Navigate to={window.location.pathname + "/kanban"} />}
        />
      </Routes>
    </>
  );
};
