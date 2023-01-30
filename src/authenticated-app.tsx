import { useAuth } from "context/auth-context";
import { ProjectListScreen } from "screens/project-list";
import { Button } from "antd";
import styled from "@emotion/styled";

/**
 * grid 和 flex 各自的应用场景
 * 1. 要考虑，是一维布局，还是二维布局
 * 一般来说，一维布局用flex，二维布局用grid
 * 2. 看从内容出发还是布局出发？
 * 从内容出发：有一组内容（数量一般不固定），希望均匀分布在容器中，由内容自己的大小决定占据的空间
 * 从布局出发：先规划网格（数量一般比较固定），然后再填充元素
 * 从内容出发用flex
 * 从布局出发用grid
 */

export const AuthenticatedApp = () => {
  const { logout } = useAuth();
  return (
    <Container>
      <Header>
        <HeaderLeft>
          <h3>logo</h3>
          <h3>项目</h3>
          <h3>用户</h3>
        </HeaderLeft>
        <HeaderRight>
          <Button onClick={logout}>登出</Button>
        </HeaderRight>
      </Header>
      <Main>
        <ProjectListScreen />
      </Main>
    </Container>
  );
};

const Header = styled.header`
  grid-area: header;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
`;

const HeaderRight = styled.div``;

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr 6rem;
  grid-template-areas:
    "header"
    "main";
  height: 100vh;
`;

const Main = styled.main`
  grid-area: main;
  height: calc(100vh - 6rem);
`;
