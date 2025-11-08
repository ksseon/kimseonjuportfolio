import { useEffect } from "react";
import "./modal.scss";

export default function Modal({ project, onClose }) {
  if (!project) return null;

  // 모달 열릴 때 body 스크롤 잠금 / 닫힐 때 복구
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev || "auto";
    };
  }, []);

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close" onClick={onClose}>
          ✕
        </button>

        <div className="modal-top">
          <span className="stack">{project.stack}</span>
          <h2>{project.title}</h2>
          <p className="desc">{project.desc}</p>

          <div className="modal-links">
            <a href={project.github} target="_blank" rel="noreferrer">
              Github ↗
            </a>
            <a href={project.figma} target="_blank" rel="noreferrer">
              Figma ↗
            </a>
            <a
              href={project.site}
              target="_blank"
              rel="noreferrer"
              className="primary"
            >
              View Web Page ↗
            </a>
          </div>

          <div className="info-section">
            <div className="info-box">
              <h5>Tools</h5>
              <p>{project.tools}</p>
            </div>
            <div className="info-box">
              <h5>Pages</h5>
              <p>{project.pages}</p>
            </div>
            <div className="info-box">
              <h5>Type</h5>
              <p>{project.type}</p>
            </div>
          </div>
        </div>

        {/* 이미지 2개 고정 */}
        <div className="modal-slider two-images">
          {project.imgSlides?.slice(0, 2).map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`${project.title} project image ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
