import { Link } from "react-router-dom";
import NavBar from "./NavBar";
import "./style.scss";

const Header = () => {
  return (
    <header id="site-header">
      <div className="inner">
        <h1 className="seonju">
          <Link to="/">
            {/* 추가된 로고 */}
            <img src="/images/logo.png" alt="KIMSEONJU logo" className="logo" />
            <span className="name">KIMSEONJU</span>
            <span className="desc">2025 FRONTEND PORTFOLIO</span>
          </Link>
        </h1>
        <NavBar />
      </div>
    </header>
  );
};

export default Header;
