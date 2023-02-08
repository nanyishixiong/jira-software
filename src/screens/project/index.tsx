import { Link } from "react-router-dom";
import { Routes, Route, Navigate, useLocation } from "react-router";
import { KanbanScreen } from "screens/kanban";
import { EpicScreen } from "screens/epic";
import styled from "@emotion/styled";
import { Menu } from "antd";

const useRouteType = () => {
  const units = useLocation().pathname.split("/");
  return units[units.length - 1];
};

export const ProjectScreen = () => {
  const routeType = useRouteType();
  return (
    <Container>
      <Aside>
        <Menu
          // mode="inline"
          style={{ width: "100%" }}
          selectedKeys={[routeType]}
          items={[
            {
              key: "kanban",
              //  to={'/kanban'} 如果在路由前加斜杠，就表示从根路由开始，而不是在当前路由开始
              label: <Link to={"kanban"}>看板</Link>,
            },
            {
              key: "epic",
              label: <Link to={"epic"}>任务组</Link>,
            },
          ]}
        />
      </Aside>
      <Main>
        <Routes>
          <Route path="/kanban" element={<KanbanScreen />} />
          <Route path="/epic" element={<EpicScreen />} />
          <Route
            path="*"
            element={
              <Navigate
                to={window.location.pathname + "/kanban"}
                replace={true}
              />
            }
          />
        </Routes>
      </Main>
    </Container>
  );
};

const Aside = styled.aside`
  background-color: rgb(244, 245, 247);
  display: flex;
`;
const Main = styled.main`
  display: flex;
  box-shadow: -5px 0 5px -5px rgba(0, 0, 0, 0.1);
`;
const Container = styled.div`
  display: grid;
  grid-template-columns: 16rem 1fr;
`;
