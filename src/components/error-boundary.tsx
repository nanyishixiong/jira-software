import React, { Component, ReactNode } from "react";

type FallbackRender = (props: { error: Error | null }) => React.ReactElement;
// PropsWithChildren React 定义的utils type 生成一个带自定义属性的类型
export class ErrorBoundary extends Component<
  React.PropsWithChildren<{ fallbackRender: FallbackRender }>,
  { error: Error | null }
> {
  state = {
    error: null,
  };
  // 子组件抛出异常，该函数返回的error更新state
  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  render() {
    const { error } = this.state;
    const { fallbackRender, children } = this.props;
    if (error) {
      return fallbackRender({ error });
    }
    return children;
  }
}
