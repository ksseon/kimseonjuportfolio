import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../common/Layout";
import ScrollToTop from "../common/ScrollToTop";
import { Home } from "../pages";

export const MyRoutes = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          {/* <Route path="*" element={<NotFound />} /> */}
        </Route>
      </Routes>
    </>
  );
};
