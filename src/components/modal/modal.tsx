import { Dialog } from "@base-ui/react/dialog";
import styles from "./modal.module.css";

export function ExampleDialog({
  open,
  setOpen,
  imgRef,
  popUpRef,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  imgRef: React.Ref<HTMLImageElement>;
  popUpRef: React.Ref<HTMLDivElement>;
}) {
  return (
    <Dialog.Root open={open}>
      <Dialog.Portal className={styles.Portal}>
        <Dialog.Backdrop className={styles.Backdrop} />
        <Dialog.Popup ref={popUpRef} className={styles.Popup}>
          <div className={styles.Actions}>
            <Dialog.Close
              onClick={() => setOpen(false)}
              className={styles.Button}
            >
              Close
            </Dialog.Close>
          </div>
          <div className={styles.Content}>
            <div className={styles.ContainerDescription}>
              <Dialog.Title className={styles.Title}>
                Notifications
              </Dialog.Title>
              <img
                src="/assets/Dexecutioner.png"
                style={{ imageRendering: "pixelated" }}
                className={styles.Img}
                alt="dex"
                ref={imgRef}
              />
              <Dialog.Description className={styles.Description}>
                Dexecutioner. A piercing blade. Small chance to instantly
                execute an enemy.
              </Dialog.Description>
            </div>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
