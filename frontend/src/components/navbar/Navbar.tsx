import { Search, Heart, Home, Menu as MenuIcon, X } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useState } from "react";
import { Link } from "react-router-dom";
function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
      <div className="max-w-[1920px] mx-auto px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2 text-emerald-600">
            <Home className="h-8 w-8" />
            <span className="text-2xl font-bold">HomeHaven</span>
          </div>

          {/* Search (hidden on mobile) */}
          <div className="flex-1 max-w-2xl hidden md:block">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search by city, location, or property type..."
                className="pl-12 pr-4 py-2 text-base rounded-full border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-gray-100"
            >
              <Heart className="h-5 w-5" />
            </Button>
            <Link
              to="/signin"
              className="rounded-full font-medium border border-emerald-600 text-emerald-600 px-4 py-1 hover:bg-emerald-600 hover:text-white transition-colors duration-200"
            >
              Sign In
            </Link>
            <Button className="rounded-full font-medium bg-emerald-600 hover:bg-emerald-700">
              Add Property
            </Button>
          </div>

          {/* Mobile Hamburger Menu */}
          <div className="md:hidden">
            <DropdownMenu
              open={mobileMenuOpen}
              onOpenChange={setMobileMenuOpen}
            >
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  {mobileMenuOpen ? (
                    <X className="h-5 w-5" />
                  ) : (
                    <MenuIcon className="h-5 w-5" />
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48 p-2">
                <DropdownMenuItem className="flex items-center gap-2">
                  <Heart className="h-4 w-4" /> Favorites
                </DropdownMenuItem>
                <DropdownMenuItem>Sign In</DropdownMenuItem>
                <DropdownMenuItem>Add Property</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Optional mobile search (below navbar) */}
        <div className="mt-2 md:hidden">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search by city, location, or property type..."
              className="pl-12 pr-4 py-2 text-base rounded-full border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
            />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
