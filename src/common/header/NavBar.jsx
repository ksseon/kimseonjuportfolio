import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

const HEADER_HEIGHT = 64;

// 메뉴별 타깃 셀렉터( id 우선, 없으면 class )
const TARGETS = {
  home: "#visual, .visual",
  about: "#about, .about",
  project: "#process, .work",
  contact: "#contact, .contact",
};

export default function NavBar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [activeKey, setActiveKey] = useState("home");
  const ioRef = useRef(null);

  // 헤더 배경 on/off
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // 타깃 엘리먼트 찾기(메뉴 키 → DOM)
  const getTargetEl = (key) => {
    const selector = TARGETS[key];
    if (!selector) return null;
    const el = document.querySelector(selector);
    return el || null;
  };

  // 부드러운 스크롤
  const smoothScrollTo = (el) => {
    if (!el) return;
    const top =
      window.pageYOffset + el.getBoundingClientRect().top - HEADER_HEIGHT;
    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
  };

  // 섹션 active 상태 감지 (id/class 모두 커버)
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

  // 공통 이동 함수: 루트가 아니면 루트로 이동 후 스크롤
  const go = (key) => (e) => {
    e.preventDefault();
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
      <ul className="menu">
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
}
