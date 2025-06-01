"use client";
import useFetchClothesToExplore from "@/hooks/useFetchClothesToExplore";
import React from "react";
import ClothPieceTemplate from "./ClothPieceTemplate";
import Masonry from "react-masonry-css";
import { Button } from "../ui/button";
import useToggleFollowTag from "@/hooks/useToggleFollowTag";
import { replacePercent } from "@/lib/space";

const SingularExplorePageContent = ({ id }: { id: string }) => {
  console.log(id);
  id = replacePercent(id);
  const { clothingPieces, isLoading, error } = useFetchClothesToExplore(id);
  const {
    isFollowing,
    toggleFollow,
    loading: followLoading,
  } = useToggleFollowTag(id);

  const breakpointColumnsObj = {
    default: 4, // 4 columns on large screens
    1100: 3, // 3 columns on medium screens
    768: 2, // 2 columns on tablets
    500: 2, // 1 column on mobile
  };

  if (isLoading) {
    return (
      <div className=" w-full h-44 flex items-center justify-center opacity-50 text-xs  font-mono">
        Loading...
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (clothingPieces.length === 0) {
    return (
      <div className="wrapper">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div>
            <div className="text-xl opacity-75">{id}</div>
            <div className="max-w-sm opacity-50 text-xs">
              Check outfits and clothes all about {id}
            </div>
          </div>
          <div>
            <Button size="sm" onClick={toggleFollow} disabled={followLoading}>
              {followLoading ? "..." : isFollowing ? "Unfollow" : "Follow"}
            </Button>
          </div>
        </div>
        <div className="mt-10 text-center text-xs opacity-75 font-mono">
          <p>
            No clothes available for {id} at the moment.{" "}
            <a className=" hover:underline" href="/profile/wardrobe">
              Share one
            </a>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="wrapper">
      <div className="max-w-2xl mx-auto flex items-center justify-between">
        <div>
          <div className="text-xl opacity-75">{id}</div>
          <div className="max-w-sm opacity-50 text-xs">
            Check outfits and clothes all about {id}
          </div>
        </div>
        <div>
          <Button size="sm" onClick={toggleFollow} disabled={followLoading}>
            {followLoading ? "..." : isFollowing ? "Unfollow" : "Follow"}
          </Button>
        </div>
      </div>
      <div className="mt-10">
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="flex w-auto gap-4"
          columnClassName="masonry-column"
        >
          {clothingPieces.map((item, i) => (
            <ClothPieceTemplate
              key={i}
              pieceid={item.pieceid}
              senderid={item.senderid}
              created_at={item.created_at}
              name={item.name}
              description={item.description}
              brand={item.brand}
              color={item.color}
              size={item.size}
              category={item.category}
              fit={item.fit}
              gender={item.gender}
              pattern={item.pattern}
              season={item.season}
              occasion={item.occasion}
              price={item.price}
              image={item.image}
              source={item.source}
              forsale={item.forsale}
              tags={item.tags}
            />
          ))}
        </Masonry>
      </div>
    </div>
  );
};

export default SingularExplorePageContent;
