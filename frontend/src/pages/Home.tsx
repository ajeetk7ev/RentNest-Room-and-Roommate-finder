import React, { useState } from "react";
import FilterSidebar from "@/components/home/FilterSidebar";
import ListingCard from "@/components/home/ListingCard";
import type { Listing } from "@/types";
import Navbar from "@/components/navbar/Navbar";
import { Button } from "@/components/ui/button";

const HomePage: React.FC = () => {
  const [filters, setFilters] = useState({});
  const [showFilters, setShowFilters] = useState(false);

  // Dummy data (replace later with API call)
  const listings: Listing[] = [
    {
      _id: "123",
      title: "Modern 1BHK Apartment",
      city: "Bangalore",
      address: "HSR Layout, Sector 2",
      price: 15000,
      type: "apartment",
      furnished: true,
      images: [
        "https://res.cloudinary.com/ddty1oyzq/image/upload/v1760779474/images/iyfzvqndznblsqfponqi.jpg",
        "https://res.cloudinary.com/ddty1oyzq/image/upload/v1760779473/images/b52ie4uk8jmcf6ldvixq.jpg",
        "https://res.cloudinary.com/ddty1oyzq/image/upload/v1760779474/images/iyfzvqndznblsqfponqi.jpg",
        "https://res.cloudinary.com/ddty1oyzq/image/upload/v1760779473/images/b52ie4uk8jmcf6ldvixq.jpg",
      ],
      available: true,
      ownerName: "Ajeet Kumar",
      createdAt: new Date(),
    },
    {
      _id: "125",
      title: "Cozy Shared Room",
      city: "Hyderabad",
      address: "Madhapur",
      price: 8000,
      type: "room",
      furnished: false,
      images: [
        "https://res.cloudinary.com/ddty1oyzq/image/upload/v1760779474/images/iyfzvqndznblsqfponqi.jpg",
        "https://res.cloudinary.com/ddty1oyzq/image/upload/v1760779473/images/b52ie4uk8jmcf6ldvixq.jpg",
        "https://res.cloudinary.com/ddty1oyzq/image/upload/v1760779474/images/iyfzvqndznblsqfponqi.jpg",
        "https://res.cloudinary.com/ddty1oyzq/image/upload/v1760779473/images/b52ie4uk8jmcf6ldvixq.jpg",
      ],
      available: true,
      ownerName: "Rohit Verma",
      createdAt: new Date(),
    },

    {
      _id: "1236",
      title: "Modern 1BHK Apartment",
      city: "Bangalore",
      address: "HSR Layout, Sector 2",
      price: 15000,
      type: "apartment",
      furnished: true,
      images: [
        "https://res.cloudinary.com/ddty1oyzq/image/upload/v1760779474/images/iyfzvqndznblsqfponqi.jpg",
        "https://res.cloudinary.com/ddty1oyzq/image/upload/v1760779473/images/b52ie4uk8jmcf6ldvixq.jpg",
        "https://res.cloudinary.com/ddty1oyzq/image/upload/v1760779474/images/iyfzvqndznblsqfponqi.jpg",
        "https://res.cloudinary.com/ddty1oyzq/image/upload/v1760779473/images/b52ie4uk8jmcf6ldvixq.jpg",
      ],
      available: true,
      ownerName: "Ajeet Kumar",
      createdAt: new Date(),
    },
    {
      _id: "1257",
      title: "Cozy Shared Room",
      city: "Hyderabad",
      address: "Madhapur",
      price: 8000,
      type: "room",
      furnished: false,
      images: [
        "https://res.cloudinary.com/ddty1oyzq/image/upload/v1760779474/images/iyfzvqndznblsqfponqi.jpg",
        "https://res.cloudinary.com/ddty1oyzq/image/upload/v1760779473/images/b52ie4uk8jmcf6ldvixq.jpg",
        "https://res.cloudinary.com/ddty1oyzq/image/upload/v1760779474/images/iyfzvqndznblsqfponqi.jpg",
        "https://res.cloudinary.com/ddty1oyzq/image/upload/v1760779473/images/b52ie4uk8jmcf6ldvixq.jpg",
      ],
      available: true,
      ownerName: "Rohit Verma",
      createdAt: new Date(),
    },
  ];

  const handleApplyFilters = (data: any) => {
    setFilters(data);
    console.log("Applied Filters:", data);
  };

  const handleClearFilters = () => {
    setFilters({});
  };

  return (
    <div className="min-h-screen pt-[100px] md:pt-[72px] bg-gray-100 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      {/* Navbar */}
      <Navbar />

      <div className="flex min-h-[calc(100vh-72px)]">
        {/* Sidebar */}
        <aside className="hidden md:block w-72 z-50 fixed top-[72px] left-0 h-[calc(100vh-72px)] p-4 border-r border-gray-200 dark:border-gray-800 overflow-y-auto">
          <FilterSidebar
            onApplyFilters={handleApplyFilters}
            onClearFilters={handleClearFilters}
            showFilters={showFilters}
          />
        </aside>

        {/* Mobile Sidebar Toggle */}
        <div className="md:hidden fixed top-[80px] left-4 z-50">
          {/* Mobile Toggle Button */}
          <FilterSidebar
            onApplyFilters={handleApplyFilters}
            onClearFilters={handleClearFilters}
            showFilters={showFilters}
          />
        </div>

        {/* Listings */}
        <main className="flex-1 ml-0 md:ml-72 p-6 overflow-y-auto">
          <Button
            size="icon"
            className="md:hidden sm:w-fit  px-3 w-full self-center py-1 bg-green-700 hover:bg-green-800 text-white hover:text-white font-semibold"
            onClick={() => setShowFilters(!showFilters)}
          >
            Apply Filters
          </Button>
          <h2 className="text-xl font-semibold mb-4">Available Listings</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((listing, idx) => (
              <ListingCard key={idx} listing={listing} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default HomePage;
