import { useState, useEffect } from "react";
import supabase from "@/app/supabase/supaClient";
import { SaveProperties } from "@/data/type";

const useFetchSavedFits = (saverId?: string) => {
  const [savedFits, setSavedFits] = useState<SaveProperties[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!saverId) return;

    const fetchSavedFits = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const { data, error } = await supabase
          .from("saves")
          .select("*") // Fetch only save records
          .eq("saverid", saverId)
          .order("created_at", { ascending: false });

        if (error) throw error;

        setSavedFits(data);
      } catch (err: any) {
        setError(err.message || "Failed to fetch saved fits");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSavedFits();

    // Real-time subscription for saves/unsaves
    const subscription = supabase
      .channel("realtime-saves")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "saves" },
        (payload) => {
          if (payload.eventType === "DELETE") {
            setSavedFits((prevFits) =>
              prevFits.filter((save) => save.fitid !== payload.old.fitid)
            );
          } else if (payload.eventType === "INSERT") {
            setSavedFits((prevFits) => [
              payload.new as SaveProperties,
              ...prevFits,
            ]);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [saverId]);

  return { savedFits, isLoading, error };
};

export default useFetchSavedFits;
