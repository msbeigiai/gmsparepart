import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Search, User, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/app/hooks";
import UserStatusHover from "../UserStatusHover";
import useAuth from "@/hooks/useAuth";

const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [showUserEmail, setShowUserEmail] = React.useState(false);
  const navigate = useNavigate();
  const {isAuthenticated, user} = useAppSelector((state) => state.auth); 

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
          <Button variant="ghost" size="icon">
            <ShoppingCart />
          </Button>

          {isAuthenticated ? (
            <Link to="/profile"> 
              {user?.email && (
                <UserStatusHover />
              )}
            </Link>
          ) : (
            <Link to="/login">
              <Button variant="ghost" size="icon">
                <User />
              </Button>
            </Link>
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
