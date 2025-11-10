import { useLayoutEffect, useRef, memo } from "react";
import gsap from "gsap";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "./style.scss";
import { EDU, EXP, CER, SKILL_SLIDES } from "../../api/aboutData";

const Row = memo(({ date, desc }) => (
  <li className="row">
    <span className="date">{date}</span>
    <span className="desc">{desc}</span>
  </li>
));

function buildOffsetPathD(pathEl, offset = -60, samples = 360) {
  const len = pathEl.getTotalLength();
  if (!len) return null;
  const pts = [];
  const eps = Math.max(0.5, len / (samples * 50));
  for (let i = 0; i <= samples; i++) {
    const l = (len * i) / samples;
    const p = pathEl.getPointAtLength(l);
    const p2 = pathEl.getPointAtLength(Math.min(l + eps, len));
    const dx = p2.x - p.x;
    const dy = p2.y - p.y;
    const nrm = Math.hypot(dx, dy) || 1;
    const nx = (-dy / nrm) * offset;
    const ny = (dx / nrm) * offset;
    pts.push([p.x + nx, p.y + ny]);
  }
  return pts
    .map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(2)} ${y.toFixed(2)}`)
    .join(" ");
}

const About = () => {
  const sectionRef = useRef(null);
  const pathRef = useRef(null);
  const textPathGeomRef = useRef(null);
  const textRef = useRef(null);
  const photoRef = useRef(null);
  const nameRef = useRef(null);
  const birthRef = useRef(null);
  const eduRef = useRef(null);
  const expRef = useRef(null);
  const cerRef = useRef(null);
  const skillRef = useRef(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const path = pathRef.current;
    const textPathGeom = textPathGeomRef.current;
    if (!section || !path || !textPathGeom) return;

    const len = path.getTotalLength();
    path.style.strokeDasharray = `${len}`;
    path.style.strokeDashoffset = `${len}`;

    const d2 = buildOffsetPathD(path, -10, 360);
    if (d2) textPathGeom.setAttribute("d", d2);

    gsap.set(photoRef.current, { transformOrigin: "50% 50%", rotateZ: 0 });

    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

        tl.to(path, { strokeDashoffset: 0, duration: 2.6 })
          .from(textRef.current, { autoAlpha: 0, duration: 0.5 }, "-=0.4")
          .from(
            photoRef.current,
            { autoAlpha: 0, y: 14, duration: 0.5 },
            "-=0.15"
          )
          .to(
            photoRef.current,
            { rotateZ: -8, duration: 0.45, ease: "power3.out" },
            "-=0.05"
          )
          .from(
            nameRef.current,
            { autoAlpha: 0, y: 10, duration: 0.45 },
            "-=0.05"
          )
          .from(
            birthRef.current,
            { autoAlpha: 0, y: 10, duration: 0.4 },
            "-=0.25"
          )
          .from(
            eduRef.current,
            { autoAlpha: 0, y: 12, duration: 0.45 },
            "-=0.05"
          )
          .from(
            expRef.current,
            { autoAlpha: 0, y: 12, duration: 0.45 },
            "-=0.1"
          )
          .from(
            cerRef.current,
            { autoAlpha: 0, y: 12, duration: 0.45 },
            "-=0.1"
          )
          .from(
            skillRef.current,
            { autoAlpha: 0, y: 14, duration: 0.55 },
            "-=0.05"
          );

        io.disconnect();
      },
      { threshold: 0.35 }
    );

    io.observe(section);
    return () => io.disconnect();
  }, []);

  return (
    <section id="about" className="about" ref={sectionRef}>
      <svg
        className="about__curve"
        xmlns="http://www.w3.org/2000/svg"
        width="567"
        height="564"
        viewBox="0 0 567 564"
      >
        <path
          ref={pathRef}
          d="M2 2C20 46 95.857 85.47 186 106C467 170 443 390 353 417C305.872 431.139 287 363 337 347C397.538 327.629 496 405 521 515"
          className="about__curve-path"
        />
        <path
          id="aboutPathText"
          ref={textPathGeomRef}
          className="about__curve-path--invisible"
        />
        <text className="about__curve-text" ref={textRef}>
          <textPath href="#aboutPathText" startOffset="20%">
            성실함 · 책임감 · 긍정적인 · 겸손함
          </textPath>
        </text>
      </svg>

      <div className="about__wrap">
        <div className="about__photo" ref={photoRef}>
          <img src="/images/my.png" alt="김선주 프로필" />
        </div>

        <div className="about__info">
          <h2 className="about__name" ref={nameRef}>
            김선주 <span className="en">KimSeonJu</span>
          </h2>
          <p className="about__birth" ref={birthRef}>
            1992.09.28
          </p>

          <section ref={eduRef}>
            <h3 className="about__title">Education</h3>
            <ul className="about__list">
              {EDU.map((v) => (
                <Row key={v.date} {...v} />
              ))}
            </ul>
          </section>

          <section ref={expRef}>
            <h3 className="about__title">Experience</h3>
            <ul className="about__list">
              {EXP.map((v) => (
                <Row key={v.date} {...v} />
              ))}
            </ul>
          </section>

          <section ref={cerRef}>
            <h3 className="about__title">Certification</h3>
            <ul className="about__list">
              {CER.map((v) => (
                <Row key={v.date} {...v} />
              ))}
            </ul>
          </section>
        </div>
      </div>

      <section className="about__skill about__skill--global" ref={skillRef}>
        <h3 className="about__skill-title">My Skill</h3>
        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop
          spaceBetween={40}
          slidesPerView={1}
          className="about__skill-swiper"
        >
          {SKILL_SLIDES.map((slide, idx) => (
            <SwiperSlide key={idx}>
              <div className="about__skill-grid">
                {slide.items.map((item, i) => (
                  <div className="skill-card" key={i}>
                    <img
                      src={item.icon}
                      alt={item.title}
                      className="skill-icon"
                    />
                    <h4 className="skill-title">{item.title}</h4>
                    <p className="skill-desc">{item.desc}</p>
                  </div>
                ))}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </section>
  );
};

export default About;
