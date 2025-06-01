"use client";
import useTaggedContentFeed from "@/hooks/useTaggedContentFeed";
import Masonry from "react-masonry-css";
import { Skeleton } from "../ui/skeleton";
import ClothPieceTemplate from "./ClothPieceTemplate";
import FitTemplate from "./FitTemplate";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const FeedPageContent = () => {
  const { pieces, fits, loading } = useTaggedContentFeed();
  const router = useRouter();

  const breakpointColumnsObj = {
    default: 4,
    1100: 4,
    768: 2,
    500: 2,
  };

  const combined = [...pieces, ...fits].sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  const isEmpty = !loading && combined.length === 0;

  return (
    <div className="mt-5 wrapper">
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
    </div>
  );
};

export default FeedPageContent;
