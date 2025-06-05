"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Masonry from "react-masonry-css";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ClothingFit, ClothingPiece } from "@/data/type";
import useTaggedContentFeed from "@/hooks/useTaggedContentFeed";
import supabase from "@/app/supabase/supaClient";
import ClothPieceTemplate from "./ClothPieceTemplate";
import FitTemplate from "./FitTemplate";

const FeedPageContent = () => {
  const router = useRouter();

  const [pieces, setPieces] = useState<ClothingPiece[]>([]);
  const [fits, setFits] = useState<ClothingFit[]>([]);
  const [loading, setLoading] = useState(true);

  const { pieces: tagP, fits: tagF, loading: tagLoad } = useTaggedContentFeed();

  useEffect(() => {
    const fetchAllContent = async () => {
      setLoading(true);
      const { data: piecesData } = await supabase.from("pieces").select("*");
      const { data: fitsData } = await supabase.from("fits").select("*");
      setPieces((piecesData as ClothingPiece[]) || []);
      setFits((fitsData as ClothingFit[]) || []);
      setLoading(false);
    };

    fetchAllContent();
  }, []);

  const combined = [...pieces, ...fits].sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  const followedContent = [...tagP, ...tagF].sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  const isEmpty = !loading && combined.length === 0;
  const isFollowingEmpty = !tagLoad && followedContent.length === 0;

  const breakpointColumnsObj = {
    default: 4,
    1100: 4,
    768: 2,
    500: 2,
  };

  return (
    <Tabs defaultValue="feed" className="mt-5 wrapper">
      <TabsList className="mb-4">
        <TabsTrigger value="feed">Feed</TabsTrigger>
        <TabsTrigger value="following">Following</TabsTrigger>
      </TabsList>

      {/* FEED TAB */}
      <TabsContent value="feed">
        {loading ? (
          <div className="grid grid-cols-3 gap-2">
            {Array(6)
              .fill(0)
              .map((_, i) => (
                <Skeleton key={i} className="w-full h-44 rounded-lg" />
              ))}
          </div>
        ) : isEmpty ? (
          <div className="flex flex-col items-center justify-center py-20 text-center opacity-75">
            <p className="text-lg font-medium mb-4">
              There's nothing to show in your feed yet.
            </p>
            <Button onClick={() => router.push("/explore")}>
              Explore Tags & Content
            </Button>
          </div>
        ) : (
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="flex w-auto gap-4"
            columnClassName="masonry-column"
          >
            {combined.map((item, i) => (
              <div key={i} className="my-2">
                {"pieceid" in item ? (
                  <ClothPieceTemplate {...item} />
                ) : (
                  <FitTemplate {...item} />
                )}
              </div>
            ))}
          </Masonry>
        )}
      </TabsContent>

      {/* FOLLOWING TAB */}
      <TabsContent value="following">
        {tagLoad ? (
          <div className="grid grid-cols-3 gap-2">
            {Array(6)
              .fill(0)
              .map((_, i) => (
                <Skeleton key={i} className="w-full h-44 rounded-lg" />
              ))}
          </div>
        ) : isFollowingEmpty ? (
          <div className="py-20 text-center opacity-75">
            <p className="text-lg font-medium mb-4">
              There's nothing in your Following feed yet.
            </p>
            <Button onClick={() => router.push("/explore")}>
              Discover & Follow Tags
            </Button>
          </div>
        ) : (
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="flex w-auto gap-4"
            columnClassName="masonry-column"
          >
            {followedContent.map((item, i) => (
              <div key={i} className="my-2">
                {"pieceid" in item ? (
                  <ClothPieceTemplate {...item} />
                ) : (
                  <FitTemplate {...item} />
                )}
              </div>
            ))}
          </Masonry>
        )}
      </TabsContent>
    </Tabs>
  );
};

export default FeedPageContent;
