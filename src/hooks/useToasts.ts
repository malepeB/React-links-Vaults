import { useCallback, useRef, useState } from "react";

export interface Toast {
  id: number;
  message: string;
  kind: "success" | "error" | "info";
}

let counter = 0;

export function useToasts() {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const timers = useRef<Record<number, ReturnType<typeof setTimeout>>>({});

  const dismiss = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
    clearTimeout(timers.current[id]);
    delete timers.current[id];
  }, []);

  const push = useCallback(
    (message: string, kind: Toast["kind"] = "info") => {
      const id = ++counter;
      setToasts((prev) => [...prev, { id, message, kind }]);
      timers.current[id] = setTimeout(() => dismiss(id), 3200);
    },
    [dismiss]
  );

  return { toasts, push, dismiss };
}
