import { Outlet } from "react-router-dom";
import Header from "./header";

const Layout = () => {
  return (
    <div className="wrap">
      <div className="site-header">
        <Header />
      </div>
      <main className="main">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
