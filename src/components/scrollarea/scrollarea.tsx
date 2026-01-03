import { ScrollArea } from "@base-ui/react/scroll-area";
import styles from "./scrollarea.module.css";

export const Scrollarea = ({
  children,
  viewportRef,
  onScroll,
}: {
  children: React.ReactNode;
  viewportRef?: React.Ref<HTMLDivElement>;
  onScroll?: () => void;
}) => {
  return (
    <ScrollArea.Root className={styles.ScrollArea}>
      <ScrollArea.Viewport
        className={styles.Viewport}
        ref={viewportRef}
        onScroll={onScroll}
      >
        <ScrollArea.Content className={styles.Content}>
          {children}
        </ScrollArea.Content>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar className={styles.Scrollbar}>
        <ScrollArea.Thumb className={styles.Thumb} />
      </ScrollArea.Scrollbar>
    </ScrollArea.Root>
  );
};
