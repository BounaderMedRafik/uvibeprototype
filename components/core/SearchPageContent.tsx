"use client";
import React from "react";
import { useClothingSearch } from "@/hooks/useClothingSearch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import {
  clothingBrands,
  tailwindColors,
  clothingSizes,
  clothingCategories,
  clothingFits,
  clothingGender,
  clothingPatterns,
  clothingSeasons,
  clothingOccasions,
} from "@/data/data";
import ClothPieceTemplate from "./ClothPieceTemplate";

const SearchPageContent = () => {
  const {
    searchTerm,
    setSearchTerm,
    results,
    isLoading,
    error,
    filters,
    setFilters,
    searchClothing,
    clearFilters,
  } = useClothingSearch();

  const activeFiltersCount = Object.values(filters).filter(Boolean).length;

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    searchClothing();
  };

  return (
    <div className="wrapper mx-auto px-4 py-8">
      <div className="flex flex-col space-y-6">
        {/* Search Form */}
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            placeholder="Search by name or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1"
          />
          <Button type="submit">Search</Button>
          {activeFiltersCount > 0 && (
            <Button
              variant="outline"
              type="button"
              onClick={clearFilters}
              className="flex items-center gap-1"
            >
              <X size={16} />
              Clear ({activeFiltersCount})
            </Button>
          )}
        </form>

        {/* Compact Filters */}
        <div className="border rounded-lg p-4">
          <div className="flex flex-wrap gap-4">
            {/* Brand Filter */}
            <Select
              value={filters.brand}
              onValueChange={(value) => handleFilterChange("brand", value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Brand" />
              </SelectTrigger>
              <SelectContent>
                {clothingBrands.map((brand, i) => (
                  <SelectItem key={i} value={brand}>
                    {brand}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Color Filter */}
            <Select
              value={filters.color}
              onValueChange={(value) => handleFilterChange("color", value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Color" />
              </SelectTrigger>
              <SelectContent>
                {tailwindColors.map((color, i) => (
                  <SelectItem key={i} value={color.hex}>
                    <div className="flex items-center gap-2">
                      <div
                        className="w-4 h-4 rounded-full border"
                        style={{ backgroundColor: color.hex }}
                      />
                      {color.name.split(" ")[0]}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Size Filter */}
            <Select
              value={filters.size}
              onValueChange={(value) => handleFilterChange("size", value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Size" />
              </SelectTrigger>
              <SelectContent>
                {clothingSizes.flatMap((sizeCat, i) =>
                  sizeCat.sizes.map((size, j) => (
                    <SelectItem key={`${i}-${j}`} value={size}>
                      {size}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>

            {/* Category Filter */}
            <Select
              value={filters.category}
              onValueChange={(value) => handleFilterChange("category", value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {clothingCategories.map((category, i) => (
                  <SelectItem key={i} value={category.name}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Fit Filter */}
            <Select
              value={filters.fit}
              onValueChange={(value) => handleFilterChange("fit", value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Fit" />
              </SelectTrigger>
              <SelectContent>
                {clothingFits.map((fit, i) => (
                  <SelectItem key={i} value={fit}>
                    {fit}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Gender Filter */}
            <Select
              value={filters.gender}
              onValueChange={(value) => handleFilterChange("gender", value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Gender" />
              </SelectTrigger>
              <SelectContent>
                {clothingGender.map((gender, i) => (
                  <SelectItem key={i} value={gender}>
                    {gender}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Pattern Filter */}
            <Select
              value={filters.pattern}
              onValueChange={(value) => handleFilterChange("pattern", value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Pattern" />
              </SelectTrigger>
              <SelectContent>
                {clothingPatterns.map((pattern, i) => (
                  <SelectItem key={i} value={pattern}>
                    {pattern}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Season Filter */}
            <Select
              value={filters.season}
              onValueChange={(value) => handleFilterChange("season", value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Season" />
              </SelectTrigger>
              <SelectContent>
                {clothingSeasons.map((season, i) => (
                  <SelectItem key={i} value={season}>
                    {season}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Occasion Filter */}
            <Select
              value={filters.occasion}
              onValueChange={(value) => handleFilterChange("occasion", value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Occasion" />
              </SelectTrigger>
              <SelectContent>
                {clothingOccasions.flatMap((occasionCat, i) =>
                  occasionCat.occasions.map((occasion, j) => (
                    <SelectItem key={`${i}-${j}`} value={occasion}>
                      {occasion}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Active Filters */}
        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap gap-2">
            {Object.entries(filters).map(
              ([key, value], i) =>
                value && (
                  <Badge
                    key={i}
                    variant="outline"
                    className="flex items-center gap-1"
                  >
                    {key}: {value}
                    <button
                      onClick={() => handleFilterChange(key, "")}
                      className="ml-1"
                    >
                      <X size={14} />
                    </button>
                  </Badge>
                )
            )}
          </div>
        )}

        {/* Results */}
        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="w-full aspect-square rounded-xl" />
            ))}
          </div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {results.map((item, i) => (
              <ClothPieceTemplate key={i} {...item} />
            ))}
          </div>
        )}

        {!isLoading &&
          results.length === 0 &&
          !searchTerm &&
          activeFiltersCount === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <p>No search performed yet.</p>
              <p className="text-sm mt-2">
                Use the search box or filters to find specific items
              </p>
            </div>
          )}

        {!isLoading &&
          results.length === 0 &&
          (searchTerm || activeFiltersCount > 0) && (
            <div className="text-center py-12 text-muted-foreground">
              <p>No items found matching your search criteria</p>
              <p className="text-sm mt-2">
                Try adjusting your search or filters
              </p>
            </div>
          )}
      </div>
    </div>
  );
};

export default SearchPageContent;
