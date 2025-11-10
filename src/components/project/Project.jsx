import { useRef, useEffect, useState } from "react";
import Modal from "./Modal";
import ProjectAllModal from "./ProjectAllModal";
import "./project.scss";
import { projects } from "../../api/projectData";

const Project = () => {
  const sectionRef = useRef(null);
  const wrapperRef = useRef(null);
  const sliderRef = useRef(null);
  const [activeProject, setActiveProject] = useState(null);
  const [showAll, setShowAll] = useState(false);
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
        <button className="view-all" onClick={() => setShowAll(true)}>
          See All Projects ↗
        </button>
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

      {showAll && (
        <ProjectAllModal
          projects={projects}
          onClose={() => setShowAll(false)}
        />
      )}
    </section>
  );
};

export default Project;
