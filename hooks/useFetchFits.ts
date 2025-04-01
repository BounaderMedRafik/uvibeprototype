import { useState, useEffect } from "react";
import supabase from "@/app/supabase/supaClient";
import { ClothingFit } from "@/data/type";

const useFetchFits = (clerkUserId?: string) => {
  const [fits, setFits] = useState<ClothingFit[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFits = async () => {
      setIsLoading(true);
      setError(null);

      try {
        let query = supabase
          .from("fits")
          .select("*")
          .order("created_at", { ascending: false });

        if (clerkUserId) {
          query = query.eq("senderid", clerkUserId); // Filter only if clerkUserId is provided
        }

        const { data, error } = await query;
        if (error) throw error;

        setFits(data);
      } catch (err: any) {
        setError(err.message || "Failed to fetch fits");
      } finally {
        setIsLoading(false);
      }
    };

    fetchFits();

    // Subscribe to real-time changes
    const subscription = supabase
      .channel(`realtime-fits-${clerkUserId || "all"}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "fits" },
        (payload) => {
          setFits((prevFits) => {
            switch (payload.eventType) {
              case "INSERT":
                return [payload.new as ClothingFit, ...prevFits];

              case "UPDATE":
                return prevFits.map((fit) =>
                  fit.fitid === payload.new.fitid
                    ? (payload.new as ClothingFit)
                    : fit
                );

              case "DELETE":
                return prevFits.filter(
                  (fit) => fit.fitid !== payload.old.fitid
                );

              default:
                return prevFits;
            }
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [clerkUserId]);

  return { fits, isLoading, error };
};

export default useFetchFits;
