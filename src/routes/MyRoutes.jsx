import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../common/Layout";
import ScrollToTop from "../common/ScrollToTop";
import { Home, About, Project, Contact } from "../pages";

export const MyRoutes = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="project" element={<Project />} />
          <Route path="contact" element={<Contact />} />
          {/* <Route path="*" element={<NotFound />} /> */}
        </Route>
      </Routes>
    </>
  );
};
