import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { getAllCategories } from "@/features/category/categorySlice";
import { fetchProducts } from "@/features/products/productsSlice";
import { LoaderCircle } from "lucide-react";
import { useEffect } from "react";
import ProductCard from "./ProductCard";
import CategorySidebar from "./pages/CategorySidebar";

const Products = () => {
  const dispatch = useAppDispatch();
  const {
    items: products,
    status,
    error,
  } = useAppSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(getAllCategories());
  }, []);

  return (
    <div className="p-6 flex">
      <div className="mr-2">
        <CategorySidebar />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center">
        {status === "loading" && (
          <div className="flex items-center justify-center h-full w-full">
            <LoaderCircle size={100} />
          </div>
        )}
        {status === "failed" && (
          <div className="flex items-center justify-center h-full w-full">
            <p className="text-red-500">Error: {error}</p>
          </div>
        )}
        {products.length === 0 &&
          status !== "loading" &&
          status !== "failed" && (
            <div className="flex items-center justify-center h-full w-full">
              <p className="text-gray-500 mt-4">No products found.</p>
            </div>
          )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1">
          {products.map((product) => (
            <ProductCard key={product.productId} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
