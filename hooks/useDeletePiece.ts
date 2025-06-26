import supabase from "@/app/supabase/supaClient";
import { useState } from "react";

export function useDeletePiece() {
  const [loading, setLoading] = useState(false);

  const deletePiece = async (pieceid: string) => {
    setLoading(true);
    const { error } = await supabase
      .from("pieces")
      .delete()
      .eq("pieceid", pieceid);
    setLoading(false);

    return !error; // true if success, false if failed
  };

  return { deletePiece, loading };
}
