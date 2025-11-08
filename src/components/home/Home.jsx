import { useLayoutEffect, useRef, useState, useEffect, useMemo } from "react";
import gsap from "gsap";
import "./style.scss";

const TOKENS = [
  "<",
  ">",
  "{",
  "}",
  "(",
  ")",
  "[",
  "]",
  "/",
  ";",
  "=",
  ":",
  ".",
  ",",
];

const INTRO_DRAW_DURATION = 8.0;
const INTRO_FADE_DURATION = 0.35;
const INTRO_WRAP_FADE = 0.28;

const SEONJU_PATH_D =
  "M-504 76.564C-459.866 75.2966 -210.445 183.18 -96 159.454C47.0563 129.796 138.168 12.3923 296 106.222C484.959 218.557 575 151.85 587.38 141.203C599.907 130.43 633.645 107.943 636.08 56.2321C636.587 61.8088 632.08 82.6477 650.537 101.86C664.873 116.782 673.276 138.289 647.494 151.85C633.036 159.454 619.593 156.159 616.295 151.85C623.86 161.736 653.412 171.448 680.214 158.694C696.194 151.089 714.035 131.925 723.588 106.222C733.48 79.6059 752 75.5 761.634 82.6477C775.459 92.9037 769 113 753.5 121.5C734.874 131.714 716.739 129.796 722.827 108.211C715.217 122.952 732.885 167.763 773.048 157.933C810.334 148.808 809.573 99.3778 846.859 84.9291C833.162 89.4918 811.704 107.895 817.183 132.838C824.031 164.017 855.23 159.454 855.23 159.454C855.23 159.454 895.327 156.911 889.472 109.264C884.145 65.9176 862.358 78.8454 860.556 90.2523C858.273 104.701 864.361 134.359 900.125 134.359C935.889 134.359 940.756 73.2129 960.5 80.5C972.5 84.9291 953.61 148.041 964.5 146C976.675 143.719 988.081 82.6477 1023 84.9291C1045.79 86.4181 1032.45 111.555 1036.33 141.964C1039.38 165.781 1069.53 159.697 1084.27 132.838C1096.19 111.119 1092.64 91.7732 1091.12 76.564C1089.6 61.3548 1080.47 24.3357 1070.58 3.80342C1067.96 -1.62603 1108.22 22.1619 1112.43 24.3358C1116.62 26.4995 1107.45 31.2554 1103.3 34.2217C1092.64 41.8263 1089.34 45.3751 1085.79 46.3891C1100.25 99.6212 1091.12 166.146 1091.12 192.914C1091.12 226.375 1091.12 320.872 1059.16 329.28C1022.64 338.889 1021.11 250.192 1080.47 190.876C1117.19 154.174 1140.16 128.496 1145.15 119.15C1149.89 110.268 1158.84 81.3702 1162.65 76.564C1167 71.0655 1145.15 100.899 1148.95 129.796C1152.76 158.694 1174.82 158.937 1187 150.572C1209.02 135.444 1205.26 123.195 1211.35 80.6097C1208.65 108.747 1204.98 145.508 1223.52 153.614C1235.7 158.937 1250.16 158.924 1277.55 132.838C1298.86 112.549 1345 76.564 1431 90.2523C1538 109.264 1575.4 157.933 1650.27 149.276C1689.82 144.704 1672.5 91.2993 1641.5 106.222C1610.5 121.144 1636.66 198.735 1745 192.914C2013 178.516 2002.5 -38 2701 149.276";

const WHO_RIGHT_PATH_D =
  "M925 2C776.15 20.94 460.661 34.1219 435.53 119.502C423.957 158.823 449.997 169.619 462.536 158.823C487.612 137.231 433.119 50.2969 312.56 149.732C192.001 249.167 49.7414 228.143 2.00001 228.143";

const Home = () => {
  const wrapRef = useRef(null);
  const introPathRef = useRef(null);
  const whoRightPathRef = useRef(null);

  const [stage, setStage] = useState("intro");
  const [showIntro, setShowIntro] = useState(true);
  const particlesInitRef = useRef(false);
  const whoDrawnRef = useRef(false);

  const prefersReducedMotion = useMemo(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  );

  /* 전역 클래스 관리 */
  useEffect(() => {
    const html = document.documentElement;
    if (stage === "intro") html.classList.add("intro-active");
    else html.classList.remove("intro-active");
    return () => html.classList.remove("intro-active");
  }, [stage]);

  const particles = useMemo(() => {
    return Array.from({ length: 28 }).map(() => {
      const size = 10 + Math.random() * 12;
      const hue = Math.floor(Math.random() * 40) + 190;
      const alpha = Math.random() * 0.4 + 0.25;
      return {
        left: `${Math.random() * 100}%`,
        bottom: `${Math.random() * 12}%`,
        fontSize: `${size}px`,
        h: hue,
        a: alpha,
        char: TOKENS[Math.floor(Math.random() * TOKENS.length)],
      };
    });
  }, []);

  useLayoutEffect(() => {
    const scope = wrapRef.current;
    if (!scope) return;

    const ctx = gsap.context(() => {
      /*  인트로  */
      if (stage === "intro" && showIntro) {
        const p = introPathRef.current;
        if (p) {
          const len = p.getTotalLength();
          gsap.set(p, {
            strokeDasharray: len,
            strokeDashoffset: len,
            opacity: 1,
          });

          if (prefersReducedMotion) {
            gsap.set(p, { strokeDashoffset: 0, opacity: 0 });
            gsap.set(".intro", { autoAlpha: 0 });
            setShowIntro(false);
            setStage("hero");
          } else {
            gsap
              .timeline()
              .to(p, {
                strokeDashoffset: 0,
                duration: INTRO_DRAW_DURATION,
                ease: "none",
              })
              .to(p, {
                attr: { "stroke-width": 0 },
                opacity: 0,
                duration: INTRO_FADE_DURATION,
                ease: "power2.inOut",
              })
              .to(
                ".intro",
                { autoAlpha: 0, duration: INTRO_WRAP_FADE, ease: "power2.out" },
                "-=0.85"
              )
              .add(() => {
                setShowIntro(false);
                setStage("hero");
              });
          }
        }
      }

      /* 히어로  */
      if (stage === "hero") {
        // 파티클
        if (!particlesInitRef.current && !prefersReducedMotion) {
          const bits = gsap.utils.toArray(".codebit");
          bits.forEach((el) => {
            gsap.set(el, { y: 0, opacity: gsap.utils.random(0.55, 0.95) });
            const rise = gsap.utils.random(220, 460);
            const duration = gsap.utils.random(3.2, 6.5);
            gsap.to(el, {
              y: -rise,
              opacity: 0,
              duration,
              ease: "none",
              repeat: -1,
              delay: gsap.utils.random(0, 1.2),
              onRepeat() {
                gsap.set(el, { y: 0, opacity: gsap.utils.random(0.55, 0.95) });
              },
            });
          });
          particlesInitRef.current = true;
        }

        // 오른쪽 곡선 + 순차 콘텐츠
        if (!whoDrawnRef.current) {
          const path = whoRightPathRef.current;
          if (path) {
            const len = path.getTotalLength();

            gsap.set(
              [
                ".who-center",
                ".hero__headline",
                ".hero__left",
                ".hero__caption",
                ".hero__desc",
              ],
              { autoAlpha: 0, y: 20 }
            );

            if (prefersReducedMotion) {
              gsap.set(path, {
                strokeDasharray: len,
                strokeDashoffset: 0,
                opacity: 1,
              });
              gsap.set([".hero__left", ".hero__caption", ".hero__desc"], {
                autoAlpha: 1,
                y: 0,
              });
            } else {
              gsap
                .timeline({ defaults: { ease: "power2.out" } })
                .set(path, {
                  strokeDasharray: len,
                  strokeDashoffset: len,
                  opacity: 1,
                })
                .to(path, { strokeDashoffset: 0, duration: 2.2, delay: 0.2 }) // 1) 라인 드로우
                .to(
                  ".who-center",
                  { autoAlpha: 1, y: 0, duration: 0.6 },
                  "-=0.8"
                ) // 2) Who am I?
                .to(
                  ".hero__headline",
                  { autoAlpha: 1, y: 0, duration: 0.8 },
                  "-=0.2"
                ) // 3) 중앙 헤드라인
                .to(
                  ".hero__headline",
                  { autoAlpha: 0, y: -10, duration: 0.4 },
                  "+=1.5"
                ) // 4) 잠시 유지 후 사라짐
                .to(
                  ".hero__left",
                  { autoAlpha: 1, y: 0, duration: 0.7 },
                  "-=0.1"
                )
                .to(
                  ".hero__caption",
                  { autoAlpha: 1, y: 0, duration: 0.6 },
                  "-=0.4"
                )
                .to(
                  ".hero__desc",
                  { autoAlpha: 1, y: 0, duration: 0.7 },
                  "-=0.05"
                );
            }

            whoDrawnRef.current = true;
          }
        }
      }
    }, scope);

    return () => ctx.revert();
  }, [stage, showIntro, prefersReducedMotion]);

  return (
    <section ref={wrapRef} className="intro-hero visual">
      {/* 비디오 배경 */}
      <video
        className="visual__bg"
        src="/ocean4.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* 오버레이 */}
      <div
        className={`visual__overlay ${
          stage === "hero" ? "overlay--dark" : "overlay--intro"
        }`}
      />

      {/* 인트로(단독) */}
      {showIntro && (
        <div
          className={`intro ${stage === "intro" ? "is-active" : ""}`}
          aria-hidden={stage !== "intro"}
        >
          <svg
            className="intro__route"
            viewBox="-509 -40 2922 410"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path ref={introPathRef} className="route" d={SEONJU_PATH_D} />
          </svg>
        </div>
      )}

      {/* ===== 히어로(인트로 중에는 CSS로 숨김 처리) ===== */}
      <div
        className={`hero ${stage === "hero" ? "is-active" : ""}`}
        aria-hidden={stage !== "hero"}
      >
        <span className="who-center">Who am I ?</span>

        {/* 중앙 대형 헤드라인  */}
        <div className="headline-layer">
          <h2 className="hero__headline">
            한계 없이 항해하는 <br />
            프론트엔드 개발자 선주입니다.
          </h2>
        </div>

        {/* 패스선 */}
        <svg
          className="who-right-curve"
          viewBox="0 0 940 232"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            ref={whoRightPathRef}
            d={WHO_RIGHT_PATH_D}
            className="who-right-path"
          />
        </svg>

        {/* 파티클 */}
        <div className="hero__field" aria-hidden="true">
          {particles.map((p, i) => (
            <span
              key={i}
              className="codebit"
              style={{
                left: p.left,
                bottom: p.bottom,
                fontSize: p.fontSize,
                ["--h"]: p.h,
                ["--a"]: p.a,
              }}
            >
              {p.char}
            </span>
          ))}
        </div>

        {/* 중앙 그리드: 좌/우 콘텐츠 */}
        <div className="hero__grid">
          <div className="hero__left">
            <h1 className="hero__name">
              <span className="hero__name-text">선주;</span>
            </h1>
            <p className="hero__caption">ship owner / 배의 주인</p>
          </div>

          <div className="hero__right">
            <p className="hero__desc">
              배의 주인, 선주는 혼자 앞서가는 사람이 아니라, 바람을 읽고 모두가
              안전하게 나아가도록 돛과 노를 함께 맞추는 조율자입니다. 이처럼
              저도 팀원 및 동료들과 협력하여 각자의 강점을 모아 하나의 큰 바다를
              향해 나아가겠습니다. 또한 끊임없이 밀려오는 파도 속에서도 도전을
              두려워하지 않고, 나침반이 올바른 길을 가르키듯 사용자를 위한
              직관적이고 편리한 여정을 설계하는 개발자가 되고자 합니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
