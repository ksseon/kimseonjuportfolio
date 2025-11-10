import { Outlet } from "react-router-dom";
import Header from "./header";
import TopButton from "./TopButton"; // ✅ 탑버튼 추가

const Layout = () => {
  return (
    <div className="wrap">
      <div className="site-header">
        <Header />
      </div>
      <main className="main">
        <Outlet />
      </main>

      {/* ✅ 스크롤 시 표시되는 탑버튼 */}
      <TopButton />
    </div>
  );
};

export default Layout;
