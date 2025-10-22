import About from "../../components/about/about";
import HomeVisual from "../../components/home/visual/HomeVisual";
import "./style.scss";

function Home() {
  return (
    <main className="home">
      <HomeVisual />
      <About />
    </main>
  );
}

export default Home;
