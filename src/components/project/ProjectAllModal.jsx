import { useEffect, useState } from "react";
import Modal from "./Modal";
import "./projectAllModal.scss";
import { IoClose } from "react-icons/io5";

const ProjectAllModal = ({ projects, onClose }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeProject, setActiveProject] = useState(null);

  // === body scroll + wheel 가로 스크롤까지 완전 차단 ===
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.setProperty("overflow", "hidden", "important");

    const stopWheel = (e) => e.preventDefault();
    window.addEventListener("wheel", stopWheel, { passive: false });

    const header = document.querySelector("#site-header");
    if (header) header.style.pointerEvents = "none";

    return () => {
      document.body.style.setProperty(
        "overflow",
        prevOverflow || "auto",
        "important",
      );
      window.removeEventListener("wheel", stopWheel);
      if (header) header.style.pointerEvents = "auto";
    };
  }, []);

  const categories = [
    "All",
    "React",
    "JavaScript",
    "Figma / Prototype",
    "Illustrator / Photoshop",
  ];

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((p) => p.stack.includes(selectedCategory));

  return (
    <div className="project-all-modal" onWheel={(e) => e.stopPropagation()}>
      <div className="overlay" onClick={onClose}></div>

      <div className="modal-box" onWheel={(e) => e.stopPropagation()}>
        <button className="close" onClick={onClose} aria-label="Close modal">
          <IoClose />
        </button>

        <h2 className="modal-title">All Projects</h2>

        <div className="category-bar">
          {categories.map((cat) => (
            <button
              key={cat}
              className={selectedCategory === cat ? "active" : ""}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="project-grid">
          {filteredProjects.map((p, i) => (
            <div
              key={i}
              className="project-card"
              onClick={() => setActiveProject(p)}
            >
              <img src={p.thumbnail} alt={p.title} />
              <div className="info">
                <h4>{p.stack}</h4>
                <h3>{p.title}</h3>
              </div>
            </div>
          ))}
        </div>

        {activeProject && (
          <Modal
            project={activeProject}
            onClose={() => setActiveProject(null)}
          />
        )}
      </div>
    </div>
  );
};

export default ProjectAllModal;
