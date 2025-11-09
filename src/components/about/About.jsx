import { useLayoutEffect, useRef, memo } from "react";
import gsap from "gsap";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "./style.scss";

/* ===== 리스트 행 컴포넌트 ===== */
const Row = memo(({ date, desc }) => (
  <li className="row">
    <span className="date">{date}</span>
    <span className="desc">{desc}</span>
  </li>
));

/* ===== Path 오프셋 유틸 ===== */
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

  const EDU = [
    {
      date: "2013. 03 - 2017. 03",
      desc: "동서울대학교 산업디자인학과 학사졸업, 기획부 학회장",
    },
    {
      date: "2008. 03 - 2010. 03",
      desc: "미림여자정보과학고등학교 멀티미디어과 졸업",
    },
  ];

  const EXP = [
    {
      date: "2025. 04 - 2025. 09",
      desc: "UI/UX디자인 웹 프론트엔드 개발 부트캠프 수료",
    },
    { date: "2024. 04 - 2025. 03", desc: "동동칼국수 의정부점 자영업 대표" },
    { date: "2017. 06 - 2024. 04", desc: "(주)엔에스스마트 UI/UX 디자이너" },
    { date: "2015. 04 - 2017. 04", desc: "(주)모노엠 그래픽 디자이너" },
  ];

  const CER = [
    { date: "2020. 01", desc: "자동차운전면허 2종 보통" },
    { date: "2016. 12", desc: "GTQ 포토샵 1급" },
    { date: "2009. 10", desc: "전산회계운용사 3급" },
    { date: "2009. 09", desc: "워드프로세서 1급" },
    { date: "2009. 01", desc: "ITQ 한글엑셀 A" },
    { date: "2008. 11", desc: "정보처리기능사" },
    { date: "2008. 04", desc: "컴퓨터활용능력 2급" },
  ];

  /* ===== GSAP ===== */
  useLayoutEffect(() => {
    const section = sectionRef.current;
    const path = pathRef.current;
    const textPathGeom = textPathGeomRef.current;
    if (!section || !path || !textPathGeom) return;

    // 곡선 초기화
    const len = path.getTotalLength();
    path.style.strokeDasharray = `${len}`;
    path.style.strokeDashoffset = `${len}`;

    // 텍스트 경로(오프셋) 생성
    const d2 = buildOffsetPathD(path, -10, 360);
    if (d2) textPathGeom.setAttribute("d", d2);

    // 사진 회전 기준 중앙 고정 + 초기 각도 0
    gsap.set(photoRef.current, { transformOrigin: "50% 50%", rotateZ: 0 });

    // 화면 진입 시 시퀀스
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

  /* ===== Skill 슬라이드 ===== */
  const skillSlides = [
    {
      items: [
        {
          icon: "/images/Typescript.png",
          title: "Typescript",
          desc: "코드의 안정성과 가독성을 높이고 오류를 사전에 방지할 수 있습니다.",
        },
        {
          icon: "/images/React.png",
          title: "React.js",
          desc: "컴포넌트 기반 구조로 재사용 가능한 UI를 구축할 수 있습니다.",
        },
        {
          icon: "/images/Zustand.png",
          title: "Zustand",
          desc: "전역 상태를 효율적으로 관리할 수 있습니다.",
        },
        {
          icon: "/images/React-Query.png",
          title: "React-Query",
          desc: "서버 상태를 관리할 수 있습니다.",
        },
      ],
    },
    {
      items: [
        {
          icon: "/images/Redux.png",
          title: "Redux",
          desc: "복잡한 상태를 체계적으로 관리할 수 있습니다.",
        },
        {
          icon: "/images/React-Router.png",
          title: "React Router",
          desc: "유연한 라우팅을 구현할 수 있습니다.",
        },
        {
          icon: "/images/Node.png",
          title: "Node.js",
          desc: "Express를 활용해 API 서버를 구현하며, 클라이언트와 서버 통신 흐름을 익혔습니다.",
        },
        {
          icon: "/images/Styled-Components.png",
          title: "Styled-Components",
          desc: "컴포넌트 기반으로 모듈화된 스타일을 작성할 수 있습니다.",
        },
      ],
    },
    {
      items: [
        {
          icon: "/images/Javascript.png",
          title: "Javascript",
          desc: "동적인 웹 페이지를 구현하며, 사용자와의 상호작용을 자연스럽게 설계할 수 있습니다.",
        },
        {
          icon: "/images/SCSS.png",
          title: "SCSS",
          desc: "변수와 믹스인 등으로 효율적인 스타일링을 구현할 수 있습니다.",
        },
        {
          icon: "/images/CSS3.png",
          title: "CSS3",
          desc: "반응형 웹 디자인과 시작적으로 매력적인 레이아웃을 구현할 수 있습니다.",
        },
        {
          icon: "/images/HTML5.png",
          title: "HTML5",
          desc: "구조적이고 의미있는 웹 페이지를 구현할 수 있습니다.",
        },
      ],
    },
    {
      items: [
        {
          icon: "/images/GitHub-Vercel.png",
          title: "GitHub·Vercel",
          desc: "브랜치 전략을 통해 버전 관리와 팀 협업 효율을 높였으며, 커밋 이력으로 개발 과정을 체계적으로 관리하고, Vercel을 활용해 배포 자동화 및 서버 환경을 안정적으로 운영했습니다.",
        },
        {
          icon: "/images/Figma.png",
          title: "Figma",
          desc: "효율적인 UI/UX 디자인을 구현하며, 팀원들과의 실시간 협업을 통해 디자인 의도를 명확히 전달할 수 있습니다.",
        },
        {
          icon: "/images/Photoshop-Illustrator.png",
          title: "Photoshop·Illustrator",
          desc: "로고, 아이콘, 인포그래픽 등 시각적 요소를 제작하고, 색감 보정과 합성 작업을 통해 웹 페이지 디자인의 완성도를 높일 수 있습니다.",
        },
        {
          icon: "/images/GPT-Claude.png",
          title: "GPT·Claude",
          desc: "문서를 가독성 있도록 정리하고, 이미지를 시각화하고 보완할 수 있습니다.",
        },
      ],
    },
    {
      items: [
        {
          icon: "/images/Slack-Notion.png",
          title: "Slack·Notion",
          desc: "계획을 세워 메모를 체계적으로 기록하고, 회의록을 정리해 팀과 원활히 공유할 수 있습니다.",
        },
      ],
    },
  ];

  return (
    <section id="about" className="about" ref={sectionRef}>
      {/* ===== 상단 곡선 ===== */}
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
            성실함 · 열정적인 · 긍정적인 · 겸손함
          </textPath>
        </text>
      </svg>

      {/* ===== 프로필 ===== */}
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

      {/* ===== My Skill ===== */}
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
          {skillSlides.map((slide, idx) => (
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
