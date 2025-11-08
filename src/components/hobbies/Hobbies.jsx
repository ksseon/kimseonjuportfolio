import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import "./style.scss";

export default function Hobbies() {
  const sectionRef = useRef(null);
  const marqueeRef = useRef(null);

  const hobbies = [
    { name: "Olivia Dean", img: "/images/Olivia Dean.png" },
    { name: "Exercise", img: "/images/Exercise.png" },
    { name: "Fishing", img: "/images/Fishing.png" },
    { name: "My Pet", img: "/images/Puppy.png" },
  ];

  /* ✅ 마퀴: 무한 루프 + 스크롤 반전 */
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const marquee = marqueeRef.current;
      const inner = marquee.querySelector(".marquee__inner");
      const parts = marquee.querySelectorAll(".marquee__part");

      // 🔹 컨텐츠 복제 → 끊김 없는 루프
      const clone = inner.cloneNode(true);
      marquee.appendChild(clone);

      // 🔹 기본 애니메이션
      const tween = gsap
        .to(".marquee__part", {
          xPercent: -100,
          repeat: -1,
          duration: 12,
          ease: "linear",
        })
        .totalProgress(0.5);

      gsap.set(".marquee__inner", { xPercent: -50 });

      // 🔹 스크롤 방향 감지
      let lastScroll = window.pageYOffset;
      let isDown = true;

      const onScroll = () => {
        const current = window.pageYOffset;
        isDown = current > lastScroll;
        gsap.to(tween, { timeScale: isDown ? 1 : -1, overwrite: true });
        lastScroll = current;
      };

      window.addEventListener("scroll", onScroll);
      return () => window.removeEventListener("scroll", onScroll);
    }, marqueeRef);
    return () => ctx.revert();
  }, []);

  /* ✅ 텍스트 등장 + 이미지 호버 */
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
      });

      tl.fromTo(
        ".hobbies-header",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
      ).fromTo(
        ".menu__item-innertext",
        { yPercent: 100, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: "expo.out",
        },
        "-=0.6"
      );

      // Hover 애니메이션
      const items = gsap.utils.toArray(".menu__item");
      items.forEach((item) => {
        const imgWrapper = item.querySelector(".menu__item-image_wrapper");
        item.addEventListener("mouseenter", () => {
          gsap.set(imgWrapper, {
            scale: 0.85,
            rotation: -5,
            opacity: 0,
            xPercent: 25,
            yPercent: 10,
          });
          gsap.to(imgWrapper, {
            scale: 1,
            rotation: 0,
            opacity: 1,
            xPercent: 0,
            yPercent: 0,
            duration: 0.8,
            ease: "power3.out",
          });
        });
        item.addEventListener("mouseleave", () => {
          gsap.to(imgWrapper, {
            opacity: 0,
            scale: 0.8,
            rotation: -5,
            xPercent: 20,
            yPercent: 30,
            duration: 0.5,
            ease: "power3.inOut",
          });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="hobbies" ref={sectionRef}>
      {/* 🔹 본문 */}
      <div className="hobbies-inner">
        <div className="hobbies-header">
          <h2>My Hobbies & Favorite</h2>
        </div>

        <div className="menu">
          {hobbies.map((h, i) => (
            <div className="menu__item" key={i}>
              <div className="menu__item-image_wrapper">
                <figure className="menu__item-figure">
                  <img src={h.img} alt={h.name} />
                </figure>
              </div>
              <p className="menu__item-text">
                <span className="menu__item-innertext">{h.name}</span>
              </p>
            </div>
          ))}
        </div>
      </div>{" "}
      {/* 🔹 상단 마퀴 */}
      <section className="marquee" ref={marqueeRef}>
        <div className="marquee__inner">
          {Array.from({ length: 6 }).map((_, i) => (
            <div className="marquee__part" key={i}>
              FRONTEND CREATIVE PORTFOLIO
            </div>
          ))}
        </div>
      </section>
    </section>
  );
}
