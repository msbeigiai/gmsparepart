import { useAppSelector } from '@/app/hooks';
import ProductCard from './ProductCard';

const Products = () => {

  const { items: products, status, error } = useAppSelector((state) => state.products);

  console.log("PRODUCTS: ", products);

  return (
    <div className="p-6">
      {status === 'loading' && <p>Loading products...</p>}
      {status === 'failed' && <p className="text-red-500">Error: {error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          // <Link to={`/products/${product.productId}`} key={product.productId}>{product.name}
          <ProductCard key={product.productId} product={product} />
          // </Link>
        ))}
      </div>
    </div>
  )
}

export default Products