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
          <Dialog.Title className={styles.Title}>Notifications</Dialog.Title>
          <Dialog.Description className={styles.Description}>
            <img
              src="/assets/Dexecutioner.png"
              style={{ imageRendering: "pixelated" }}
              className={styles.Img}
              width={200}
              height={200}
              alt="dex"
              ref={imgRef}
            />
          </Dialog.Description>
          <div className={styles.Actions}>
            <Dialog.Close
              onClick={() => setOpen(false)}
              className={styles.Button}
            >
              Close
            </Dialog.Close>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
