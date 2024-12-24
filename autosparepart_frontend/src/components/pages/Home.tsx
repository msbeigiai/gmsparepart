import { AppDispatch } from '@/app/store';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import ProductCard from '../ProductCard';
import { useEffect } from 'react';
import { fetchProducts } from '@/features/products/productsSlice';

const Home = () => {
  const { items: products, status, error } = useAppSelector((state) => state.products);
  const dispatch: AppDispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  console.log(products);

  return (
    <div className="p-6">
      {status === 'loading' && <p>Loading products...</p>}
      {status === 'failed' && <p className="text-red-500">Error: {error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Home;
