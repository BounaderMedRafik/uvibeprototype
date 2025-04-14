import { useEffect, useState } from "react";
import supabase from "@/app/supabase/supaClient";
import { ClothingPiece } from "@/data/type";

const useFetchClothesToExplore = (id: string) => {
  const [clothingPieces, setClothingPieces] = useState<ClothingPiece[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchClothingPieces = async () => {
      try {
        setIsLoading(true);

        const { data, error } = await supabase
          .from("pieces")
          .select("*")
          .or(
            `category.eq.${id},occasion.eq.${id},pattern.eq.${id},season.eq.${id}`
          )
          .order("created_at", { ascending: false });

        if (error) throw error;

        setClothingPieces(data || []);
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchClothingPieces();
    }
  }, [id]);

  return { clothingPieces, isLoading, error };
};

export default useFetchClothesToExplore;
