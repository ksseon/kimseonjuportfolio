import { Outlet } from "react-router-dom";
import Header from "./header";
import TopButton from "./TopButton";

const Layout = () => {
  return (
    <div className="wrap">
      <div className="site-header">
        <Header />
      </div>
      <main className="main">
        <Outlet />
      </main>
      <TopButton />
    </div>
  );
};

export default Layout;
