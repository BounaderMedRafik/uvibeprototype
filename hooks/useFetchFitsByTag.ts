import { useState, useEffect } from "react";
import { ClothingFit } from "@/data/type";
import supabase from "@/app/supabase/supaClient";

const useFetchFitsByTag = (tag: string) => {
  const [fits, setFits] = useState<ClothingFit[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFits = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const { data, error } = await supabase
          .from("fits") // Replace with your actual table name
          .select("*")
          .contains("tags", [tag])
          .order("created_at", { ascending: false }); // Checks if the tag exists in the array

        if (error) {
          console.log("error fetching the fits by tag", error);
          throw error;
        }

        setFits(data || []);
      } catch (err) {
        setError("there is error");
      } finally {
        setIsLoading(false);
      }
    };

    if (tag) fetchFits();
  }, [tag]);

  return { fits, isLoading, error };
};

export default useFetchFitsByTag;
