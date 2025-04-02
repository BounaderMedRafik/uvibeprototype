import { useState, useEffect } from "react";
import supabase from "@/app/supabase/supaClient";
import { CommentType } from "@/data/type";

const useFetchComments = (clerkUserId?: string) => {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!clerkUserId) return;

    const fetchComments = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const { data, error } = await supabase
          .from("comments")
          .select("*")
          .eq("senderid", clerkUserId)
          .order("created_at", { ascending: false });

        if (error) throw error;
        setComments(data);
      } catch (err: any) {
        setError(err.message || "Failed to fetch comments");
      } finally {
        setIsLoading(false);
      }
    };

    fetchComments();

    // Real-time subscription for comments
    const subscription = supabase
      .channel(`realtime-comments-${clerkUserId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "comments",
          filter: `senderid=eq.${clerkUserId}`,
        },
        (payload) => {
          setComments((prevComments) => {
            if (payload.eventType === "DELETE") {
              return prevComments.filter(
                (comment) => comment.commentid !== payload.old.commentid
              );
            }
            if (payload.eventType === "INSERT") {
              return [payload.new as CommentType, ...prevComments];
            }
            return prevComments.map((comment) =>
              comment.commentid === payload.new.commentid
                ? (payload.new as CommentType)
                : comment
            );
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [clerkUserId]);

  return { comments, isLoading, error };
};

export default useFetchComments;
