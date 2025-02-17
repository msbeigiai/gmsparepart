import { useAppSelector } from "@/app/hooks";
import heroImage from "@/assets/heo-image.jpg";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import {
  Battery,
  ChevronRight,
  Clock,
  Droplet,
  Settings,
  Shield,
  Star,
  Truck,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  const { items: featuredProducts } = useAppSelector((state) => state.products);

  const topCategories = [
    {
      icon: <Truck className="h-8 w-8" />,
      name: "Tools",
      count: "2,500+ items",
    },
    {
      icon: <Battery className="h-8 w-8" />,
      name: "Batteries",
      count: "500+ items",
    },
    {
      icon: <Droplet className="h-8 w-8" />,
      name: "Oil & Fluids",
      count: "1,000+ items",
    },
    {
      icon: <Settings className="h-8 w-8" />,
      name: "Engine Parts",
      count: "3,000+ items",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-black text-white">
        <div className="absolute inset-0 bg-gradient-to-r from-black to-transparent">
          <img
            src={heroImage}
            alt="Auto parts hero"
            className="w-full h-full object-cover opacity-50"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Badge className="mb-4">New Customers Save 15%</Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Your One-Stop Shop for Quality Auto Parts
            </h1>
            <p className="text-xl mb-8 text-gray-300">
              Find the perfect parts for your vehicle with our extensive
              collection of premium automotive components.
            </p>
            <div className="flex gap-4">
              <Button size="lg" onClick={() => navigate("/products")}>
                Shop Now
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="text-gray-700"
              >
                <Link to="/products">Find Parts by Vehicle</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center gap-4 p-6 bg-white rounded-lg shadow-sm">
              <Truck className="h-10 w-10 text-primary" />
              <div>
                <h3 className="font-semibold">Free Shipping</h3>
                <p className="text-sm text-gray-600">On orders over $99</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-6 bg-white rounded-lg shadow-sm">
              <Shield className="h-10 w-10 text-primary" />
              <div>
                <h3 className="font-semibold">Warranty Guaranteed</h3>
                <p className="text-sm text-gray-600">30-day money back</p>
              </div>
            </div>
            <div className="flex items-center gap-4 p-6 bg-white rounded-lg shadow-sm">
              <Clock className="h-10 w-10 text-primary" />
              <div>
                <h3 className="font-semibold">24/7 Support</h3>
                <p className="text-sm text-gray-600">Expert assistance</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8">Shop by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {topCategories.map((category, index) => (
              <Card
                key={index}
                className="hover:shadow-lg transition-shadow cursor-pointer"
              >
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="mb-4 p-3 bg-primary/10 rounded-full">
                      {category.icon}
                    </div>
                    <h3 className="font-semibold mb-1">{category.name}</h3>
                    <p className="text-sm text-gray-600">{category.count}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8">Featured Products</h2>
          <Carousel className="w-full">
            <CarouselContent>
              {featuredProducts.map((product) => (
                <CarouselItem
                  key={product.productId}
                  className="md:basis-1/2 lg:basis-1/3"
                >
                  <Card className="m-1">
                    <CardContent className="p-0">
                      <img
                        src={product.imageUrls[0]}
                        alt={product.name}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4">
                        <h3 className="font-semibold mb-2">{product.name}</h3>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="ml-1 text-sm">{4}</span>
                          </div>
                          <span className="text-sm text-gray-600">
                            ({10} reviews)
                          </span>
                        </div>
                        <p className="text-lg font-bold">${product.price}</p>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg mb-8 text-primary-foreground/90">
            Join thousands of satisfied customers who trust us for their auto
            parts needs.
          </p>
          <Button
            size="lg"
            variant="secondary"
            onClick={() => navigate("/products")}
          >
            Browse All Products
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
