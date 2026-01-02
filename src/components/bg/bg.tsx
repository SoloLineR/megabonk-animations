import data from "../../../assets.json";
import { useRef, useState } from "react";
import { useHover } from "../../shared/context/HoverContext";
import "./bg.css";
import { ExampleDialog } from "../modal/modal";
import { HeroMenu } from "../hero-menu/hero-menu";
import type { TypeOfAsset } from "../../shared/types";

const images = [
  {
    src: "/assets/_0011_Amog.png",
    left: "0dvw",
    top: "10dvh",
    type: "Characters",
  },
  {
    src: "/assets/Dexecutioner.png",
    left: "70dvw",
    top: "20dvh",
    type: "Weapons",
  },
  {
    src: "/assets/ItemSoulHarvester.png",
    left: "15dvw",
    top: "60dvh",
    type: "Items",
  },
  { src: "/assets/LuckTome.png", left: "60dvw", top: "85dvh", type: "Tomes" },
];

export const Bg = () => {
  const { hoveredItem } = useHover();
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<TypeOfAsset | null>(null);
  const imgRefs = useRef<Record<string, HTMLImageElement | null>>({});
  const imgInsideModalRef = useRef<HTMLImageElement | null>(null);
  const popUpRef = useRef<HTMLDivElement | null>(null);

  const handleClick = (type: TypeOfAsset) => {
    const curRef = imgRefs.current[type]!;

    const outsideELBoundingRect = curRef.getBoundingClientRect();
    setOpen(true);
    setType(type);
    requestAnimationFrame(() => {
      const inSideELBoundingRect =
        imgInsideModalRef.current?.getBoundingClientRect();
      if (
        imgInsideModalRef.current &&
        inSideELBoundingRect &&
        outsideELBoundingRect &&
        popUpRef.current
      ) {
        const deltaX = outsideELBoundingRect.left - inSideELBoundingRect.left;
        const deltaY = outsideELBoundingRect.top - inSideELBoundingRect.top;
        const deltaW = outsideELBoundingRect.width / inSideELBoundingRect.width;
        const deltaH =
          outsideELBoundingRect.height / inSideELBoundingRect.height;

        imgInsideModalRef.current.style.setProperty("--dx", deltaX.toString());
        imgInsideModalRef.current.style.setProperty("--dy", deltaY.toString());
        imgInsideModalRef.current.style.setProperty("--dw", deltaW.toString());
        imgInsideModalRef.current.style.setProperty("--dh", deltaH.toString());

        const deltaXpopUp =
          outsideELBoundingRect.left -
          popUpRef.current.getBoundingClientRect().left;
        const deltaYpopUp =
          outsideELBoundingRect.top -
          popUpRef.current.getBoundingClientRect().top;
        const deltaWpopUp =
          outsideELBoundingRect.width /
          popUpRef.current.getBoundingClientRect().width;
        const deltaHpopUp =
          outsideELBoundingRect.height /
          popUpRef.current.getBoundingClientRect().height;

        popUpRef.current.style.setProperty("--dx", deltaXpopUp.toString());
        popUpRef.current.style.setProperty("--dy", deltaYpopUp.toString());
        popUpRef.current.style.setProperty("--dw", deltaWpopUp.toString());
        popUpRef.current.style.setProperty("--dh", deltaHpopUp.toString());

        imgInsideModalRef.current.dataset.flip = "invert";
        popUpRef.current.dataset.flip = "invert";

        requestAnimationFrame(() => {
          if (imgInsideModalRef.current && popUpRef.current) {
            imgInsideModalRef.current.dataset.flip = "play";
            popUpRef.current.dataset.flip = "play";
          }
        });
      }
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
              data-type={img.type}
              ref={(el) => {
                imgRefs.current[img.type] = el;
              }}
              data-hovered={hoveredItem}
              data-matched={hoveredItem === img.type ? "true" : "false"}
              style={
                {
                  "--translate-x": img.left,
                  "--translate-y": img.top,
                  "--idx": i,
                } as React.CSSProperties
              }
            />
          </div>
        ))}
      </div>
      <HeroMenu handleClick={handleClick} />
      <ExampleDialog
        type={type}
        data={data}
        open={open}
        setOpen={setOpen}
        imgRef={imgInsideModalRef}
        popUpRef={popUpRef}
      />
    </div>
  );
};
