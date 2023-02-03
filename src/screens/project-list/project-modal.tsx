import { Drawer } from "antd";

export const ProjectModal = (props: {
  projectModalOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <Drawer open={props.projectModalOpen} width={"100%"}>
      <h1>Project Modal</h1>
      <button onClick={props.onClose}>关闭</button>
    </Drawer>
  );
};
