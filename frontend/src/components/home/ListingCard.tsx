
import { Heart, MapPin } from "lucide-react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import type { Listing } from "@/types";

interface ListingCardProps {
  listing: Listing;
}
 function ListingCard({ listing }: ListingCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      room: "bg-blue-100 text-blue-700 hover:bg-blue-100",
      flat: "bg-green-100 text-green-700 hover:bg-green-100",
      pg: "bg-orange-100 text-orange-700 hover:bg-orange-100",
      apartment: "bg-purple-100 text-purple-700 hover:bg-purple-100",
      villa: "bg-pink-100 text-pink-700 hover:bg-pink-100",
    };
    return colors[type] || "bg-gray-100 text-gray-700";
  };

  return (
    <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-gray-200 rounded-2xl bg-gray-50 dark:bg-gray-900">
      {/* 🖼️ Image Scroll Section */}
      <div className="relative -mt-6 w-full h-56 overflow-x-auto flex snap-x snap-mandatory scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent">
        {listing.images && listing.images.length > 0 ? (
          listing.images.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`${listing.title}-${idx}`}
              className="w-full h-full object-cover flex-shrink-0 snap-center"
            />
          ))
        ) : (
          <img
            src="https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg"
            alt="default-room"
            className="w-full h-full object-cover flex-shrink-0 snap-center"
          />
        )}

        {/* ❤️ Favorite Button */}
        <Button
          size="icon"
          variant="secondary"
          className="absolute top-4 right-4 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white shadow-md"
        >
          <Heart className="h-4 w-4 text-gray-700" />
        </Button>

        {/* 🟢 Furnished Badge */}
        {listing.furnished && (
          <Badge className="absolute top-4 left-4 bg-emerald-600 hover:bg-emerald-600 shadow-md">
            Furnished
          </Badge>
        )}
      </div>

      {/* 🏠 Info Section */}
      <div className="p-5 space-y-3">
        {/* Title + Type */}
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 line-clamp-1 group-hover:text-emerald-600 transition-colors">
            {listing.title}
          </h3>
          <Badge variant="outline" className={getTypeColor(listing.type)}>
            {listing.type.toUpperCase()}
          </Badge>
        </div>

        {/* Location */}
        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
          <MapPin className="h-4 w-4 flex-shrink-0" />
          <span className="text-sm line-clamp-1">
            {listing.address}, {listing.city}
          </span>
        </div>

        {/* 💰 Price + CTA */}
        <div className="pt-3 flex items-center justify-between">
          <div>
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {formatPrice(listing.price)}
            </div>
            <div className="text-xs text-gray-500">per month</div>
          </div>
          <Button className="bg-emerald-600 hover:bg-emerald-700 rounded-full text-white">
            View Details
          </Button>
        </div>
      </div>
    </Card>
  );
}

export default ListingCard;
