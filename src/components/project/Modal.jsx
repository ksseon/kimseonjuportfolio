import { useEffect } from "react";
import { createPortal } from "react-dom";
import "./modal.scss";

export default function Modal({ project, onClose }) {
  if (!project) return null;
  let modalRoot = document.getElementById("modal-root");
  if (!modalRoot) {
    modalRoot = document.createElement("div");
    modalRoot.id = "modal-root";
    document.body.appendChild(modalRoot);
  }

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const header = document.querySelector("#site-header");
    if (header) header.style.pointerEvents = "none";

    // ✅ cleanup
    return () => {
      document.body.style.overflow = prevOverflow || "auto";
      if (header) header.style.pointerEvents = "auto";
    };
  }, []);

  return createPortal(
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close" onClick={onClose}>
          ✕
        </button>

        <div className="modal-top">
          <span className="stack">{project.stack}</span>
          <h2>{project.title}</h2>
          <p className="desc">{project.desc}</p>

          {/* 프로젝트별 버튼 */}
          <div className="modal-links">
            {/* Bugs Music*/}
            {project.title === "Bugs Music" ? (
              <>
                <a href={project.figma} target="_blank" rel="noreferrer">
                  Figma ↗
                </a>
                {project.plan && (
                  <a href={project.plan} target="_blank" rel="noreferrer">
                    기획서 ↗
                  </a>
                )}
              </>
            ) : project.title === "NSSMART" ? (
              // NSSMART
              <>
                <a href={project.figma} target="_blank" rel="noreferrer">
                  Figma ↗
                </a>
              </>
            ) : (
              // 나머지 프로젝트
              <>
                <a href={project.github} target="_blank" rel="noreferrer">
                  Github ↗
                </a>
                <a href={project.figma} target="_blank" rel="noreferrer">
                  Figma ↗
                </a>
                {project.plan && (
                  <a href={project.plan} target="_blank" rel="noreferrer">
                    기획서 ↗
                  </a>
                )}
                <a
                  href={project.site}
                  target="_blank"
                  rel="noreferrer"
                  className="primary"
                >
                  View Web Page ↗
                </a>
              </>
            )}
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
    </div>,
    modalRoot
  );
}
