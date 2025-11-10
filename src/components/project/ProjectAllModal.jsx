import { useState } from "react";
import Modal from "./Modal";
import "./projectAllModal.scss";
import { IoClose } from "react-icons/io5";

const ProjectAllModal = ({ projects, onClose }) => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeProject, setActiveProject] = useState(null);

  const categories = [
    "All",
    "TypeScript",
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
    <div className="project-all-modal">
      <div className="overlay" onClick={onClose}></div>
      <div className="modal-box">
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
