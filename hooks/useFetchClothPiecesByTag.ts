import supabase from "@/app/supabase/supaClient";
import { useEffect, useState } from "react";

const useFetchClothingPiecesByTag = (tag: string) => {
  const [clothingPieces, setClothingPieces] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClothingPieces = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from("pieces") // Replace with your actual table name
          .select("*")
          .contains("tags", [tag])
          .order("created_at", { ascending: false }); // Ensure the tags column is an array

        if (error) throw error;

        setClothingPieces(data || []);
      } catch (err) {
        setError("error");
      } finally {
        setIsLoading(false);
      }
    };

    if (tag) fetchClothingPieces();
  }, [tag]);

  return { clothingPieces, isLoading, error };
};

export default useFetchClothingPiecesByTag;
