import { useState, useEffect } from "react";
import supabase from "@/app/supabase/supaClient";
import { ClothingPiece } from "@/data/type";

const useFetchClothingPieces = (clerkUserId: string | undefined) => {
  const [pieces, setPieces] = useState<ClothingPiece[] | null>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!clerkUserId) return;

    const fetchPieces = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const { data, error } = await supabase
          .from("pieces")
          .select("*")
          .eq("senderid", clerkUserId)
          .order("created_at", { ascending: false }); // Fetch latest pieces first

        if (error) throw error;

        setPieces(data || []);
      } catch (err: any) {
        setError(err.message || "Failed to fetch clothing pieces");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPieces();

    const subscription = supabase
      .channel(`realtime-user-${clerkUserId}`)
      .on(
        "postgres_changes",
        {
          event: "*", // Listen for any changes (INSERT, UPDATE, DELETE)
          schema: "public",
          table: "pieces",
          filter: `senderid=eq.${clerkUserId}`, // Only listen for changes to the logged-in user
        },
        (payload) => {
          if (payload.eventType === "DELETE") {
            setPieces(null);
          } else {
            setPieces(payload.new as ClothingPiece[]);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription); // Cleanup on unmount
    };
  }, [clerkUserId]);

  return { pieces, isLoading, error };
};

export default useFetchClothingPieces;
