import About from "@/components/pages/About";
import Home from "@/components/pages/Home";
import Profile from "@/components/pages/Profile";
// import NotFound from "@/components/pages/NotFound";
import CheckoutStepper from "@/components/pages/CheckoutStepper";
import Order from "@/components/pages/Order";
import SampleProductDetails from "@/components/pages/SampleProductDetails";
import Products from "@/components/Products";
import { Route, Routes } from "react-router-dom";
import UploadProductImage from "@/components/UploadProductImage";
import AdminPage from "@/components/admin/AdminPage";
import UploadProducts from "@/components/admin/UploadProducts";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="/products/:productId" element={<SampleProductDetails />} />
    <Route path="/products" element={<Products />} />
    <Route path="/orders/:orderId" element={<Order />} />
    <Route path="/checkout" element={<CheckoutStepper />} />
    <Route path="/upload-images" element={<UploadProductImage />} />
    <Route path="/admin" element={<AdminPage />} />
    <Route path="/admin/upload-products" element={<UploadProducts />} />
    {/* <Route path="*" element={<NotFound />} /> */}
  </Routes>
);

export default AppRoutes;
