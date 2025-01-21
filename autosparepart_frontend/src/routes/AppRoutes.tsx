import About from "@/components/pages/About";
import Home from "@/components/pages/Home";
import Profile from "@/components/pages/Profile";
// import NotFound from "@/components/pages/NotFound";
import CheckoutStepper from "@/components/pages/CheckoutStepper";
import { Route, Routes } from "react-router-dom";
import ProductDetails from "@/components/pages/ProductDetails";
import Products from "@/components/Products";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="/products/:productId" element={<ProductDetails />} />
    <Route path="/products" element={<Products />} />

    {/* <Route path="/login" element={<Login />} /> */}
    <Route path="/checkout" element={<CheckoutStepper />} />

    {/* <Route path="*" element={<NotFound />} /> */}
  </Routes>
);

export default AppRoutes;
