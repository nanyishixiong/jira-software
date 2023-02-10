import { Kanban } from "types/kanban";
import { useTasks } from "utils/task";
import { useTaskTypes } from "utils/task-type";
import {
  useKanbansQueryKey,
  useTasksModal,
  useTasksSearchParams,
} from "./util";
import taskIcon from "assets/task.svg";
import bugIcon from "assets/bug.svg";
import styled from "@emotion/styled";
import { Card, Dropdown, Modal } from "antd";
import { CreateTask } from "./create-task";
import { Task } from "types/task";
import { Mark } from "components/mark";
import { useDeleteKanban } from "utils/kanban";
import { ButtonNoPadding } from "components/button-no-padding";
import { Row } from "components/lib";
import React from "react";
import { Drag, Drop, DropChild } from "components/drag-and-drop";

const TaskTypeIcon = ({ id }: { id: number }) => {
  const { data: taskTypes } = useTaskTypes();
  const name = taskTypes?.find((taskType) => taskType.id === id)?.name;
  if (!name) return null;
  return (
    <img
      src={name === "task" ? taskIcon : bugIcon}
      alt="task-icon"
      style={{ width: "1.6rem" }}
    />
  );
};

const TaskCard = React.forwardRef<HTMLDivElement, { task: Task }>(
  ({ task, ...props }, ref) => {
    const { startEdit } = useTasksModal();
    const { name: keyword } = useTasksSearchParams();
    return (
      <Card
        onClick={() => startEdit(task.id)}
        style={{ marginBottom: "0.5rem", cursor: "pointer" }}
        key={task.id}
        ref={ref}
        {...props}
      >
        <div>
          <Mark keyword={keyword} name={task.name} />
        </div>
        <TaskTypeIcon id={task.typeId} />
      </Card>
    );
  }
);

export const KanbanColumn = React.forwardRef<
  HTMLDivElement,
  { kanban: Kanban }
>(({ kanban, ...props }, ref) => {
  const { data: allTasks } = useTasks(useTasksSearchParams());
  const tasks = allTasks?.filter((task) => task.kanbanId === kanban.id);

  return (
    <Container ref={ref} {...props}>
      <Row between={true}>
        <h3>{kanban.name}</h3>
        <More kanban={kanban} key={kanban.id} />
      </Row>
      <TasksContainer>
        <Drop
          type={"ROW"}
          direction={"vertical"}
          droppableId={String(kanban.id)}
        >
          <DropChild style={{ minHeight: "5px" }}>
            {tasks?.map((task, taskIndex) => (
              <Drag
                draggableId={"task" + task.id}
                index={taskIndex}
                key={task.id}
              >
                <TaskCard task={task} key={task.id} />
              </Drag>
            ))}
          </DropChild>
        </Drop>
        <CreateTask kanbanId={kanban.id} />
      </TasksContainer>
    </Container>
  );
});

const More = ({ kanban }: { kanban: Kanban }) => {
  const { mutateAsync } = useDeleteKanban(useKanbansQueryKey());
  const startEdit = () => {
    Modal.confirm({
      okText: "确定",
      cancelText: "取消",
      title: "确定删除看板吗?",
      onOk() {
        mutateAsync({ id: kanban.id });
      },
    });
  };
  return (
    <Dropdown
      menu={{
        items: [
          {
            key: "delete",
            label: <ButtonNoPadding onClick={startEdit}>删除</ButtonNoPadding>,
          },
        ],
      }}
    >
      <ButtonNoPadding>...</ButtonNoPadding>
    </Dropdown>
  );
};

export const Container = styled.div`
  min-width: 27rem;
  border-radius: 6px;
  background-color: rgb(244, 245, 247);
  display: flex;
  flex-direction: column;
  padding: 0.7rem 0.7rem 1rem;
  margin-right: 1.5rem;
`;

const TasksContainer = styled.div`
  overflow: scroll;
  flex: 1;
  ::-webkit-scrollbar {
    display: none;
  }
`;
