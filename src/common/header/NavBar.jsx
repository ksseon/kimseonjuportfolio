import { NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const items = [
  { to: "/", label: "HOME", end: true },
  { to: "/about", label: "ABOUT" },
  { to: "/project", label: "PROJECT" },
  { to: "/contact", label: "CONTACT" },
];

const NavBar = () => {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  return (
    <nav className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
      <ul className="menu">
        {items.map((it) => (
          <li key={it.to}>
            <NavLink
              to={it.to}
              end={it.end}
              className={({ isActive }) => (isActive ? "active" : undefined)}
            >
              {it.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
export default NavBar;
