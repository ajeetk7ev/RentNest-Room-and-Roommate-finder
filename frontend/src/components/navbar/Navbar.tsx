import { Search, Heart, Home } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';


 function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
      <div className="max-w-[1920px] mx-auto px-6 py-4">
        <div className="flex items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 text-emerald-600">
              <Home className="h-8 w-8" />
              <span className="text-2xl font-bold">HomeHaven</span>
            </div>
          </div>

          <div className="flex-1 max-w-2xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search by city, location, or property type..."
                className="pl-12 pr-4 py-6 text-base rounded-full border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-gray-100"
            >
              <Heart className="h-5 w-5" />
            </Button>

            <Button
              variant="outline"
              className="rounded-full font-medium"
            >
              Sign In
            </Button>

            <Button
              className="rounded-full font-medium bg-emerald-600 hover:bg-emerald-700"
            >
              Add Property
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
