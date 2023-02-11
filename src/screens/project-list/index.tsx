import { List } from "./list";
import { SearchPanel } from "./search-panel";
import { useDebounce, useDocumentTitle } from "utils";
import { useProjects } from "utils/project";
import { useUsers } from "utils/user";
import { useProjectModal, useProjectsSearchParams } from "./utils";
import { ErrorBox, Row, ScreenContainer } from "components/lib";
import { ButtonNoPadding } from "components/button-no-padding";
import { useMemo, useState } from "react";
import { Profiler } from "components/profiler";

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
    <Profiler id="项目列表">
      <ScreenContainer>
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
      </ScreenContainer>
    </Profiler>
  );
};

// ProjectListScreen.whyDidYouRender = true;
