import supabase from "@/app/supabase/supaClient";
import { useState } from "react";
import { toast } from "sonner";

const useSendComment = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendComment = async ({
    content,
    senderid,
    postid,
  }: {
    content: string;
    senderid: string;
    postid: string;
  }) => {
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.from("comments").insert([
        {
          content,
          senderid,
          postid,
        },
      ]);

      if (error) {
        throw error;
      } else {
        toast("comment succesfully");
      }
      return data;
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { sendComment, loading, error };
};

export default useSendComment;
