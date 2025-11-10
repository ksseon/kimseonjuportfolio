import { useEffect, useState } from "react";
import "./style.scss";

export default function TopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) setVisible(true);
      else setVisible(false);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    visible && (
      <button className="top-btn" onClick={scrollToTop} aria-label="Go to top">
        <img src="/images/top.png" alt="Top" />
      </button>
    )
  );
}
