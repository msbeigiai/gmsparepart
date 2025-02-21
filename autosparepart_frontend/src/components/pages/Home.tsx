import { useAppDispatch } from "@/app/hooks";
import { AppDispatch } from "@/app/store";
import { fetchAddresses } from "@/features/address/addressSlice";
import { getAllCategories } from "@/features/category/categorySlice";
import { fetchProducts } from "@/features/products/productsSlice";
import { useEffect } from "react";
import LandingPage from "./LandingPage";

const Home = () => {
  const dispatch: AppDispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchAddresses());
    dispatch(getAllCategories());
  }, []);

  return (
    <div>
      <LandingPage />
    </div>
  );
};

export default Home;
