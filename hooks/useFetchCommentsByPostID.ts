import supabase from "@/app/supabase/supaClient";
import { CommentType } from "@/data/type";
import { useEffect, useState } from "react";

const useFetchComments = (postid: string) => {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("comments")
          .select("*")
          .eq("postid", postid)
          .order("created_at", { ascending: false });

        if (error) throw error;
        setComments(data);
      } catch (err) {
        setError("error");
      } finally {
        setLoading(false);
      }
    };

    if (postid) fetchComments();
  }, [postid]);

  return { comments, loading, error };
};

export default useFetchComments;
