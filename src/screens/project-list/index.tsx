import { List } from "./list";
import { SearchPanel } from "./search-panel";
import { useDebounce, useDocumentTitle } from "utils";
import styled from "@emotion/styled";
import { useProjects } from "utils/project";
import { useUser } from "utils/user";
import { useProjectModal, useProjectsSearchParams } from "./utils";
import { ErrorBox, Row } from "components/lib";
import { ButtonNoPadding } from "components/button-no-padding";

export const ProjectListScreen = () => {
  useDocumentTitle("项目列表", false);

  const [param, setParam] = useProjectsSearchParams();
  const { isLoading, error, data: list } = useProjects(useDebounce(param, 500));
  const { data: users } = useUser();
  const { open } = useProjectModal();

  return (
    <Container>
      <Row between={true}>
        <h1>项目列表</h1>
        <ButtonNoPadding onClick={open}>创建项目</ButtonNoPadding>
      </Row>
      <SearchPanel param={param} setParam={setParam} users={users || []} />
      <ErrorBox error={error} />
      <List
        dataSource={list?.map((item) => {
          item.key = item.id;
          return item;
        })}
        users={users || []}
        loading={isLoading}
      />
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
  width: 100%;
`;

// ProjectListScreen.whyDidYouRender = true;
