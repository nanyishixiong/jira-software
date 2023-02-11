import { User } from "../../types/User";
import { Dropdown, Modal, Table, TableProps } from "antd";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { Pin } from "components/pin";
import { useDeleteProject, useEditProject } from "utils/project";
import { ButtonNoPadding } from "components/button-no-padding";
import { useProjectModal, useProjectQueryKey } from "./utils";
import { Project } from "types/Project";
import React from "react";

interface ListProps extends TableProps<Project> {
  users: User[];
  refresh?: () => void;
}

// React.memo 传入一个组件,当props或者组件内使用到的全局状态发生改变(浅比较),才会刷新组件,否则跳过渲染复用最近一次的渲染结果. 适用于子组件需要进行昂贵的计算,减少父组件无关状态对子组件的影响.
// usememo 也是通过浅比较,记忆一个值,当依赖项发生改变,值才会变化
export const List = React.memo(({ users, ...props }: ListProps) => {
  console.log("list render");

  const { mutate } = useEditProject(useProjectQueryKey());

  /**
   * 原函数是这样:
   * pinProject = (pin: boolean) => mutate({ id: project.id, pin })
   * 这里函数两个参数获取时机不同, 可利用函数柯里化简化如下:
   */
  const pinProject = (id: number) => (pin: boolean) => mutate({ id, pin });

  return (
    <Table
      pagination={false}
      columns={[
        {
          title: <Pin checked={true} disabled={true} />,
          render(value, project) {
            return (
              <Pin
                checked={project.pin}
                onCheckedChange={pinProject(project.id)}
              />
            );
          },
        },
        {
          title: "名称",
          sorter: (a, b) => a.name.localeCompare(b.name),
          render(value, project) {
            return <Link to={project.id + ""}>{project.name}</Link>;
          },
        },
        {
          title: "部门",
          dataIndex: "organization",
        },
        {
          title: "负责人",
          render: function (value, project) {
            return (
              <span>
                {users.find((user: User) => user.id === project.personId)
                  ?.name || "未知"}
              </span>
            );
          },
        },
        {
          title: "创建时间",
          render(value, project) {
            return (
              <span>
                {project.created
                  ? dayjs(project.created).format("YYYY-MM-DD")
                  : "无"}
              </span>
            );
          },
        },
        {
          render(value, project) {
            return <More project={project} />;
          },
        },
      ]}
      {...props}
    />
  );
});

const More = ({ project }: { project: Project }) => {
  const { startEdit } = useProjectModal();
  const editProject = (id: number) => () => startEdit(id);
  const { mutate: deleteProject } = useDeleteProject(useProjectQueryKey());
  const confirmDeleteProject = (id: number) => {
    Modal.confirm({
      title: "确定删除这个项目吗?",
      content: "点击确定删除",
      okText: "确定",
      cancelText: "取消",
      onOk() {
        deleteProject({ id });
      },
    });
  };
  return (
    <Dropdown
      menu={{
        items: [
          {
            key: "edit",
            label: (
              <ButtonNoPadding onClick={editProject(project.id)}>
                编辑
              </ButtonNoPadding>
            ),
          },
          {
            key: "delete",
            label: (
              <ButtonNoPadding onClick={() => confirmDeleteProject(project.id)}>
                删除
              </ButtonNoPadding>
            ),
          },
        ],
      }}
    >
      <ButtonNoPadding> . . . </ButtonNoPadding>
    </Dropdown>
  );
};
