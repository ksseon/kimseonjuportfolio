import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./style.scss";

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef(null);
  const pathRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const path = pathRef.current;
    if (!path || !section) return;

    const length = path.getTotalLength();
    path.style.strokeDasharray = length;
    path.style.strokeDashoffset = length;
    path.style.opacity = 1;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
        },
      });

      tl.to(path, {
        strokeDashoffset: 0,
        duration: 3.0,
        ease: "power2.inOut",
      });

      tl.fromTo(
        ".contact-inner",
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 1.5, ease: "power3.out" },
        "-=1.5"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="contact" ref={sectionRef}>
      <svg
        className="contact-line"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1920 200"
        fill="none"
      >
        <path
          ref={pathRef}
          d="M-33.8931 0.166016C-35.5597 20.166 -18.3931 65.666 63.6069 87.666C166.107 115.166 186.107 32.666 146.107 27.666C106.107 22.666 82 120.166 324 144.166"
          stroke="#7FC3FF"
          strokeWidth="3.5"
          fill="none"
        />
      </svg>

      <div className="contact-inner">
        <div className="contact-left">
          <h4 className="contact-sub">Want to Work Together</h4>
          <h2 className="contact-title">Cont@ct</h2>
          <ul className="contact-info">
            <li>rtweq@naver.com</li>
            <li>github.com/sseon</li>
            <li>010.3981.0772</li>
          </ul>
        </div>

        <div className="contact-right">
          <img src="/images/logo_signature.png" alt="seonju signature" />
          <p>KIMSEONJU©2025</p>
        </div>
      </div>
    </section>
  );
};
export default Contact;
