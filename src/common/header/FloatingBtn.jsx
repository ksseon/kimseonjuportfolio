import React, { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const FloatingBtnInner = ({ visible, onTop, onBottom }) => (
  <div
    id="floating-btn"
    className={visible ? "is-visible" : ""}
    aria-hidden={!visible}
  >
    <div className="floating-btn-wrap">
      <button
        type="button"
        className="floating-btn-top"
        onClick={onTop}
        aria-label="맨 위로 이동"
        title="맨 위로"
      >
        <IoIosArrowUp />
      </button>

      <button
        type="button"
        className="floating-btn-bottom"
        onClick={onBottom}
        aria-label="맨 아래로 이동"
        title="맨 아래로"
      >
        <IoIosArrowDown />
      </button>
    </div>
  </div>
);

const FloatingBtn = ({ showAfter = 400 }) => {
  const [visible, setVisible] = useState(false);
  const rafRef = useRef(null);
  const thresholdRef = useRef(0);

  useEffect(() => {
    const calc = () => {
      if (typeof showAfter === "number") {
        thresholdRef.current = showAfter;
      } else if (typeof showAfter === "string") {
        const el = document.querySelector(showAfter);
        if (el) {
          const rect = el.getBoundingClientRect();
          const docTop = window.scrollY || document.documentElement.scrollTop;
          thresholdRef.current = Math.round(docTop + rect.top + rect.height);
        } else {
          thresholdRef.current = 400;
        }
      } else {
        thresholdRef.current = 400;
      }
    };

    calc();
    const onResize = () => {
      calc();
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [showAfter]);

  useEffect(() => {
    const check = () => {
      const y =
        window.scrollY ||
        window.pageYOffset ||
        document.documentElement.scrollTop;
      setVisible(y > thresholdRef.current);
    };

    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(check);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    check();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const scrollToBottom = () => {
    const bottom = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.offsetHeight,
      document.body.clientHeight,
      document.documentElement.clientHeight
    );
    window.scrollTo({ top: bottom, behavior: "smooth" });
  };

  if (typeof document === "undefined") return null;
  return createPortal(
    <FloatingBtnInner
      visible={visible}
      onTop={scrollToTop}
      onBottom={scrollToBottom}
    />,
    document.body
  );
};

export default FloatingBtn;
