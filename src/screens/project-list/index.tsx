import { List } from "./list";
import { SearchPanel } from "./search-panel";
import { useDebounce, useDocumentTitle } from "utils";
import styled from "@emotion/styled";
import { Typography } from "antd";
import { useProject } from "utils/project";
import { useUser } from "utils/user";
import { useProjectModal, useProjectsSearchParams } from "./utils";
import { Row } from "components/lib";
import { ButtonNoPadding } from "components/button-no-padding";

export const ProjectListScreen = () => {
  useDocumentTitle("项目列表", false);

  const [param, setParam] = useProjectsSearchParams();
  const {
    isLoading,
    error,
    data: list,
    retry,
  } = useProject(useDebounce(param, 500));
  const { data: users } = useUser();
  const { open } = useProjectModal();

  return (
    <Container>
      <Row between={true}>
        <h1>项目列表</h1>
        <ButtonNoPadding onClick={open}>创建项目</ButtonNoPadding>
      </Row>
      <SearchPanel param={param} setParam={setParam} users={users || []} />
      {error ? (
        <Typography.Text type="danger">{error.message}</Typography.Text>
      ) : null}
      <List
        dataSource={list?.map((item) => {
          item.key = item.id;
          return item;
        })}
        users={users || []}
        loading={isLoading}
        refresh={retry}
      />
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;

ProjectListScreen.whyDidYouRender = true;
