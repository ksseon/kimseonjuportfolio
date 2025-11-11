import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

const HEADER_HEIGHT = 64;
const TARGETS = {
  home: "#visual, .visual",
  about: "#about, .about",
  project: "#process, .work",
  contact: "#contact, .contact",
};

const NavBar = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [activeKey, setActiveKey] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const ioRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
      const header = document.getElementById("site-header");
      if (header) {
        if (isScrolled) header.classList.add("scrolled");
        else header.classList.remove("scrolled");
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const getTargetEl = (key) => {
    const selector = TARGETS[key];
    if (!selector) return null;
    return document.querySelector(selector);
  };

  const smoothScrollTo = (el) => {
    if (!el) return;
    const top =
      window.pageYOffset + el.getBoundingClientRect().top - HEADER_HEIGHT;
    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
  };

  useEffect(() => {
    if (ioRef.current) {
      ioRef.current.disconnect();
      ioRef.current = null;
    }

    const els = [
      { key: "home", el: getTargetEl("home") },
      { key: "about", el: getTargetEl("about") },
      { key: "project", el: getTargetEl("project") },
      { key: "contact", el: getTargetEl("contact") },
    ].filter((v) => v.el);

    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const hit = els.find((v) => v.el === e.target);
          if (hit) setActiveKey(hit.key);
        });
      },
      { threshold: 0.45, rootMargin: `-${HEADER_HEIGHT}px 0px 0px 0px` }
    );

    els.forEach(({ el }) => io.observe(el));
    ioRef.current = io;
    return () => io.disconnect();
  }, [pathname]);

  const go = (key) => (e) => {
    e.preventDefault();
    setMenuOpen(false);
    const doScroll = () => {
      const el = getTargetEl(key);
      if (el) smoothScrollTo(el);
    };
    if (pathname !== "/") {
      navigate("/");
      setTimeout(doScroll, 80);
    } else {
      doScroll();
    }
  };

  return (
    <nav className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
      <div
        className={`hamburger ${menuOpen ? "active" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={`menu ${menuOpen ? "open" : ""}`}>
        <li>
          <a
            href="/#visual"
            onClick={go("home")}
            className={activeKey === "home" ? "active" : undefined}
          >
            HOME
          </a>
        </li>
        <li>
          <a
            href="/#about"
            onClick={go("about")}
            className={activeKey === "about" ? "active" : undefined}
          >
            ABOUT
          </a>
        </li>
        <li>
          <a
            href="/#process"
            onClick={go("project")}
            className={activeKey === "project" ? "active" : undefined}
          >
            PROJECT
          </a>
        </li>
        <li>
          <a
            href="/#contact"
            onClick={go("contact")}
            className={activeKey === "contact" ? "active" : undefined}
          >
            CONTACT
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
