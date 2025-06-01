import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import supabase from "@/app/supabase/supaClient";

export default function useToggleFollowTag(tag: string) {
  const { user } = useUser();
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const userId = user?.id;

  useEffect(() => {
    const checkFollowStatus = async () => {
      if (!userId) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("tagsubs")
        .select("*")
        .eq("userid", userId)
        .eq("tag", tag)
        .single();

      if (error) {
        console.log("Error checking follow status:", error.message);
      }

      if (data) setIsFollowing(true);
      setLoading(false);
    };

    checkFollowStatus();
  }, [tag, userId]);

  const toggleFollow = async () => {
    if (!userId) return;

    setLoading(true);

    if (isFollowing) {
      const { error } = await supabase
        .from("tagsubs")
        .delete()
        .eq("userid", userId)
        .eq("tag", tag);

      if (error) {
        console.log("Error unfollowing tag:", error.message);
      } else {
        setIsFollowing(false);
      }
    } else {
      const { error } = await supabase.from("tagsubs").insert([
        {
          userid: userId,
          tag,
        },
      ]);

      if (error) {
        console.log("Error following tag:", error.message);
      } else {
        setIsFollowing(true);
      }
    }

    setLoading(false);
  };

  return { isFollowing, toggleFollow, loading };
}
