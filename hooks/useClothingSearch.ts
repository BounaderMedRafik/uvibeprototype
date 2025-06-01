// hooks/useClothingSearch.ts
import supabase from "@/app/supabase/supaClient";
import { ClothingPiece } from "@/data/type";
import { useState } from "react";

export const useClothingSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<ClothingPiece[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    brand: "",
    color: "",
    size: "",
    category: "",
    fit: "",
    gender: "",
    pattern: "",
    season: "",
    occasion: "",
  });

  const searchClothing = async () => {
    setIsLoading(true);
    setError(null);

    try {
      let query = supabase.from("pieces").select("*");

      // Apply text search if there's a search term
      if (searchTerm.trim()) {
        query = query.or(
          `name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`
        );
      }

      // Apply filters
      if (filters.brand) query = query.eq("brand", filters.brand);
      if (filters.color) query = query.eq("color", filters.color);
      if (filters.size) query = query.eq("size", filters.size);
      if (filters.category) query = query.eq("category", filters.category);
      if (filters.fit) query = query.eq("fit", filters.fit);
      if (filters.gender) query = query.eq("gender", filters.gender);
      if (filters.pattern) query = query.eq("pattern", filters.pattern);
      if (filters.season) query = query.eq("season", filters.season);
      if (filters.occasion) query = query.eq("occasion", filters.occasion);

      const { data, error } = await query;

      if (error) throw error;

      setResults(data || []);
    } catch (err) {
      setError(error);
      console.log("Search error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const clearFilters = () => {
    setFilters({
      brand: "",
      color: "",
      size: "",
      category: "",
      fit: "",
      gender: "",
      pattern: "",
      season: "",
      occasion: "",
    });
    setSearchTerm("");
  };

  return {
    searchTerm,
    setSearchTerm,
    results,
    isLoading,
    error,
    filters,
    setFilters,
    searchClothing,
    clearFilters,
  };
};
