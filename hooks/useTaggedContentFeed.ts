import { useEffect, useState } from "react";
import useFollowedTags from "@/hooks/useFollowedTags";
import { ClothingFit, ClothingPiece } from "@/data/type";
import supabase from "@/app/supabase/supaClient";

const useTaggedContentFeed = () => {
  const { tags, loading: tagsLoading } = useFollowedTags();
  const [pieces, setPieces] = useState<ClothingPiece[]>([]);
  const [fits, setFits] = useState<ClothingFit[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      if (tags.length === 0) {
        setPieces([]);
        setFits([]);
        setLoading(false);
        console.log("No followed tags - feed is empty");
        return;
      }

      setLoading(true);

      const cleanedTags = tags.map((t) => t.trim());

      // Build OR query strings

      // For pieces: check tags contains OR any of the text columns ilike the tag
      const piecesOrConditions = cleanedTags.flatMap((tag) => [
        `tags.cs.{${tag}}`, // array contains this tag
        `name.ilike.%${tag}%`,
        `brand.ilike.%${tag}%`,
        `color.ilike.%${tag}%`,
        `category.ilike.%${tag}%`,
        `fit.ilike.%${tag}%`,
        `gender.ilike.%${tag}%`,
        `pattern.ilike.%${tag}%`,
        `season.ilike.%${tag}%`,
        `occasion.ilike.%${tag}%`,
      ]);

      // For fits: only check tags contains the tag
      const fitsOrConditions = cleanedTags.map((tag) => `tags.cs.{${tag}}`);

      const piecesOrQuery = piecesOrConditions.join(",");
      const fitsOrQuery = fitsOrConditions.join(",");

      console.log("Pieces OR query:", piecesOrQuery);
      console.log("Fits OR query:", fitsOrQuery);

      try {
        const [piecesRes, fitsRes] = await Promise.all([
          supabase
            .from("pieces")
            .select("*")
            .or(piecesOrQuery)
            .order("created_at", { ascending: false }),

          supabase
            .from("fits")
            .select("*")
            .or(fitsOrQuery)
            .order("created_at", { ascending: false }),
        ]);

        if (piecesRes.error) {
          console.log("Error fetching pieces:", piecesRes.error.message);
          setPieces([]);
        } else {
          setPieces(piecesRes.data ?? []);
          console.log(`Fetched ${piecesRes.data?.length ?? 0} pieces`);
        }

        if (fitsRes.error) {
          console.log("Error fetching fits:", fitsRes.error.message);
          setFits([]);
        } else {
          setFits(fitsRes.data ?? []);
          console.log(`Fetched ${fitsRes.data?.length ?? 0} fits`);
        }
      } catch (err) {
        console.log("Fetch error:", err);
        setPieces([]);
        setFits([]);
      }

      setLoading(false);
    };

    if (!tagsLoading) {
      fetchContent();
    }
  }, [tags, tagsLoading]);

  return { pieces, fits, loading };
};

export default useTaggedContentFeed;
