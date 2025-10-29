import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

const HEADER_HEIGHT = 64;

export default function NavBar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [activeKey, setActiveKey] = useState("home");
  const ioRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (ioRef.current) {
      ioRef.current.disconnect();
      ioRef.current = null;
    }

    if (pathname !== "/") {
      if (pathname.startsWith("/project")) setActiveKey("project");
      else if (pathname.startsWith("/contact")) setActiveKey("contact");
      else if (pathname.startsWith("/about")) setActiveKey("about");
      else setActiveKey("home");
      return;
    }

    const sVisual = document.getElementById("visual");
    const sAbout = document.getElementById("about");
    if (!sVisual || !sAbout) return;

    const onIntersect = (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        if (e.target.id === "visual") setActiveKey("home");
        if (e.target.id === "about") setActiveKey("about");
      });
    };

    const io = new IntersectionObserver(onIntersect, {
      threshold: 0.5,
      root: null,
      rootMargin: `-${HEADER_HEIGHT}px 0px 0px 0px`,
    });
    io.observe(sVisual);
    io.observe(sAbout);
    ioRef.current = io;

    const hash = window.location.hash.replace("#", "");
    if (hash === "about") setActiveKey("about");
    else setActiveKey("home");

    return () => io.disconnect();
  }, [pathname]);

  // ✅ visual은 최상단으로 바로 스크롤 (계산 X)
  const smoothScrollToId = (id) => {
    if (id === "visual") {
      window.history.replaceState(null, "", "#visual");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.getElementById(id);
    if (!el) return;
    const top =
      window.pageYOffset + el.getBoundingClientRect().top - HEADER_HEIGHT;
    window.history.replaceState(null, "", `#${id}`);
    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
  };

  const goHome = (e) => {
    e.preventDefault();
    if (pathname === "/") {
      smoothScrollToId("visual"); // ← 최상단 스무스 스크롤
    } else {
      navigate("/#visual"); // 홈으로 이동 후 Home.jsx/효과가 처리
    }
  };

  const goAbout = (e) => {
    e.preventDefault();
    if (pathname === "/") {
      smoothScrollToId("about");
    } else {
      navigate("/#about");
    }
  };

  return (
    <nav className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
      <ul className="menu">
        <li>
          <a
            href="/#visual"
            onClick={goHome}
            className={activeKey === "home" ? "active" : undefined}
          >
            HOME
          </a>
        </li>
        <li>
          <a
            href="/#about"
            onClick={goAbout}
            className={activeKey === "about" ? "active" : undefined}
          >
            ABOUT
          </a>
        </li>
        <li>
          <NavLink
            to="/project"
            className={({ isActive }) =>
              isActive || activeKey === "project" ? "active" : undefined
            }
          >
            PROJECT
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive || activeKey === "contact" ? "active" : undefined
            }
          >
            CONTACT
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
