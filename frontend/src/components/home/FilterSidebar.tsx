import React, { useEffect, useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {  X } from "lucide-react";

type Filters = {
  priceRange: number[];
  propertyTypes: string[];
  bedrooms: string;
  amenities: string[];
};

interface FilterSidebarProps {
  showFilters: boolean;
  onApplyFilters?: (filters: Filters) => void;
  onClearFilters?: () => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  onApplyFilters,
  onClearFilters,
  showFilters,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(showFilters);
  const [priceRange, setPriceRange] = useState<number[]>([5000, 30000]);
  const [propertyTypes, setPropertyTypes] = useState<string[]>([]);
  const [bedrooms, setBedrooms] = useState<string>("");
  const [amenities, setAmenities] = useState<string[]>([]);

  const propertyOptions = ["Apartment", "Villa", "Shared Room", "Studio"];
  const bedroomOptions = ["1 BHK", "2 BHK", "3 BHK", "4+ BHK"];
  const amenityOptions = ["WiFi", "Parking", "AC", "Furnished", "Balcony"];

  const toggleSelection = (
    list: string[],
    setList: React.Dispatch<React.SetStateAction<string[]>>,
    item: string
  ) => {
    if (list.includes(item)) {
      setList(list.filter((i) => i !== item));
    } else {
      setList([...list, item]);
    }
  };

  const handleApply = () => {
    onApplyFilters?.({
      priceRange,
      propertyTypes,
      bedrooms,
      amenities,
    });
    setIsOpen(false);
  };

  const handleClear = () => {
    setPriceRange([5000, 30000]);
    setPropertyTypes([]);
    setBedrooms("");
    setAmenities([]);
    onClearFilters?.();
  };

  useEffect(() => {
    setIsOpen(showFilters);
  }, [showFilters]);

  return (
    <>
      {/* Overlay (mobile only) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 z-50 h-[100vh] w-72 
          transform transition-transform duration-300 ease-in-out
          md:translate-x-0
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <Card className="h-full bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 shadow-lg rounded-none md:rounded-r-2xl p-4 overflow-y-auto">
          <CardHeader className="flex flex-row justify-between items-center">
            <CardTitle className="text-gray-800 dark:text-gray-100 text-lg font-semibold">
              Filters
            </CardTitle>
            {/* Close button on mobile */}
            <button
              className="md:hidden text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-5 w-5" />
            </button>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Price Range */}
            <div>
              <Label className="text-gray-700 dark:text-gray-300 mb-2 block">
                Price Range (₹)
              </Label>
              <div className="px-2">
                <Slider
                  min={1000}
                  max={100000}
                  step={1000}
                  value={priceRange}
                  onValueChange={setPriceRange}
                  className="my-4"
                />
              </div>
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                <span>₹{priceRange[0].toLocaleString()}</span>
                <span>₹{priceRange[1].toLocaleString()}</span>
              </div>
            </div>

            {/* Property Type */}
            <div>
              <Label className="text-gray-700 dark:text-gray-300 mb-2 block">
                Property Type
              </Label>
              <div className="space-y-2">
                {propertyOptions.map((type) => (
                  <div key={type} className="flex items-center space-x-2">
                    <Checkbox
                      id={type}
                      checked={propertyTypes.includes(type)}
                      onCheckedChange={() =>
                        toggleSelection(propertyTypes, setPropertyTypes, type)
                      }
                    />
                    <Label
                      htmlFor={type}
                      className="text-gray-600 dark:text-gray-400"
                    >
                      {type}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Bedrooms */}
            <div>
              <Label className="text-gray-700 dark:text-gray-300 mb-2 block">
                Bedrooms
              </Label>
              <RadioGroup
                value={bedrooms}
                onValueChange={setBedrooms}
                className="space-y-2"
              >
                {bedroomOptions.map((option) => (
                  <div key={option} className="flex items-center space-x-2">
                    <RadioGroupItem value={option} id={option} />
                    <Label
                      htmlFor={option}
                      className="text-gray-600 dark:text-gray-400"
                    >
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            {/* Amenities */}
            <div>
              <Label className="text-gray-700 dark:text-gray-300 mb-2 block">
                Amenities
              </Label>
              <div className="space-y-2">
                {amenityOptions.map((amenity) => (
                  <div key={amenity} className="flex items-center space-x-2">
                    <Checkbox
                      id={amenity}
                      checked={amenities.includes(amenity)}
                      onCheckedChange={() =>
                        toggleSelection(amenities, setAmenities, amenity)
                      }
                    />
                    <Label
                      htmlFor={amenity}
                      className="text-gray-600 dark:text-gray-400"
                    >
                      {amenity}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-between gap-3 pt-2 pb-4">
              <Button
                variant="secondary"
                className="w-1/2 bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                onClick={handleClear}
              >
                Clear
              </Button>
              <Button
                className="w-1/2 bg-gray-900 text-white hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-900"
                onClick={handleApply}
              >
                Apply
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default FilterSidebar;
