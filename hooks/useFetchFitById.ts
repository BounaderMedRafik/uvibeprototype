import { useState, useEffect } from "react";
import supabase from "@/app/supabase/supaClient";
import { ClothingFit } from "@/data/type";

const useFetchFitById = (fitid?: string) => {
  const [fit, setFit] = useState<ClothingFit | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!fitid) return;

    const fetchFit = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const { data, error } = await supabase
          .from("fits")
          .select("*")
          .eq("fitid", fitid)
          .single(); // Expect a single result

        if (error) throw error;
        setFit(data);
      } catch (err: any) {
        setError(err.message || "Failed to fetch fit");
      } finally {
        setIsLoading(false);
      }
    };

    fetchFit();

    // Real-time updates for this specific fit
    const subscription = supabase
      .channel(`realtime-fit-${fitid}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "fits",
          filter: `fitid=eq.${fitid}`,
        },
        (payload) => {
          if (payload.eventType === "DELETE") {
            setFit(null); // Fit was deleted
          } else {
            setFit(payload.new as ClothingFit); // Update on INSERT/UPDATE
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [fitid]);

  return { fit, isLoading, error };
};

export default useFetchFitById;
