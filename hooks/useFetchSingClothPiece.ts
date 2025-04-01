import supabase from "@/app/supabase/supaClient";
import { ClothingPiece } from "@/data/type";
import { useState, useEffect } from "react";

export const useFetchClothingPieceById = (pieceid?: string) => {
  const [clothingPiece, setClothingPiece] = useState<ClothingPiece>({
    pieceid: "",
    senderid: "",
    created_at: new Date(),
    name: "",
    description: "",
    brand: "",
    color: "",
    size: "",
    category: "",
    fit: "",
    gender: "",
    pattern: "",
    season: "",
    occasion: "",
    price: "",
    image: "",
    source: "",
    forsale: false,
    tags: [],
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!pieceid) return;

    const fetchClothingPiece = async () => {
      setIsLoading(true);
      setError("");

      const { data, error } = await supabase
        .from("pieces")
        .select("*")
        .eq("pieceid", pieceid)
        .single();

      if (error) {
        setError(error.message);
        setClothingPiece({
          pieceid: "",
          senderid: "",
          created_at: new Date(),
          name: "",
          description: "",
          brand: "",
          color: "",
          size: "",
          category: "",
          fit: "",
          gender: "",
          pattern: "",
          season: "",
          occasion: "",
          price: "",
          image: "",
          source: "",
          forsale: false,
          tags: [],
        });
      } else {
        setClothingPiece(data);
      }

      setIsLoading(false);
    };

    fetchClothingPiece();
  }, [pieceid]);

  return { clothingPiece, isLoading, error };
};
