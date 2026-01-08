import "./hero-menu.css";
import { useHover } from "../../shared/context/HoverContext";
import type { TypeOfAsset } from "../../shared/types";
export const HeroMenu = ({
  handleClick,
  logoRefInMenu,
}: {
  handleClick: (type: TypeOfAsset) => void;
  logoRefInMenu: React.Ref<HTMLImageElement>;
}) => {
  const { hoveredItem, dispatch } = useHover();
  const items: TypeOfAsset[] = ["Items", "Tomes", "Weapons", "Characters"];
  return (
    <div className="container hero-menu-container">
      <div className="hero-menu-munu-container">
        <p className="desc">
          Smash your way through endless waves of enemies and grow absurdly
          powerful! Grab loot, level up, unlock characters and upgrade to create
          unique and crazy builds as you fend off hordes of creatures!
        </p>
        <img ref={logoRefInMenu} src="./assets/LogoNew.png" className="logo" />
        <div className="hero-menu-menu">
          <ul className="hero-menu-list">
            {items.map((item) => (
              <li
                key={item}
                className="hero-menu-item"
                data-hovered={hoveredItem}
                data-matched={hoveredItem === item ? "true" : "false"}
                data-item={item.toLowerCase()}
                onMouseEnter={() => dispatch({ type: "HOVER", item })}
                onMouseLeave={() => dispatch({ type: "LEAVE" })}
                onClick={() => handleClick(item)}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
