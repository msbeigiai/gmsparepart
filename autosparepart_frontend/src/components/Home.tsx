import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { authenticateUser, keycloak } from '../features/auth/authSlice';
import { fetchProducts } from '../features/products/productsSlice';
import ProductCard from './ProductCard';

const Home = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const { items: products, status, error } = useAppSelector((state) => state.products);

  useEffect(() => {
    if (!isAuthenticated) {
      const initializeAuth = async () => {
        await dispatch(authenticateUser());

        if (!keycloak.authenticated) {
          navigate('/login');
        } else {
          dispatch(fetchProducts());
        }
      };
      initializeAuth();
    }
  }, [dispatch, navigate, isAuthenticated]);

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
