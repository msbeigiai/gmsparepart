import Login from "@/components/pages/Login";
import About from "@/components/pages/About";
import Home from "@/components/pages/Home";
import Profile from "@/components/pages/Profile";
// import NotFound from "@/components/pages/NotFound";
import { Route, Routes } from "react-router-dom";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="/login" element={<Login />} />

    {/* <Route path="*" element={<NotFound />} /> */}
  </Routes>
);

export default AppRoutes;
