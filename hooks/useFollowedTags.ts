import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import supabase from "@/app/supabase/supaClient";

export default function useFollowedTags() {
  const { user } = useUser();
  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTags = async () => {
      if (!user?.id) {
        setLoading(false);
        setError("User not logged in.");
        return;
      }

      const { data, error } = await supabase
        .from("tagsubs")
        .select("tag")
        .eq("userid", user.id);

      if (error) {
        console.error("Error fetching followed tags:", error);
        setError("Failed to fetch followed tags.");
      } else {
        setTags(data.map((row) => row.tag));
      }

      setLoading(false);
    };

    fetchTags();
  }, [user?.id]);

  return { tags, loading, error };
}
