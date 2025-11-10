import { useRef, useEffect, useState } from "react";
import Modal from "./Modal";
import "./project.scss";

const projects = [
  {
    title: "RoadOn",
    stack: "TypeScript",
    desc: "Typescript를 기반으로 코드의 안정성을 높이고, 영화 속 장면을 실제 여행지와 연결하는 시네마틱 여행사이트 프로젝트입니다.",
    thumbnail: "/images/RoadOn_thumb.png",
    imgSlides: ["/images/RoadOn_1.png", "/images/RoadOn_2.png"],
    github: "https://github.com/Hwanyeong815/RoadOn_Project.git",
    figma:
      "https://www.figma.com/design/D0GaqAdVieSVIW0GFDit8v/2%EC%B0%A8-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-3%EC%A1%B0?node-id=11-2&t=ENl71hbWULOd6NUi-1",
    plan: "https://www.figma.com/proto/zXaFrOF7fqd6D6jTLl3vwT/RoadOn_%EA%B8%B0%ED%9A%8D%EC%84%9C?page-id=0%3A1&node-id=1-270&p=f&viewport=562%2C73%2C0.25&t=d84KGFbD66Jnoufs-1&scaling=min-zoom&content-scaling=fixed",
    site: "https://roadonproject.vercel.app/",
    tools: "React·TypeScript·Zustand·GSAP·SCSS·Swiper·Figma·ChatGPT",
    pages:
      "코딩 : 항공 예약 및 상세페이지\n디자인 : 메인·항공 예약 및 상세 페이지·투어 리스트",
    type: "Team Project",
  },
  {
    title: "Portfolio",
    stack: "React",
    desc: "GSAP과 React를 활용하여 감각적인 인터랙션과 함께 정체성이 돋보이도록 구성한 포트폴리오 프로젝트입니다.",
    thumbnail: "/images/Portfolio_thumb.png",
    imgSlides: ["/images/Portfolio_1.png", "/images/Portfolio_2.png"],
    github: "https://github.com/ksseon/kimseonjuportfolio.git",
    figma:
      "https://www.figma.com/design/ooD4M67t4qlqBny2Tig3J0/kimseonju_frontend_portfolio?node-id=0-1&t=Z33qpQjMVqIJBnAv-1",
    site: "https://kimseonjuportfolio.vercel.app/",
    tools: "React·Vite·SCSS·GSAP·Figma·ChatGPT",
    pages: "Home·About·Project·Contact",
    type: "Personal Project",
  },
  {
    title: "LUSH",
    stack: "React",
    desc: "러쉬의 감정 케어 철학을 K-내추럴 감성으로 재해석한 리디자인 프로젝트입니다.",
    thumbnail: "/images/LUSH_thumb.png",
    imgSlides: ["/images/LUSH_1.png", "/images/LUSH_2.png"],
    github: "https://github.com/SongTam-tam/lush.git",
    figma:
      "https://www.figma.com/design/2HdfThwuCfgNsoDuqWImwY/LUSH-%EB%94%94%EC%9E%90%EC%9D%B8?node-id=342-3202&t=ajt6a7RGos07eesY-1",
    plan: "https://www.figma.com/proto/7obCQB8RJ2HiUtsbMFOrtf/LUSH_%EA%B8%B0%ED%9A%8D%EC%84%9C?page-id=0%3A1&node-id=1-315&p=f&viewport=721%2C-7468%2C0.14&t=kkdgHThYMjieMOqp-1&scaling=min-zoom&content-scaling=fixed",
    site: "https://lush-navy.vercel.app/",
    tools: "React·Vite·GSAP·SCSS·Swiper·Figma·ChatGPT",
    pages:
      "코딩 : 메인·k-컨텐츠 소개·스파안내·로그인·회원가입 디자인 : 메인·로그인·회원가입",
    type: "Team Project",
  },
  {
    title: "Olivia Dean",
    stack: "React",
    desc: "React와 Styled-Components를 활용해 가수 Olivia Dean의 감성과 비주얼 아이덴티티를 웹으로 구현한 아티스트 홈페이지 프로젝트입니다.",
    thumbnail: "/images/Olivia-Dean_thumb.png",
    imgSlides: ["/images/Olivia-Dean_1.png", "/images/Olivia-Dean_2.png"],
    github: "https://github.com/ksseon/Olivia-Dean.git",
    site: "https://olivia-dean.vercel.app/",
    tools: "React·Styled-Components",
    pages: "About·Gallery·Merch·Tour",
    type: "Personal Project",
  },
  {
    title: "Hyundai E&C",
    stack: "JavaScript",
    desc: "현대건설 웹사이트를 사용자 중심 구조로 리디자인하고 접근성을 강화한 프로젝트입니다.",
    thumbnail: "/images/Hyundai-E&C_thumb.png",
    imgSlides: ["/images/Hyundai-E&C_1.png", "/images/Hyundai-E&C_2.png"],
    github: "https://github.com/ksseon/hyundai-enc",
    figma:
      "https://www.figma.com/design/oafY4C1yidKzddwKGW999q/%ED%98%84%EB%8C%80%EA%B1%B4%EC%84%A4?node-id=0-1&t=tPFaV0bLgyKQA2zG-1",
    site: "https://hyundaienc-redesign.vercel.app/",
    tools: "HTML·CSS·JavaScript·Figma",
    pages: "메인·사업소개·채용·뉴스·공지사항",
    type: "Personal Project",
  },
  {
    title: "Knto",
    stack: "JavaScript",
    desc: "한국관광공사의 공식 웹사이트를 바닐라 자바스크립트(Vanilla JS)로 클론코딩으로 구현한 프로젝트입니다.",
    thumbnail: "/images/Knto_thumb.png",
    imgSlides: ["/images/Knto_1.png", "/images/Knto_2.png"],
    github: "https://github.com/ksseon/knto.git",
    site: "https://knto-inky.vercel.app/",
    tools: "HTML·CSS·JavaScript",
    pages: "관광명소 리스트·알림마당·주요사업·공사참여",
    type: "Personal Project",
  },
  {
    title: "Kepco",
    stack: "JavaScript",
    desc: "한국전력공사의 공식 웹사이트를 리디자인하며, 공공기관의 신뢰성과 접근성을 강화한 UX/UI 개선 프로젝트입니다.",
    thumbnail: "/images/Kepco_thumb.png",
    imgSlides: ["/images/Kepco_1.png", "/images/Kepco_2.png"],
    github: "https://github.com/ksseon/kepco",
    figma:
      "https://www.figma.com/design/RnFfvWPa2SHIs4JKTGIbhL/2%EC%B0%A8-%EB%AF%B8%EB%8B%88%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EB%A6%AC%EB%94%94%EC%9E%90%EC%9D%B8?node-id=9-5&t=9Jquo9DmOdQWE7Tq-1",
    site: "https://kepco-sigma.vercel.app/",
    tools: "HTML·CSS·JavaScript·Figma",
    pages: "코딩 및 디자인 : 회사소개·지식센터·민원센터",
    type: "Team Project",
  },
  {
    title: "Kyungdong",
    stack: "JavaScript",
    desc: "경동의 공식 웹사이트를 바닐라 자바스크립트(Vanilla JS)로 클론코딩으로 구현한 프로젝트입니다.",
    thumbnail: "/images/Kyungdong_thumb.png",
    imgSlides: ["/images/Kyungdong_1.png", "/images/Kyungdong_2.png"],
    github: "https://github.com/ksseon/kyungdong",
    site: "https://kyungdong-redesign.vercel.app/",
    tools: "HTML·CSS·JavaScript",
    pages: "메인·제품소개·홍보센터·고객문의",
    type: "Personal Project",
  },
  {
    title: "Bugs Music",
    stack: "Figma / Prototype",
    desc: "벅스뮤직 모바일 앱을 Figma 프로토타입으로 리디자인하여, 감각적인 UI와 직관적인 사용자 경험을 시각적으로 구현한 프로젝트입니다.",
    thumbnail: "/images/Bugs_thumb.png",
    imgSlides: ["/images/Bugs-Music_1.png", "/images/Bugs-Music_2.png"],
    github: "https://github.com/ksseon/bugs-prototype",
    figma:
      "https://www.figma.com/design/Jdc21fIAy5WfNBax4XpG1D/%EC%9E%84%EB%8F%84%ED%9D%AC-%EA%B9%80%EC%9C%A4%EC%95%84-%EA%B9%80%EC%84%A0%EC%A3%BC---%EB%B2%85%EC%8A%A4%EB%AE%A4%EC%A7%81-%EC%95%B1-%EB%A6%AC%EB%94%94%EC%9E%90%EC%9D%B8---%EC%B5%9C%EC%A2%85?node-id=180-7628&t=C51ItVPYAeE1qGcw-1",
    plan: "https://www.figma.com/deck/rJsFjnKBoYdItd4FXMXeL2/Bugs----%EA%B8%B0%ED%9A%8D%EC%84%9C?node-id=32-51&viewport=-1899%2C-26926%2C0.8&t=OdIVomjcHNQGllVt-1&scaling=min-zoom&content-scaling=fixed&page-id=0%3A1",
    site: "https://www.figma.com/proto/Jdc21fIAy5WfNBax4XpG1D/%EC%9E%84%EB%8F%84%ED%9D%AC-%EA%B9%80%EC%9C%A4%EC%95%84-%EA%B9%80%EC%84%A0%EC%A3%BC---%EB%B2%85%EC%8A%A4%EB%AE%A4%EC%A7%81-%EC%95%B1-%EB%A6%AC%EB%94%94%EC%9E%90%EC%9D%B8---%EC%B5%9C%EC%A2%85?page-id=190%3A2622&node-id=2037-5117&p=f&viewport=1150%2C397%2C0.08&t=jYULBe0xh2FAKy7R-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=2037%3A5490&show-proto-sidebar=1",
    tools: "Figma",
    pages: "스플래시·메인·로그인·회원가입",
    type: "Team Project",
  },
  {
    title: "NSSMART",
    stack: "Illustrator / Photoshop",
    desc: "엔에스스마트에서 키오스크, 태블릿, 모바일 앱 등 다양한 디바이스에 최적화된 UI 디자인과 사용자 경험을 구현한 프로젝트입니다.",
    thumbnail: "/images/NSSMART_thumb.png",
    imgSlides: ["/images/NSSMART_1.png", "/images/NSSMART_2.png"],
    figma: "https://www.figma.com/file/xxxx/nssmart",
    tools: "Illustrator·Photoshop",
    pages: "키오스크·대시보드·테블릿·모바일앱",
    type: "Work Project",
  },
];

export default function Project() {
  const sectionRef = useRef(null);
  const wrapperRef = useRef(null);
  const sliderRef = useRef(null);
  const [activeProject, setActiveProject] = useState(null);
  const scrollX = useRef(0);

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

  /* 가로 스크롤 ===== */
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
      const maxScroll = Math.max(0, contentWidth - containerWidth + 560);

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
