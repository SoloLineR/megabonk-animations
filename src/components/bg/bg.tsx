import data from "../../../assets.json";
import { useRef, useState } from "react";
import { useHover } from "../../shared/context/HoverContext";
import "./bg.css";
import { ExampleDialog } from "../modal/modal";
import { HeroMenu } from "../hero-menu/hero-menu";
import type { TypeOfAsset } from "../../shared/types";

type SelectedAsset = { url: string; name: string };

// Типы ассетов
const assetTypes: TypeOfAsset[] = ["Characters", "Weapons", "Items", "Tomes"];

export const Bg = () => {
  const { hoveredItem } = useHover();

  const [open, setOpen] = useState(false);
  const [type, setType] = useState<TypeOfAsset | null>(null);
  const [selectedAsset, setSelectedAsset] = useState<SelectedAsset | null>(
    null
  );

  const imgRefs = useRef<Record<string, HTMLImageElement | null>>({});
  const imgInsideModalRef = useRef<HTMLImageElement | null>(null);
  const popUpRef = useRef<HTMLDivElement | null>(null);
  const logoInModalRef = useRef<HTMLImageElement | null>(null);
  const logoInMenuRef = useRef<HTMLImageElement | null>(null);

  // 🔹 Генерация случайных фоновых картинок один раз при монтировании
  const [images] = useState(() => {
    return assetTypes.map((type, i) => {
      const assets = data[type];
      const randomAsset = assets[Math.floor(Math.random() * assets.length)];
      return {
        src: randomAsset.url,
        left: ["0dvw", "70dvw", "15dvw", "60dvw"][i],
        top: ["10dvh", "20dvh", "60dvh", "85dvh"][i],
        type,
        asset: randomAsset, // сохраняем объект для модалки
      };
    });
  });

  const handleClick = (type: TypeOfAsset) => {
    const curRef = imgRefs.current[type];
    const bgImageObj = images.find((img) => img.type === type);
    const matchedAsset = bgImageObj?.asset || data[type][0];

    const outsideModalRefLogo = logoInMenuRef.current;

    setSelectedAsset(matchedAsset);
    setType(type);
    setOpen(true);

    if (!curRef || !outsideModalRefLogo) return;

    const outsideModalBoundingRectLogo =
      outsideModalRefLogo.getBoundingClientRect();

    const outsideELBoundingRect = curRef.getBoundingClientRect();

    requestAnimationFrame(() => {
      const insideRect = imgInsideModalRef.current?.getBoundingClientRect();
      const popupRect = popUpRef.current?.getBoundingClientRect();
      const insideModalBoundingRectLogo =
        logoInModalRef.current?.getBoundingClientRect();

      if (
        !insideRect ||
        !popupRect ||
        !imgInsideModalRef.current ||
        !insideModalBoundingRectLogo ||
        !logoInModalRef.current
      )
        return;

      const dx = outsideELBoundingRect.left - insideRect.left;
      const dy = outsideELBoundingRect.top - insideRect.top;
      const dw = outsideELBoundingRect.width / insideRect.width;
      const dh = outsideELBoundingRect.height / insideRect.height;

      imgInsideModalRef.current.style.setProperty("--dx", dx.toString());
      imgInsideModalRef.current.style.setProperty("--dy", dy.toString());
      imgInsideModalRef.current.style.setProperty("--dw", dw.toString());
      imgInsideModalRef.current.style.setProperty("--dh", dh.toString());

      const dxPopup = outsideELBoundingRect.left - popupRect.left;
      const dyPopup = outsideELBoundingRect.top - popupRect.top;
      const dwPopup = outsideELBoundingRect.width / popupRect.width;
      const dhPopup = outsideELBoundingRect.height / popupRect.height;

      popUpRef.current?.style.setProperty("--dx", dxPopup.toString());
      popUpRef.current?.style.setProperty("--dy", dyPopup.toString());
      popUpRef.current?.style.setProperty("--dw", dwPopup.toString());
      popUpRef.current?.style.setProperty("--dh", dhPopup.toString());

      const dxLogoModal =
        outsideModalBoundingRectLogo.left - insideModalBoundingRectLogo.left;
      const dyLogoModal =
        outsideModalBoundingRectLogo.top - insideModalBoundingRectLogo.top;
      const dwLogoModal =
        outsideModalBoundingRectLogo.width / insideModalBoundingRectLogo.width;
      const dhLogoModal =
        outsideModalBoundingRectLogo.height /
        insideModalBoundingRectLogo.height;

      logoInModalRef.current!.style.setProperty(
        "--dxl",
        dxLogoModal.toString()
      );
      logoInModalRef.current!.style.setProperty(
        "--dyl",
        dyLogoModal.toString()
      );
      logoInModalRef.current!.style.setProperty(
        "--dwl",
        dwLogoModal.toString()
      );
      logoInModalRef.current!.style.setProperty(
        "--dhl",
        dhLogoModal.toString()
      );

      imgInsideModalRef.current!.dataset.flip = "invert";
      popUpRef.current!.dataset.flip = "invert";
      logoInModalRef.current!.dataset.flip = "invert";

      requestAnimationFrame(() => {
        imgInsideModalRef.current!.dataset.flip = "play";
        popUpRef.current!.dataset.flip = "play";
        logoInModalRef.current!.dataset.flip = "play";
      });
    });
  };

  return (
    <div className="bg" data-hovered={hoveredItem}>
      <div
        className="bg-track"
        data-hovered={hoveredItem}
        data-open-menu={open}
      >
        {images.map((img, i) => (
          <div
            key={i}
            className="bg-img-wrapper"
            data-hovered={hoveredItem}
            data-matched={hoveredItem === img.type ? "true" : "false"}
            style={
              {
                "--translate-x": img.left,
                "--translate-y": img.top,
                "--idx": i,
              } as React.CSSProperties
            }
          >
            <img
              src={img.src}
              className="bg-img"
              ref={(el) => {
                imgRefs.current[img.type] = el;
              }}
            />
          </div>
        ))}
      </div>

      <HeroMenu logoRefInMenu={logoInMenuRef} handleClick={handleClick} />

      <ExampleDialog
        open={open}
        setOpen={setOpen}
        type={type}
        data={data}
        setType={setType}
        imgRef={imgInsideModalRef}
        popUpRef={popUpRef}
        selectedAsset={selectedAsset}
        setSelectedAsset={setSelectedAsset}
        logoRefInModal={logoInModalRef}
      />
    </div>
  );
};
