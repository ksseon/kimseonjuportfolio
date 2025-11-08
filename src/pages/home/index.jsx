import About from "../../components/about/About";
import Home from "../../components/home/Home";
import Process from "../../components/process/Process";
import Project from "../../components/project/Project";
import Hobbies from "../../components/hobbies/Hobbies";
import Contact from "../../components/contact/Contact";
import "./style.scss";

function HomePage() {
  return (
    <main className="HomePage">
      <Home />
      <About />
      <Process />
      <Project />
      <Hobbies />
      <Contact />
    </main>
  );
}
export default HomePage;
