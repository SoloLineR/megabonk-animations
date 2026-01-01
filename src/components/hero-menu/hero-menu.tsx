import "./hero-menu.css";
export const HeroMenu = () => {
  return (
    <div className="container hero-menu-container">
      <div className="hero-menu-munu-container">
        <p className="desc">
          Smash your way through endless waves of enemies and grow absurdly
          powerful! Grab loot, level up, unlock characters and upgrade to create
          unique and crazy builds as you fend off hordes of creatures!
        </p>
        <img src="/assets/LogoNew.png" className="logo" />
        <div className="hero-menu-menu">
          <ul className="hero-menu-list">
            <li className="hero-menu-item">Items</li>
            <li className="hero-menu-item">Tomes</li>
            <li className="hero-menu-item">Weapons</li>
            <li className="hero-menu-item">Characters</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
