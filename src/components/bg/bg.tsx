import { useHover } from "../../shared/context/HoverContext";
import "./bg.css";

const images = [
  {
    src: "/assets/_0011_Amog.png",
    left: "1dvw",
    top: "10dvh",
    type: "Characters",
  },
  {
    src: "/assets/Dexecutioner.png",
    left: "75dvw",
    top: "20dvh",
    type: "Weapons",
  },
  {
    src: "/assets/ItemSoulHarvester.png",
    left: "20dvw",
    top: "60dvh",
    type: "Items",
  },
  { src: "/assets/LuckTome.png", left: "60dvw", top: "85dvh", type: "Tomes" },
];

export const Bg = ({ children }: { children: React.ReactNode }) => {
  const { hoveredItem } = useHover();

  return (
    <div className="bg" data-hovered={hoveredItem}>
      <div className="bg-track" data-hovered={hoveredItem}>
        {images.map((img, i) => (
          <img
            key={i}
            src={img.src}
            className="bg-img"
            data-type={img.type}
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
        ))}
      </div>

      {children}
    </div>
  );
};
