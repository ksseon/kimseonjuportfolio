import { useRef, useEffect, useState } from "react";
import Modal from "./Modal";
import "./project.scss";

/* ===== 전체 프로젝트 데이터 ===== */
const projects = [
  {
    title: "RoadOn",
    stack: "TypeScript / React",
    desc: "TypeScript를 활용해 영화 속 장면을 실제 여행지와 연결하는 시네마틱 여행 사이트 프로젝트입니다.",
    thumbnail: "/images/RoadOn_thumb.png",
    imgSlides: ["/images/RoadOn_1.png", "/images/RoadOn_2.png"],
    github: "https://github.com/Hwanyeong815/RoadOn_Project.git",
    figma: "https://www.figma.com/file/xxxx/roadon",
    site: "https://roadonproject.vercel.app/",
    tools: "React, TypeScript, Zustand, GSAP, SCSS, Swiper, Figma, ChatGPT",
    pages:
      "메인, 항공 예약, 상세 페이지, 투어 리스트 | 기여도: 기획 40%, 디자인 80%, 코딩 30%",
    type: "Team Project",
  },
  {
    title: "Portfolio",
    stack: "React / GSAP / SCSS",
    desc: "GSAP과 React를 활용하여 감각적인 인터랙션과 함께 정체성이 돋보이도록 구성한 포트폴리오 프로젝트입니다.",
    thumbnail: "/images/Portfolio_thumb.png",
    imgSlides: ["/images/Portfolio_1.png", "/images/Portfolio_2.png"],
    github: "https://github.com/ksseon/kimseonjuportfolio.git",
    figma: "https://www.figma.com/file/xxxx/portfolio",
    site: "https://kimseonjuportfolio.vercel.app/",
    tools: "React, GSAP, SCSS, Vite, Framer Motion, Figma",
    pages:
      "인트로, 어바웃, 프로세스, 프로젝트, 취미, 푸터 | 기여도: 디자인 100%, 코딩 100%",
    type: "Personal Project",
  },
  {
    title: "LUSH",
    stack: "React / GSAP / SCSS",
    desc: "러쉬의 감정 케어 철학을 K-내추럴 감성으로 재해석한 리디자인 프로젝트입니다.",
    thumbnail: "/images/LUSH_thumb.png",
    imgSlides: ["/images/LUSH_1.png", "/images/LUSH_2.png"],
    github: "https://github.com/ksseon/lush-project",
    figma: "https://www.figma.com/file/xxxx/lush",
    site: "https://lush-korea.vercel.app/",
    tools: "React, GSAP, SCSS, Swiper, Figma, ChatGPT",
    pages:
      "메인, 제품 상세, 스파, 이벤트, 스토어 | 기여도: 기획 30%, 디자인 60%, 코딩 40%",
    type: "Team Project",
  },
  {
    title: "Olivia Dean",
    stack: "React / Styled-Components",
    desc: "가수 Olivia Dean의 감성과 비주얼 아이덴티티를 담은 싱글 아티스트 웹사이트 프로젝트입니다.",
    thumbnail: "/images/Olivia-Dean_thumb.png",
    imgSlides: ["/images/Olivia-Dean_1.png", "/images/Olivia-Dean_2.png"],
    github: "https://github.com/ksseon/Olivia-Dean.git",
    figma: "https://www.figma.com/file/xxxx/oliviadean",
    site: "https://olivia-dean.vercel.app/",
    tools: "React, Styled-Components, Framer Motion, Figma",
    pages:
      "메인, 앨범 상세, 영상 갤러리, 투어 일정 | 기여도: 디자인 90%, 코딩 100%",
    type: "Personal Project",
  },
  {
    title: "Hyundai E&C",
    stack: "Vanilla JS / HTML / CSS",
    desc: "현대건설 웹사이트를 사용자 중심 구조로 리디자인하고 접근성을 강화한 프로젝트입니다.",
    thumbnail: "/images/Hyundai-E&C_thumb.png",
    imgSlides: ["/images/Hyundai-E&C_1.png", "/images/Hyundai-E&C_2.png"],
    github: "https://github.com/ksseon/hyundai-enc",
    figma: "https://www.figma.com/file/xxxx/hyundai",
    site: "https://hyundaienc-redesign.vercel.app/",
    tools: "HTML, CSS, JavaScript, Figma",
    pages:
      "메인, 사업소개, 채용, 뉴스, 공지사항 | 기여도: 디자인 70%, 코딩 30%",
    type: "Team Project",
  },
  {
    title: "Knto",
    stack: "Vanilla JS / HTML / CSS",
    desc: "한국관광공사 웹사이트를 순수 바닐라 JS로 리디자인하여 사용자 중심 UX로 개선했습니다.",
    thumbnail: "/images/Knto_thumb.png",
    imgSlides: ["/images/Knto_1.png", "/images/Knto_2.png"],
    github: "https://github.com/ksseon/knto.git",
    figma: "https://www.figma.com/file/xxxx/knto",
    site: "https://knto-inky.vercel.app/",
    tools: "HTML, CSS, JavaScript, Figma",
    pages:
      "메인, 관광명소 리스트, 상세, 이벤트 | 기여도: 기획 30%, 디자인 80%, 코딩 50%",
    type: "Team Project",
  },
  {
    title: "Kepco",
    stack: "Vanilla JS / HTML / CSS",
    desc: "한국전력공사 공식 홈페이지를 리디자인하며 공공기관 접근성(ARIA)을 준수한 UI로 개선했습니다.",
    thumbnail: "/images/Kepco_thumb.png",
    imgSlides: ["/images/Kepco_1.png", "/images/Kepco_2.png"],
    github: "https://github.com/ksseon/kepco",
    figma: "https://www.figma.com/file/xxxx/kepco",
    site: "https://kepco-redesign.vercel.app/",
    tools: "HTML, CSS, JavaScript, ARIA, Figma",
    pages: "메인, ESG, 뉴스센터, 고객지원 | 기여도: 디자인 80%, 코딩 40%",
    type: "Team Project",
  },
  {
    title: "Kyungdong",
    stack: "Vanilla JS / HTML / CSS",
    desc: "경동 웹사이트를 순수 바닐라 JS로 구현하며 인터랙션과 콘텐츠 구조를 개선했습니다.",
    thumbnail: "/images/Kyungdong_thumb.png",
    imgSlides: ["/images/Kyungdong_1.png", "/images/Kyungdong_2.png"],
    github: "https://github.com/ksseon/kyungdong",
    figma: "https://www.figma.com/file/xxxx/kyungdong",
    site: "https://kyungdong-redesign.vercel.app/",
    tools: "HTML, CSS, JavaScript, Figma",
    pages:
      "메인, 제품소개, 홍보센터, 고객문의 | 기여도: 기획 20%, 디자인 70%, 코딩 50%",
    type: "Team Project",
  },
  {
    title: "Bugs Music",
    stack: "Figma / Prototype",
    desc: "벅스뮤직 모바일 앱을 감각적으로 리디자인하여 프로토타입으로 구현한 UX 프로젝트입니다.",
    thumbnail: "/images/Bugs_thumb.png",
    imgSlides: ["/images/Bugs-Music_1.png", "/images/Bugs-Music_2.png"],
    github: "https://github.com/ksseon/bugs-prototype",
    figma:
      "https://www.figma.com/slides/rJsFjnKBoYdItd4FXMXeL2/Bugs----%EA%B8%B0%ED%9A%8D%EC%84%9C?node-id=55-6444&t=pineWYnyGBVVa7SV-1",
    site: "https://www.figma.com/proto/xxxx/bugs",
    tools: "Figma, Prototyping, UX Writing",
    pages: "로그인, 홈, 플레이어, 플레이리스트, 내 앨범 | 기여도: 디자인 100%",
    type: "Personal Project",
  },
  {
    title: "NSSMART",
    stack: "Illustrator / Photoshop / UI Design",
    desc: "엔에스스마트 키오스크·태블릿 UI 디자인 프로젝트로, 다양한 환경에 맞춘 반응형 UI를 제작했습니다.",
    thumbnail: "/images/NSSMART_thumb.png",
    imgSlides: ["/images/NSSMART_1.png", "/images/NSSMART_2.png"],
    github: "https://github.com/ksseon/nssmart-ui",
    figma: "https://www.figma.com/file/xxxx/nssmart",
    site: "https://nssmart.co.kr/",
    tools: "Adobe Illustrator, Photoshop, Zeplin, Figma",
    pages:
      "메인화면, 주문, 결제, 관리자, 모바일앱 | 기여도: 디자인 100%, UI 설계 100%",
    type: "Work Project",
  },
];

export default function Project() {
  const sectionRef = useRef(null);
  const wrapperRef = useRef(null);
  const sliderRef = useRef(null);
  const [activeProject, setActiveProject] = useState(null);
  const scrollX = useRef(0);

  /* ===== 패스선 그리기 ===== */
  useEffect(() => {
    const path = sectionRef.current?.querySelector("path");
    if (!path) return;
    const len = path.getTotalLength();
    path.style.strokeDasharray = len;
    path.style.strokeDashoffset = len;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        path.style.transition = "stroke-dashoffset 3s ease-out";
        path.style.strokeDashoffset = "0";
      }
    });
    io.observe(sectionRef.current);
    return () => io.disconnect();
  }, []);

  /* ===== 가로 스크롤 (끝까지) ===== */
  useEffect(() => {
    const wrapper = wrapperRef.current;
    const slider = sliderRef.current;
    if (!wrapper || !slider) return;

    const handleWheel = (e) => {
      const rect = slider.getBoundingClientRect();
      const inside = e.clientY >= rect.top && e.clientY <= rect.bottom;
      if (!inside) return;

      const delta = e.deltaY;
      const contentWidth = wrapper.scrollWidth;
      const containerWidth = slider.clientWidth;
      const maxScroll = Math.max(0, contentWidth - containerWidth + 560); // 🔹 살짝 여유를 줌

      // 끝까지 가면 페이지 스크롤 허용
      if (
        (scrollX.current <= 0 && delta < 0) ||
        (scrollX.current >= maxScroll && delta > 0)
      ) {
        return;
      }

      e.preventDefault();
      scrollX.current = Math.max(
        0,
        Math.min(scrollX.current + delta, maxScroll)
      );
      wrapper.style.transform = `translateX(-${scrollX.current}px)`;
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, []);

  return (
    <section className="project" ref={sectionRef}>
      <svg
        className="project-path"
        xmlns="http://www.w3.org/2000/svg"
        width="597"
        height="1157"
        viewBox="0 0 597 1157"
        fill="none"
      >
        <path
          d="M80.4622 1.34778C-85.5366 183.348 37.9635 402.848 208.963 447.848C699.946 577.055 716.964 870.348 493.964 1155.35"
          stroke="#4FA5DE"
          strokeWidth="4"
        />
      </svg>

      <div className="head">
        <span className="title">Featured Projects</span>
        <button className="view-all">See All Projects ↗</button>
      </div>

      <div className="slider" ref={sliderRef}>
        <div className="slider-wrapper" ref={wrapperRef}>
          {projects.map((p, i) => (
            <div key={i} className="project-item">
              <div className="card" onClick={() => setActiveProject(p)}>
                <img src={p.thumbnail} alt={p.title} />
              </div>
              <div className="info" onClick={() => setActiveProject(p)}>
                <h4>{p.stack}</h4>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {activeProject && (
        <Modal project={activeProject} onClose={() => setActiveProject(null)} />
      )}
    </section>
  );
}
