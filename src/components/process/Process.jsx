import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./style.scss";

gsap.registerPlugin(ScrollTrigger);

const Process = () => {
  const sectionRef = useRef(null);
  const pathRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const path = pathRef.current;
      if (path) {
        const length = path.getTotalLength();
        path.style.strokeDasharray = length;
        path.style.strokeDashoffset = length;

        gsap.to(path, {
          strokeDashoffset: 0,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            end: "bottom 30%",
            scrub: 1.5,
          },
          ease: "power2.inOut",
        });
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".work",
          start: "top 90%",
          end: "bottom top",
          scrub: 1,
        },
      });

      tl.fromTo(".rl", { y: "350%" }, { y: "-120%" }, 0);
      tl.fromTo(".rr", { y: "300%" }, { y: "-80%" }, 0);

      gsap.fromTo(
        ".rtitle",
        { x: "45vw", y: "10vh", opacity: 0.2 },
        {
          x: "0vw",
          y: "80vh",
          opacity: 0.5,
          ease: "none",
          scrollTrigger: {
            trigger: ".work",
            start: "bottom 6%",
            end: "bottom -100%",
            scrub: 2,
            markers: false,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="work" ref={sectionRef}>
      <svg
        className="process-path"
        xmlns="http://www.w3.org/2000/svg"
        width="617"
        height="1194"
        viewBox="0 0 617 1194"
        fill="none"
      >
        <path
          ref={pathRef}
          d="M37.4956 -22.5C477.496 17.4998 748.996 352.5 611.868 603C461.581 877.54 227.361 735.299 249.368 640.5C281.868 500.5 646.868 879.5 249.368 1087.5C172.411 1129.67 15.1956 1262.8 1.99561 1458"
          stroke="#4FA5DE"
          strokeWidth="4"
        />
      </svg>
      <p className="rtitle">Process Work</p>
      <div className="review-wrp">
        <div className="review rl">
          <div className="rhead">
            <strong>Planning</strong>
            <div className="step">
              Step<p>1</p>
            </div>
          </div>
          <div className="content">
            WBS 일정표를 기반으로 체계적으로 일정을 수립하고, 페르소나 및 정보
            구조(IA) 설계를 통해 사용자 이해와 프로젝트 방향성을 명확히
            했습니다.
          </div>
          <div className="pic">
            <img src="/images/Planning.png" alt="Planning" />
          </div>
        </div>

        <div className="review rr">
          <div className="rhead">
            <strong>Design</strong>
            <div className="step">
              Step<p>2</p>
            </div>
          </div>
          <div className="content">
            Figma를 활용해 와이어프레임과 프로토타입을 제작하고, 팀원들과 실시간
            피드백을 통해 사용자 중심 UI/UX를 완성했습니다.
          </div>
          <div className="pic">
            <img src="/images/Design.png" alt="Design" />
          </div>
        </div>

        <div className="review rl">
          <div className="rhead">
            <strong>Development</strong>
            <div className="step">
              Step<p>3</p>
            </div>
          </div>
          <div className="content">
            GitHub을 통한 브랜치 관리 및 코드 리뷰로 협업 품질을 향상시키고,
            적극적인 커뮤니케이션 중심으로 개발을 진행했습니다.
          </div>
          <div className="pic">
            <img src="/images/Development.png" alt="Development" />
          </div>
        </div>

        <div className="review rr">
          <div className="rhead">
            <strong>Presentation</strong>
            <div className="step">
              Step<p>4</p>
            </div>
          </div>
          <div className="content">
            프로젝트 발표에서 피드백을 반영해 완성도를 높이고, 팀원과 협력하여
            평가 기준에 부합하는 결과물을 도출했습니다.
          </div>
          <div className="pic">
            <img src="/images/Presentation.png" alt="Presentation" />
          </div>
        </div>
      </div>
    </section>
  );
};
export default Process;
