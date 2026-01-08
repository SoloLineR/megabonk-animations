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
  logoRefInModal,
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
  logoRefInModal: React.Ref<HTMLImageElement>;
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
              <svg
                fill="#000000"
                height="20px"
                width="20px"
                version="1.1"
                id="Capa_1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 460.775 460.775"
                xmlSpace="preserve"
              >
                <path
                  d="M285.08,230.397L456.218,59.27c6.076-6.077,6.076-15.911,0-21.986L423.511,4.565c-2.913-2.911-6.866-4.55-10.992-4.55
	c-4.127,0-8.08,1.639-10.993,4.55l-171.138,171.14L59.25,4.565c-2.913-2.911-6.866-4.55-10.993-4.55
	c-4.126,0-8.08,1.639-10.992,4.55L4.558,37.284c-6.077,6.075-6.077,15.909,0,21.986l171.138,171.128L4.575,401.505
	c-6.074,6.077-6.074,15.911,0,21.986l32.709,32.719c2.911,2.911,6.865,4.55,10.992,4.55c4.127,0,8.08-1.639,10.994-4.55
	l171.117-171.12l171.118,171.12c2.913,2.911,6.866,4.55,10.993,4.55c4.128,0,8.081-1.639,10.992-4.55l32.709-32.719
	c6.074-6.075,6.074-15.909,0-21.986L285.08,230.397z"
                />
              </svg>
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

            <img
              src="./assets/LogoNew.png"
              ref={logoRefInModal}
              className={styles.Logo}
              alt="logo"
            />

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
