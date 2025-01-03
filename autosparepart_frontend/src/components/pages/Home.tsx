import { AppDispatch } from '@/app/store';
import Products from '../Products';
import LandingPage from './LandingPage';
import { useAppDispatch } from '@/app/hooks';
import { useEffect } from 'react';
import { fetchProducts } from '@/features/products/productsSlice';
import { fetchAddresses } from '@/features/address/addressSlice';

const Home = () => {

  const dispatch: AppDispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchAddresses());
  }, [dispatch]);
 

  return (
    <div>
      <LandingPage />
      {/* <Products  /> */}
    </div>
  );
};

export default Home;
