import { useCallback, useState } from "react";

export const useUndo = <T>(initialPresent: T) => {
  const [state, setState] = useState<{
    past: T[];
    present: T;
    future: T[];
  }>({
    past: [],
    present: initialPresent,
    future: [],
  });

  const canUndo = state.past.length !== 0;
  const canRedo = state.future.length !== 0;

  const undo = useCallback(() => {
    setState((prestate) => {
      const { past, present, future } = prestate;
      if (past.length === 0) return prestate;

      const previous = past[past.length - 1];
      const newPast = past.slice(0, past.length - 1);
      return {
        past: newPast,
        present: previous,
        future: [present, ...future],
      };
    });
  }, []);

  const redo = useCallback(() => {
    setState((prestate) => {
      const { past, future } = prestate;
      if (future.length === 0) return prestate;

      const next = future[0];
      const newFuture = future.slice(1);
      return {
        past: [...past, next],
        present: next,
        future: newFuture,
      };
    });
  }, []);

  const set = useCallback((newPresent: T) => {
    setState((prestate) => {
      const { past, present } = prestate;
      if (newPresent === present) return prestate;
      return {
        past: [...past, present],
        present: newPresent,
        future: [],
      };
    });
  }, []);

  const reset = useCallback((newPresent: T) => {
    setState(() => {
      return {
        past: [],
        present: newPresent,
        future: [],
      };
    });
  }, []);

  return [state, { undo, redo, set, reset, canUndo, canRedo }];
};
