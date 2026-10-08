import { useCallback, useEffect, useRef, useState } from "react";
import type { ContentItem } from "../data/content";

export function useWorkDialog() {
  const [selected, setSelected] = useState<ContentItem | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const close = useCallback(() => {
    dialog.current?.querySelector("video")?.pause();
    if (dialog.current?.open) dialog.current.close();
    setSelected(null);
  }, []);

  useEffect(() => {
    if (!selected) return;
    const element = dialog.current;
    const previousOverflow = document.body.style.overflow;
    if (element && !element.open) element.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      if (element?.open) element.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [selected]);

  return { selected, setSelected, dialog, close };
}
