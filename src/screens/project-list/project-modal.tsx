import { Drawer } from "antd";
import { useProjectModal } from "./utils";

export const ProjectModal = () => {
  const { projectModalOpen, close } = useProjectModal();
  return (
    <Drawer open={projectModalOpen} width={"100%"} onClose={close}>
      <h1>Project Modal</h1>
      <button onClick={close}>关闭</button>
    </Drawer>
  );
};
