import supabase from "@/app/supabase/supaClient";
import { useState } from "react";
import { toast } from "sonner";

const useDeleteFit = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteFit = async (fitid: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    try {
      const { error } = await supabase.from("fits").delete().eq("fitid", fitid);
      const { error: DeleteSaveError } = await supabase
        .from("saves")
        .delete()
        .eq("fitid", fitid);

      const { error: DeletComments } = await supabase
        .from("comments")
        .delete()
        .eq("postid", fitid);

      if (error || DeleteSaveError || DeletComments) {
        console.log("eroor deleting ", error);
        throw error;
      } else {
        toast("Outfit got deleted succesfully");
      }
      return true;
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { deleteFit, isLoading, error };
};

export default useDeleteFit;
