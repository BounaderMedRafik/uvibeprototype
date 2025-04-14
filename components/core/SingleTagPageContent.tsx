"use client";
import { Hash } from "lucide-react";
import React from "react";
import useFetchFitsByTag from "@/hooks/useFetchFitsByTag";
import useFetchClothingPiecesByTag from "@/hooks/useFetchClothPiecesByTag";
import FitTemplate from "./FitTemplate";
import ClothPieceTemplate from "./ClothPieceTemplate";
import { ClothingPiece, ClothingFit } from "@/data/type";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import Masonry from "react-masonry-css";

const FitsSection = ({ id }: { id: string }) => {
  const { fits, isLoading, error } = useFetchFitsByTag(id);

  return (
    <div>
      {isLoading ? (
        <div className="opacity-75 w-full h-44 flex items-center justify-center font-mono text-sm">
          Loading...
        </div>
      ) : error ? (
        <div className="text-red-500">Error: {error}</div>
      ) : fits.length === 0 ? (
        <div className="opacity-75 w-full h-44 flex items-center justify-center font-mono text-sm">
          No outfits found for this tag.
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-4">
          {fits.map((fit) => (
            <FitTemplate key={fit.fitid} {...fit} />
          ))}
        </div>
      )}
    </div>
  );
};

const ClothingPiecesSection = ({ id }: { id: string }) => {
  const { clothingPieces, isLoading, error } = useFetchClothingPiecesByTag(id);
  const breakpointColumnsObj = {
    default: 4,
    1100: 3,
    768: 2,
    500: 2,
  };

  return (
    <div>
      {isLoading ? (
        <div className="opacity-75 w-full h-44 flex items-center justify-center font-mono text-sm">
          Loading...
        </div>
      ) : error ? (
        <div className="text-red-500">Error: {error}</div>
      ) : clothingPieces.length === 0 ? (
        <div className="opacity-75 w-full h-44 flex items-center justify-center font-mono text-sm">
          No clothing pieces found for this tag.
        </div>
      ) : (
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="flex w-auto gap-4"
          columnClassName="masonry-column"
        >
          {clothingPieces.map((piece: ClothingPiece) => (
            <ClothPieceTemplate key={piece.pieceid} {...piece} />
          ))}
        </Masonry>
      )}
    </div>
  );
};

const AllSection = ({ id }: { id: string }) => {
  const {
    fits,
    isLoading: isLoadingFits,
    error: fitsError,
  } = useFetchFitsByTag(id);
  const {
    clothingPieces,
    isLoading: isLoadingClothes,
    error: clothesError,
  } = useFetchClothingPiecesByTag(id);

  if (isLoadingFits || isLoadingClothes) {
    return (
      <div className="opacity-75 w-full h-44 flex items-center justify-center font-mono text-sm">
        Loading...
      </div>
    );
  }
  if (fitsError || clothesError) {
    return <div className="text-red-500">Error fetching data.</div>;
  }

  const mergedItems = [...fits, ...clothingPieces].sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  return (
    <Masonry
      breakpointCols={{ default: 4, 1100: 3, 768: 2, 500: 2 }}
      className="flex w-auto gap-4"
      columnClassName="masonry-column"
    >
      {mergedItems.map((item) =>
        "fitid" in item ? (
          <FitTemplate key={item.fitid} {...(item as ClothingFit)} />
        ) : (
          <ClothPieceTemplate key={item.pieceid} {...(item as ClothingPiece)} />
        )
      )}
    </Masonry>
  );
};

const SingleTagPageContent = ({ id }: { id: string }) => {
  return (
    <div className="wrapper">
      <div className=" mx-auto">
        <div className="text-xl opacity-75 flex items-center gap-2 bg-accent w-fit px-3 py-1 rounded-xl">
          <Hash size={14} />
          <div>{id}</div>
        </div>
      </div>

      <Tabs className="mt-5" defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="clothes">Clothes</TabsTrigger>
          <TabsTrigger value="outfits">Outfits</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <AllSection id={id} />
        </TabsContent>
        <TabsContent value="clothes">
          <ClothingPiecesSection id={id} />
        </TabsContent>
        <TabsContent value="outfits">
          <FitsSection id={id} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SingleTagPageContent;
