import supabase from "@/app/supabase/supaClient";
import { useState } from "react";

const useAddClothingPiece = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const addClothingPiece = async (piece: {
    name: string;
    senderid: string | undefined;
    brand: string;
    color: string | null;
    size: string | null;
    category: string | null;
    fit: string | null;
    gender: string | null;
    pattern: string | null;
    season: string | null;
    occasion: string | null;
    forsale: boolean;
    price: string;
    tags: string[];
    description: string;
    image: string | null;
    source: string;
  }) => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const { data, error } = await supabase.from("pieces").insert([piece]);

      if (error) {
        console.log("Error uploading clothes:", error);
        throw error;
      }

      setSuccess(true);
      return data;
    } catch (err: any) {
      setError(err.message || "Failed to add clothing piece");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { addClothingPiece, isLoading, error, success };
};

export default useAddClothingPiece;
