import "./bg.css";

const images = [
  { src: "/assets/_0011_Amog.png", left: "0", top: "10%" },
  { src: "/assets/Dexecutioner.png", right: "5%", top: "20%" },
  { src: "/assets/ItemSoulHarvester.png", left: "20%", top: "60%" },
  { src: "/assets/LuckTome.png", right: "20%", top: "85%" },
];

export const Bg = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg">
      <div className="bg-track">
        {images.map((img, i) => (
          <img
            key={i}
            src={img.src}
            className="bg-img"
            style={
              {
                "--top": img.top,
                "--left": img.left ?? "unset",
                "--right": img.right ?? "unset",
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
