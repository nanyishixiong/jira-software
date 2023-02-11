import { List } from "./list";
import { SearchPanel } from "./search-panel";
import { useDebounce, useDocumentTitle } from "utils";
import styled from "@emotion/styled";
import { useProjects } from "utils/project";
import { useUsers } from "utils/user";
import { useProjectModal, useProjectsSearchParams } from "./utils";
import { ErrorBox, Row } from "components/lib";
import { ButtonNoPadding } from "components/button-no-padding";
import { useMemo, useState } from "react";

export const ProjectListScreen = () => {
  useDocumentTitle("项目列表", false);

  const [param, setParam] = useProjectsSearchParams();
  const { isLoading, error, data: list } = useProjects(useDebounce(param, 500));
  const { data: users } = useUsers();
  const { open } = useProjectModal();
  const [value, setValue] = useState("");

  const momeList = useMemo(() => {
    list?.map((item) => {
      item.key = item.id;
      return item;
    });
    return list;
  }, [list]);

  return (
    <Container>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <Row between={true}>
        <h1>项目列表</h1>
        <ButtonNoPadding onClick={open}>创建项目</ButtonNoPadding>
      </Row>
      <SearchPanel param={param} setParam={setParam} users={users || []} />
      <ErrorBox error={error} />
      <List dataSource={momeList} users={users || []} loading={isLoading} />
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
  width: 100%;
`;

// ProjectListScreen.whyDidYouRender = true;
