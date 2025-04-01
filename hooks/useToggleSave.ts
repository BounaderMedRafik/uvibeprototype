import { useState, useEffect } from "react";
import supabase from "@/app/supabase/supaClient";
import { SaveProperties } from "@/data/type";
import { toast } from "sonner";

const useToggleSave = (fitid: string, saverid: string) => {
  const [isSaved, setIsSaved] = useState(false);
  const [saveId, setSaveId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const checkIfSaved = async () => {
      if (!fitid || !saverid) return;

      const { data, error } = await supabase
        .from("saves")
        .select("saveid")
        .eq("fitid", fitid)
        .eq("saverid", saverid)
        .single();

      if (data) {
        setIsSaved(true);
        setSaveId(data.saveid);
      } else {
        setIsSaved(false);
        setSaveId(null);
      }
    };

    checkIfSaved();
  }, [fitid, saverid]);

  const toggleSave = async () => {
    if (!fitid || !saverid) return;
    setIsLoading(true);

    if (isSaved && saveId) {
      // Unsave: Remove from database
      const { error } = await supabase
        .from("saves")
        .delete()
        .eq("saveid", saveId);

      if (!error) {
        setIsSaved(false);
        setSaveId(null);
        toast.success("Unsaved succefully");
      }
    } else {
      // Save: Insert into database
      const { data, error } = await supabase
        .from("saves")
        .insert([{ fitid, saverid }])
        .select("saveid")
        .single();

      if (!error && data) {
        setIsSaved(true);
        setSaveId(data.saveid);
        toast.success("saved succefully");
      }
    }

    setIsLoading(false);
  };

  return { isSaved, toggleSave, isLoading };
};

export default useToggleSave;
