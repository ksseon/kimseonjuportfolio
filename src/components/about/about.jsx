// About.jsx — 곡선 드로잉 + 텍스트는 오프셋 경로로 확실히 띄우기
import { useLayoutEffect, useRef, memo } from "react";
import gsap from "gsap";
import "./style.scss";

/** 재사용 가능한 리스트 행 */
const Row = memo(function Row({ date, desc }) {
  return (
    <li className="row">
      <span className="date">{date}</span>
      <span className="desc">{desc}</span>
    </li>
  );
});

/* ===== path 오프셋 유틸 =====
   원본 path를 샘플링하여 각 점의 법선 방향으로 offset만큼 평행 이동한 polyline 경로를 생성 */
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
    const nx = (-dy / nrm) * offset; // (−dy, dx) = 왼쪽 법선
    const ny = (dx / nrm) * offset;
    pts.push([p.x + nx, p.y + ny]);
  }
  let d = "";
  pts.forEach(
    ([x, y], i) => (d += (i ? "L" : "M") + x.toFixed(2) + " " + y.toFixed(2))
  );
  return d;
}
const About = () => {
  const sectionRef = useRef(null);
  const pathRef = useRef(null); // 원본 곡선 (보이는 선)
  const textPathGeomRef = useRef(null); // 텍스트용 오프셋 경로 (보이지 않게)
  const textRef = useRef(null);

  const photoRef = useRef(null);
  const nameRef = useRef(null);
  const birthRef = useRef(null);
  const eduRef = useRef(null);
  const expRef = useRef(null);
  const cerRef = useRef(null);
  const skillRef = useRef(null);

  // 데이터
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
  const SKILLS = ["Typescript", "React.js", "Recoil", "React-Query"];

  // 텍스트-선 간격(px) — 더 띄우려면 절댓값 ↑ (음수=선의 위/안쪽, 양수=아래/바깥쪽)
  const TEXT_OFFSET_PX = -10;

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const path = pathRef.current;
    const textPathGeom = textPathGeomRef.current;
    if (!section || !path || !textPathGeom) return;

    // 1) 원본 선 드로잉 초기화
    const len = path.getTotalLength();
    path.style.strokeDasharray = `${len}`;
    path.style.strokeDashoffset = `${len}`;

    // 2) 텍스트용 오프셋 경로 생성 & 주입 (겹치지 않게 확실히 띄움)
    const d2 = buildOffsetPathD(path, TEXT_OFFSET_PX, 360);
    if (d2) textPathGeom.setAttribute("d", d2);

    // 3) 사진 회전 기준점
    gsap.set(photoRef.current, { transformOrigin: "10% 80%" });

    // 4) 인터섹션 진입 시 애니메이션
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

        // 곡선 드로우
        tl.to(path, { strokeDashoffset: 0, duration: 2.8 });

        // 텍스트는 페이드만
        tl.from(textRef.current, { autoAlpha: 0, duration: 0.6 }, "-=0.5");

        // 사진/정보 순차 등장
        tl.from(
          photoRef.current,
          { autoAlpha: 0, y: 20, duration: 0.7 },
          "-=0.2"
        )
          .to(
            photoRef.current,
            { rotate: -10, duration: 0.7, ease: "power3.out" },
            "+=0.05"
          )
          .from(
            nameRef.current,
            { autoAlpha: 0, y: 10, duration: 0.5 },
            "-=0.1"
          )
          .from(
            birthRef.current,
            { autoAlpha: 0, y: 10, duration: 0.45 },
            "-=0.35"
          )
          .from(
            eduRef.current,
            { autoAlpha: 0, y: 14, duration: 0.5 },
            "-=0.05"
          )
          .from(
            expRef.current,
            { autoAlpha: 0, y: 14, duration: 0.5 },
            "-=0.15"
          )
          .from(
            cerRef.current,
            { autoAlpha: 0, y: 14, duration: 0.5 },
            "-=0.15"
          )
          .from(
            skillRef.current,
            { autoAlpha: 0, y: 16, duration: 0.55 },
            "-=0.1"
          );

        io.disconnect();
      },
      { threshold: 0.35 }
    );

    io.observe(section);
    return () => io.disconnect();
  }, [TEXT_OFFSET_PX]);

  return (
    <section id="about" className="about" ref={sectionRef}>
      {/* 곡선 + 오프셋 텍스트 */}
      <svg
        className="about__curve"
        xmlns="http://www.w3.org/2000/svg"
        width="567"
        height="564"
        viewBox="0 0 567 564"
        aria-hidden="true"
      >
        {/* 원본 보이는 곡선 */}
        <path
          ref={pathRef}
          id="aboutPath"
          d="M2.00049 2.00052C20.0005 46.0005 95.8572 85.4697 186 106.001C467 170.001 443 390.001 353 417.001C305.872 431.139 287 363.001 337 347.001C397.538 327.629 496 405.001 521 515.001"
          className="about__curve-path"
        />

        {/* 텍스트용: 오프셋 경로 (보이지 않게) */}
        <path
          id="aboutPathText"
          ref={textPathGeomRef}
          className="about__curve-path--invisible"
        />

        {/* 오프셋 경로를 따라 텍스트 */}
        <text className="about__curve-text" ref={textRef}>
          <textPath href="#aboutPathText" startOffset="20%">
            성실함 • 열정적인 • 긍정적인 • 겸손함
          </textPath>
        </text>
      </svg>

      {/* 왼쪽 사진 / 오른쪽 정보 */}
      <div className="about__wrap">
        <div className="about__photo" ref={photoRef}>
          <img src="/images/my.png" alt="김선주 프로필" />
        </div>

        <div className="about__info">
          <header className="about__header">
            <h2 className="about__name" ref={nameRef}>
              김선주 <span className="en">KimSeonJu</span>
            </h2>
            <p className="about__birth" ref={birthRef}>
              1992. 09. 28
            </p>
          </header>

          {/* 학력 */}
          <section className="about__block" ref={eduRef}>
            <h3 className="about__title">Education</h3>
            <ul className="about__list">
              {EDU.map((item) => (
                <Row
                  key={`${item.date}-${item.desc}`}
                  date={item.date}
                  desc={item.desc}
                />
              ))}
            </ul>
          </section>

          {/* 경력 */}
          <section className="about__block" ref={expRef}>
            <h3 className="about__title">Experience</h3>
            <ul className="about__list">
              {EXP.map((item) => (
                <Row
                  key={`${item.date}-${item.desc}`}
                  date={item.date}
                  desc={item.desc}
                />
              ))}
            </ul>
          </section>

          {/* 자격증 */}
          <section className="about__block" ref={cerRef}>
            <h3 className="about__title">Certification</h3>
            <ul className="about__list">
              {CER.map((item) => (
                <Row
                  key={`${item.date}-${item.desc}`}
                  date={item.date}
                  desc={item.desc}
                />
              ))}
            </ul>
          </section>
        </div>
      </div>

      {/* ▼ 스킬: 본문 전체 아래, 브라우저 가운데 정렬 */}
      <section className="about__skill about__skill--global" ref={skillRef}>
        <div className="about__skill-inner">
          <h3 className="about__skill-title">My Skill</h3>
          <ul className="about__skill-list">
            {SKILLS.map((s) => (
              <li className="badge" key={s}>
                {s}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </section>
  );
};
export default About;
