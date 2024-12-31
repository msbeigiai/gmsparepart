import { useAppSelector } from "@/app/hooks";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Menu, Search, ShoppingCart, User } from "lucide-react";
import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import UserStatusHover from "../UserStatusHover";
import { keycloak } from "@/features/auth/authSlice";


const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [showUserEmail, setShowUserEmail] = React.useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const [loginUrl, setLoginUrl] = React.useState<string | null>(null);
  const { items } = useAppSelector((state) => state.localCart);

  const handleLogin = () => {
    keycloak.login();
  };

  const totalItems = items.reduce((total, item) => total + item.quantity, 0);


  return (
    <nav className={cn("bg-card text-card-foreground shadow-md")}>
      <div className="container mx-auto px-4 flex justify-between items-center h-16">
        {/* Left: Logo */}
        <Link to="/" className="text-xl font-bold">
          SparePartsHub
        </Link>

        {/* Center: Navigation Links */}
        <div className="hidden md:flex space-x-8">
          <Link to="/products" className="hover:text-primary">
            Products
          </Link>
          <Link to="/about" className="hover:text-primary">
            About Us
          </Link>
          <Link to="/contact" className="hover:text-primary">
            Contact
          </Link>
        </div>

        {/* Right: Action Icons */}
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <Search />
          </Button>
          {/* Shopping Cart with Badge */}
          <Button
            variant="ghost"
            className="relative"
            onClick={() => navigate("/checkout")}
          >
            <ShoppingCart className="h-5 w-5" />
            {totalItems > 0 && (
              <Badge
                variant="secondary"
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center"
              >
                {totalItems}
              </Badge>
            )}
          </Button>

          {isAuthenticated ? (
            <Link to="/profile">
              {user?.email && (
                <UserStatusHover />
              )}
            </Link>
          ) : (
            <Button variant="ghost" size="icon" onClick={handleLogin}>
              <User />
            </Button>
          )}

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu />
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-card text-card-foreground space-y-2 p-4">
          <Link to="/products" className="block hover:text-primary">
            Products
          </Link>
          <Link to="/about" className="block hover:text-primary">
            About Us
          </Link>
          <Link to="/contact" className="block hover:text-primary">
            Contact
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
