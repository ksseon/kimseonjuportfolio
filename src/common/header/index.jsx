import { Link, useLocation, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import "./style.scss";

const Header = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const goHome = (e) => {
    e.preventDefault();

    const scrollToHome = () => {
      const homeEl = document.querySelector("#visual, .visual");
      if (homeEl) {
        const top =
          window.pageYOffset + homeEl.getBoundingClientRect().top - 64;
        window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
      }
    };

    if (pathname !== "/") {
      navigate("/");
      setTimeout(scrollToHome, 100);
    } else {
      scrollToHome();
    }
  };

  return (
    <header id="site-header">
      <div className="inner">
        <h1 className="seonju">
          <Link to="/" onClick={goHome}>
            <img src="/images/logo.png" alt="logo" className="logo" />
            <span className="name">KIMSEONJU</span>
            <span className="desc">2026 UI/UX/WEB DESIGN PORTFOLIO</span>
          </Link>
        </h1>
        <NavBar />
      </div>
    </header>
  );
};

export default Header;
