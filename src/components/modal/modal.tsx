import { Dialog } from "@base-ui/react/dialog";
import styles from "./modal.module.css";
import type { AssetsJSON, TypeOfAsset } from "../../shared/types";
import { Scrollarea } from "../scrollarea/scrollarea";

export function ExampleDialog({
  open,
  setOpen,
  imgRef,
  popUpRef,
  type,
  data,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  imgRef: React.Ref<HTMLImageElement>;
  popUpRef: React.Ref<HTMLDivElement>;
  type: TypeOfAsset | null;
  data: AssetsJSON;
}) {
  const curAsset = data[type!];

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
          <div className={styles.PopupBg}></div>
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
            <Scrollarea>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                {curAsset &&
                  curAsset.map((asset) => (
                    <div>
                      {asset.name}
                      <img
                        src={asset.url}
                        alt=""
                        style={{ imageRendering: "pixelated" }}
                        width={32}
                        height={32}
                      />
                    </div>
                  ))}
              </div>
            </Scrollarea>
          </div>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
