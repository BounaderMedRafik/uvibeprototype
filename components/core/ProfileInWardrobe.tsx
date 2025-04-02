"use client";
import useFetchClothingPieces from "@/hooks/useFetchClothingPieces";
import useFetchFits from "@/hooks/useFetchFits";
import useFetchSavedFits from "@/hooks/useFetchSavedFits";
import { useUser } from "@clerk/nextjs";
import Masonry from "react-masonry-css";
import { Skeleton } from "../ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import ClothPieceTemplate from "./ClothPieceTemplate";
import FitTemplate from "./FitTemplate";
import { SavedFitItem } from "./SavesPageContent";
import { ClothingPieces } from "./WardrobePageContent";
import useFetchComments from "@/hooks/useFetchComments";
import { FC, useState } from "react";
import useFetchFitById from "@/hooks/useFetchFitById";
import { useFetchClothingPieceById } from "@/hooks/useFetchSingClothPiece";
import { CommentType } from "@/data/type";
import useGetSupaUser from "@/hooks/useGetSupaUser";
import moment from "moment";
import { ScrollArea } from "../ui/scroll-area";
import { cn } from "@/lib/utils";
import Link from "next/link";

const ProfileInWardrobe = () => {
  const { user } = useUser();
  return (
    <div className=" wrapper pb-24">
      <div>
        <div className=" text-xl  opacity-75">
          {user?.firstName}&apos;s Wardrobe
        </div>

        <Tabs className="  mt-4" defaultValue="home">
          <TabsList className=" font-mono mx-auto md:mx-0">
            <TabsTrigger value="home">Home</TabsTrigger>
            <TabsTrigger value="clothes">Clothes</TabsTrigger>
            <TabsTrigger value="outfits">Outfits </TabsTrigger>
            <TabsTrigger value="savedoutfits">Saved outfits</TabsTrigger>
            <TabsTrigger value="comments">comments</TabsTrigger>
          </TabsList>

          <TabsContent value="home">
            <ClothingPieces mansoryDefault={3} clerkID={user?.id} />
          </TabsContent>

          <TabsContent value="clothes">
            <Clothes userid={user?.id} />
          </TabsContent>

          <TabsContent value="outfits">
            <Outfits userid={user?.id} />
          </TabsContent>

          <TabsContent value="savedoutfits">
            <SavedOutfits userid={user?.id} />
          </TabsContent>

          <TabsContent value="comments">
            <Comments userid={user?.id} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

const Clothes = ({ userid }: { userid: string | undefined }) => {
  const { pieces, isLoading } = useFetchClothingPieces(userid);
  const breakpointColumnsObj = {
    default: 3, // 4 columns on large screens
    1100: 3, // 3 columns on medium screens
    768: 2, // 2 columns on tablets
    500: 2, // 1 column on mobile
  };
  return (
    <div className=" mt-5">
      {isLoading ? (
        <div className=" grid grid-cols-3 gap-2">
          <Skeleton className=" w-full h-44 rounded-lg" />
          <Skeleton className=" w-full h-44 rounded-lg" />
          <Skeleton className=" w-full h-44 rounded-lg" />
          <Skeleton className=" w-full h-44 rounded-lg" />
          <Skeleton className=" w-full h-44 rounded-lg" />
          <Skeleton className=" w-full h-44 rounded-lg" />
        </div>
      ) : (
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="flex w-auto gap-4"
          columnClassName="masonry-column"
        >
          {pieces?.map((item, i) => (
            <div key={i} className=" my-2">
              <ClothPieceTemplate
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
            </div>
          ))}
        </Masonry>
      )}
    </div>
  );
};

const Outfits = ({ userid }: { userid: string | undefined }) => {
  const breakpointColumnsObj = {
    default: 3, // 3 columns on large screens
    1100: 3, // 3 columns on medium screens
    768: 2, // 2 columns on tablets
    500: 2, // 2 columns on small screens
  };

  const { fits, isLoading, error } = useFetchFits(userid);

  return (
    <div className="mt-5">
      {isLoading ? (
        <div className="grid grid-cols-3 gap-2">
          <Skeleton className="w-full h-44 rounded-lg" />
          <Skeleton className="w-full h-44 rounded-lg" />
          <Skeleton className="w-full h-44 rounded-lg" />
          <Skeleton className="w-full h-44 rounded-lg" />
          <Skeleton className="w-full h-44 rounded-lg" />
          <Skeleton className="w-full h-44 rounded-lg" />
        </div>
      ) : fits.length === 0 ? (
        <div className="text-center  opacity-50 text-sm mt-36">
          No outfits yet.{" "}
          <a href="/profile/wardrobe" className=" hover:underline">
            Make one
          </a>
        </div>
      ) : (
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="flex w-auto gap-4"
          columnClassName="masonry-column"
        >
          {fits.map((item, i) => (
            <div key={i} className="my-2">
              <FitTemplate
                fitid={item.fitid}
                created_at={item.created_at}
                name={item.name}
                description={item.description}
                facewearid={item.facewearid}
                topwearid={item.topwearid}
                bottomwearid={item.bottomwearid}
                footwearid={item.footwearid}
                senderid={item.senderid}
                tags={item.tags}
              />
            </div>
          ))}
        </Masonry>
      )}
    </div>
  );
};

const SavedOutfits = ({ userid }: { userid: string | undefined }) => {
  const { savedFits, isLoading: isLoadingSaves } = useFetchSavedFits(userid);
  return (
    <div>
      <div>
        {isLoadingSaves ? (
          <div>Loading...</div>
        ) : savedFits.length === 0 ? (
          <div className="text-center  opacity-50 text-sm mt-36">
            No saved outfits yet.
          </div>
        ) : (
          <div className="grid grid-cols-4 mt-10">
            {savedFits.map((savedFit) => (
              <SavedFitItem key={savedFit.fitid} fitid={savedFit.fitid} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const Comments = ({ userid }: { userid: string | undefined }) => {
  const { comments } = useFetchComments(userid);

  // Group comments by postid
  const groupedComments = comments.reduce((acc, comment) => {
    if (!acc[comment.postid]) {
      acc[comment.postid] = [];
    }
    acc[comment.postid].push(comment);
    return acc;
  }, {} as Record<string, CommentType[]>);

  return (
    <div className="grid grid-cols-3 gap-4 mt-5 ">
      {Object.entries(groupedComments).map(([postid, postComments]) => (
        <CommentGroup key={postid} fitid={postid} comments={postComments} />
      ))}
    </div>
  );
};

// 🏷️ New Component: Displays a max of 2 comments, with "View More" option
const CommentGroup = ({
  fitid,
  comments,
}: {
  fitid: string;
  comments: CommentType[];
}) => {
  const { fit, isLoading } = useFetchFitById(fitid);
  const { clothingPiece: face } = useFetchClothingPieceById(fit?.facewearid);
  const { clothingPiece: body } = useFetchClothingPieceById(fit?.topwearid);
  const { clothingPiece: legs } = useFetchClothingPieceById(fit?.bottomwearid);
  const { clothingPiece: feet } = useFetchClothingPieceById(fit?.footwearid);
  const [showAll, setShowAll] = useState(false);

  if (isLoading) return <div>Loading...</div>;
  if (!fit) return null;

  // Show only 2 comments unless expanded
  const displayedComments = showAll ? comments : comments.slice(0, 2);

  return (
    <Link href={`/outfit/${fit.fitid}`}>
      <div className="aspect-square relative group">
        {/* 🏷️ Outfit Images */}
        <div className="grid grid-cols-2 gap-2 scale-90 group-hover:scale-95 transition-all opacity-75">
          {face.image ? (
            <img
              src={face?.image || undefined}
              className="w-full aspect-square h-full rounded-xl object-cover"
              alt={face?.name || "Facewear"}
            />
          ) : (
            <Skeleton className=" w-full aspect-square rounded-lg" />
          )}

          {body.image ? (
            <img
              src={body?.image || undefined}
              className="w-full aspect-square h-full rounded-xl object-cover"
              alt={body?.name || "Topwear"}
            />
          ) : (
            <Skeleton className=" w-full aspect-square rounded-lg" />
          )}

          {legs.image ? (
            <img
              src={legs?.image || undefined}
              className="w-full aspect-square h-full rounded-xl object-cover"
              alt={legs?.name || "Bottomwear"}
            />
          ) : (
            <Skeleton className=" w-full aspect-square rounded-lg" />
          )}

          {feet.image ? (
            <img
              src={feet?.image || undefined}
              className="w-full aspect-square h-full rounded-xl object-cover"
              alt={feet?.name || "Footwear"}
            />
          ) : (
            <Skeleton className=" w-full aspect-square rounded-lg" />
          )}
        </div>

        {/* 🏷️ Comments Section */}

        <div className="text-background absolute left-0 bottom-0 w-full z-20 ">
          <ScrollArea
            className={cn("h-auto", showAll ? " h-44 rounded-xl" : "")}
          >
            {displayedComments.map((comment) => (
              <SingleComment key={comment.commentid} comment={comment} />
            ))}
          </ScrollArea>
          {comments.length > 2 && !showAll && (
            <button
              onClick={() => setShowAll(true)}
              className="w-full text-xs mt-1 text-center bg-foreground p-2 rounded-xl hover:bg-opacity-75 transition"
            >
              View More ({comments.length - 2} more)
            </button>
          )}
        </div>
      </div>
    </Link>
  );
};

// 🏷️ Single Comment Component
const SingleComment = ({ comment }: { comment: CommentType }) => {
  const { supaUser } = useGetSupaUser(comment.senderid);

  return (
    <div className="flex gap-2 mt-0.5 p-2 bg-foreground rounded-xl">
      <img
        className="size-10 rounded-full border-background border bg-background"
        src={supaUser?.pfp}
        alt=""
      />
      <div className="text-sm font-mono">
        <div className="line-clamp-2">{comment.content}</div>
        <div className="text-xs opacity-50 mt-1">
          {moment(comment.created_at).format("MMM Do YY")}
        </div>
      </div>
    </div>
  );
};

export default ProfileInWardrobe;
