import { Dialog } from "@base-ui/react/dialog";
import { useRef, useState } from "react";
import styles from "./modal.module.css";
import type { AssetsJSON, TypeOfAsset } from "../../shared/types";
import { Scrollarea } from "../scrollarea/scrollarea";

type SelectedAsset = {
  url: string;
  name: string;
};

export function ExampleDialog({
  open,
  setOpen,
  imgRef,
  popUpRef,
  type,
  data,
  setType,
  selectedAsset,
  setSelectedAsset,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  imgRef: React.Ref<HTMLImageElement>;
  popUpRef: React.Ref<HTMLDivElement>;
  type: TypeOfAsset | null;
  data: AssetsJSON;
  setType: (type: TypeOfAsset | null) => void;
  selectedAsset: SelectedAsset | null;
  setSelectedAsset: (asset: SelectedAsset) => void;
}) {
  const curAsset = type ? data[type] : [];

  // ref на viewport Scrollarea
  const viewportRef = useRef<HTMLDivElement>(null);
  // ref на каждый asset
  const assetRefs = useRef<Record<string, HTMLDivElement | null>>({});
  // флаг первого открытия
  const [firstScrollDone, setFirstScrollDone] = useState(false);

  return (
    <Dialog.Root open={open}>
      <Dialog.Portal className={styles.Portal}>
        <Dialog.Backdrop className={styles.Backdrop} />
        <Dialog.Popup ref={popUpRef} className={styles.Popup}>
          <div className={styles.PopupBg} />

          <div className={styles.Actions}>
            <Dialog.Close
              className={styles.Button}
              onClick={() => {
                setOpen(false);
                setType(null);
                setFirstScrollDone(false); // сброс при закрытии
              }}
            >
              Close
            </Dialog.Close>
          </div>

          <div className={styles.Content}>
            <div className={styles.ContainerDescription}>
              <Dialog.Title className={styles.Title}>{type}</Dialog.Title>
              <div className={styles.Picture}>
                <img
                  key={selectedAsset?.url}
                  ref={imgRef}
                  src={selectedAsset?.url}
                  className={styles.Img}
                  style={{ imageRendering: "pixelated" }}
                />
              </div>
              <Dialog.Description className={styles.Description}>
                {selectedAsset?.name}
              </Dialog.Description>
            </div>

            <Scrollarea viewportRef={viewportRef}>
              <div className={styles.ContainerAssets}>
                {curAsset.map((asset) => (
                  <div
                    key={asset.name}
                    className={styles.Asset}
                    onClick={() => setSelectedAsset(asset)}
                    data-active={selectedAsset?.url === asset.url}
                    ref={(el) => {
                      assetRefs.current[asset.name] = el ?? null;

                      // 🔹 Прокрутка выбранного элемента один раз при открытии
                      if (
                        el &&
                        selectedAsset?.name === asset.name &&
                        open &&
                        !firstScrollDone
                      ) {
                        el.scrollIntoView({
                          behavior: "smooth",
                          block: "center",
                        });
                        setFirstScrollDone(true);
                      }
                    }}
                  >
                    <img src={asset.url} className={styles.ImgAsset} />
                    <p className={styles.Name}>{asset.name}</p>
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
