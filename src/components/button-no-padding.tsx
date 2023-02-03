import { Button, ButtonProps } from "antd";

export const ButtonNoPadding = (props: ButtonProps) => {
  const { type, children, style, ...result } = props;
  return (
    <Button
      type={type || "link"}
      style={{
        padding: 0,
        ...style,
      }}
      {...result}
    >
      {children}
    </Button>
  );
};
