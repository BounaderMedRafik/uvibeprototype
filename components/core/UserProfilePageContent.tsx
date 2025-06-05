"use client";
import { CommentType, SupaUser } from "@/data/type";
import useGetSupaUser from "@/hooks/useGetSupaUser";
import { cn } from "@/lib/utils";
import { BriefcaseBusiness, Info } from "lucide-react";
import { motion } from "motion/react";
import { CgColorPicker } from "react-icons/cg";
import { FaCloudSunRain } from "react-icons/fa6";
import { GiBodyHeight } from "react-icons/gi";
import { IoIosBody } from "react-icons/io";
import { IoScale } from "react-icons/io5";
import { MdFace } from "react-icons/md";
import { TbClover, TbShirt } from "react-icons/tb";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import { Skeleton } from "../ui/skeleton";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import moment from "moment";
import Link from "next/link";
import { ScrollArea } from "../ui/scroll-area";
import useFetchFitById from "@/hooks/useFetchFitById";
import { useFetchClothingPieceById } from "@/hooks/useFetchSingClothPiece";
import { useState } from "react";
import useFetchComments from "@/hooks/useFetchComments";
import useFetchSavedFits from "@/hooks/useFetchSavedFits";
import { SavedFitItem } from "./SavesPageContent";
import Masonry from "react-masonry-css";
import FitTemplate from "./FitTemplate";
import useFetchFits from "@/hooks/useFetchFits";
import ClothPieceTemplate from "./ClothPieceTemplate";
import useFetchClothingPieces from "@/hooks/useFetchClothingPieces";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { ClothingPieces } from "./WardrobePageContent";

const UserProfilePageContent = ({ id }: { id: string }) => {
  const { supaUser, isLoadingSupaUser } = useGetSupaUser(id);
  return (
    <div>
      <div className=" -mt-24">
        <div className=" -mt-24 ">
          <div className=" w-full ">
            <ProfileBannerAndInfos clerkuser={supaUser} />
          </div>

          <div className=" wrapper mt-5">
            <div className="flex items-center justify-between">
              <div className=" text-sm opacity-75">{supaUser?.username}</div>
            </div>

            <div className="flex items-center justify-between">
              <div className="  text-xl  font-bold flex items-center gap-2">
                <div>
                  {!isLoadingSupaUser ? (
                    <div className="flex items-center gap-1">
                      <div>{supaUser?.name} </div>
                      <HoverCard openDelay={300}>
                        <HoverCardTrigger asChild>
                          <div className=" rounded-full bg-primary size-5 flex items-center justify-center text-background">
                            <Info size={14} />
                          </div>
                        </HoverCardTrigger>
                        <HoverCardContent>
                          <div className=" text-sm opacity-75 font-semibold">
                            {supaUser?.name} Informations
                          </div>
                          <div className=" mt-2">
                            <div className=" flex items-center gap-2">
                              <GiBodyHeight className=" opacity-75" size={16} />
                              <div className="text-sm ">
                                {supaUser?.height} cm
                              </div>
                            </div>
                            <div className=" flex items-center gap-2">
                              <IoScale className=" opacity-75" size={16} />
                              <div className="text-sm ">
                                {supaUser?.weight} kg
                              </div>
                            </div>
                            <div className=" flex items-center gap-2">
                              <MdFace className=" opacity-75" size={16} />
                              <div className="text-sm ">
                                {supaUser?.headShape} Face shape
                              </div>
                            </div>
                            <div className=" flex items-center gap-2">
                              <IoIosBody className=" opacity-75" size={16} />
                              <div className="text-sm ">
                                {supaUser?.bodyShape} Body shape
                              </div>
                            </div>
                            <div className=" flex items-center gap-2">
                              <TbClover className=" opacity-75" size={16} />
                              <div className="text-sm ">
                                {supaUser?.relation}
                              </div>
                            </div>
                            <div className=" flex items-center gap-2">
                              <BriefcaseBusiness
                                className=" opacity-75"
                                size={16}
                              />
                              <div className="text-sm ">{supaUser?.work}</div>
                            </div>
                            <div className=" flex items-center gap-2">
                              <FaCloudSunRain
                                className=" opacity-75"
                                size={16}
                              />
                              <div
                                style={{
                                  backgroundColor: supaUser?.skintone,
                                }}
                                className=" w-8 h-2.5 border border-foreground/10 rounded-full mt-0.5"
                              />
                            </div>
                            <div className=" flex items-center gap-2">
                              <CgColorPicker
                                className=" opacity-75"
                                size={16}
                              />
                              <div className="flex items-center gap-0.5">
                                {supaUser?.favColors.map((item, i) => (
                                  <Tooltip key={i}>
                                    <TooltipTrigger asChild>
                                      <div
                                        style={{
                                          backgroundColor: item.hex,
                                        }}
                                        className=" w-8 h-2.5 border-2 border-foreground/10 rounded-full mt-0.5"
                                      />
                                    </TooltipTrigger>
                                    <TooltipContent>{item.name}</TooltipContent>
                                  </Tooltip>
                                ))}
                              </div>
                            </div>

                            <div className=" flex items-center gap-2">
                              <TbShirt className=" opacity-75" size={16} />
                              <div className="flex items-center gap-0.5 flex-wrap">
                                {supaUser?.favBrands.map((item, i) => (
                                  <Tooltip key={i}>
                                    <TooltipTrigger>
                                      <div className="  px-1 py-0.5 border-2 border-foreground/10 rounded-full mt-0.5 text-[8px]">
                                        {item.name}
                                      </div>
                                    </TooltipTrigger>
                                  </Tooltip>
                                ))}
                              </div>
                            </div>
                          </div>
                        </HoverCardContent>
                      </HoverCard>
                    </div>
                  ) : (
                    <Skeleton className=" w-24 h-6" />
                  )}
                </div>
                <div className=" mt-0.5 flex flex-wrap items-center gap-0.5">
                  {/* roles and shi */}
                </div>
              </div>
            </div>

            <div className=" mt-3">
              {isLoadingSupaUser ? (
                <>
                  <div className="flex items-center justify-between">
                    <Skeleton className=" h-3 w-44" />
                    <Skeleton className=" h-3 w-44 " />
                  </div>
                </>
              ) : (
                <motion.div
                  initial={{
                    opacity: 0,
                    filter: "blur(10px)",
                  }}
                  animate={{
                    opacity: 1,
                    filter: "blur(0px)",
                    transition: {
                      ease: [0.33, 1, 0.68, 1],
                    },
                  }}
                  className=" flex items-center justify-between"
                >
                  <div>{supaUser?.bio}</div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className=" h-px w-full p-0 wrapper mx-auto my-6 bg-foreground/25" />

      <div className=" wrapper pb-24">
        <div>
          <div className=" text-xl  opacity-75">
            {supaUser?.name}&apos;s Wardrobe
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
              <ClothingPieces mansoryDefault={3} clerkID={supaUser?.userid} />
            </TabsContent>

            <TabsContent value="clothes">
              <Clothes userid={supaUser?.userid} />
            </TabsContent>

            <TabsContent value="outfits">
              <Outfits userid={supaUser?.userid} />
            </TabsContent>

            <TabsContent value="savedoutfits">
              <SavedOutfits userid={supaUser?.userid} />
            </TabsContent>

            <TabsContent value="comments">
              <Comments userid={supaUser?.userid} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

const ProfileBannerAndInfos = ({
  clerkuser,
}: {
  clerkuser: SupaUser | null;
}) => {
  return (
    <div className="relative ">
      {/* Banner Section */}
      <div className="relative group overflow-hidden">
        {!clerkuser?.banner ? (
          <>
            <Skeleton className="w-full h-64 max-w-5xl mx-auto rounded-b-3xl  " />
          </>
        ) : (
          <>
            <motion.img
              className={cn(
                "w-full h-64 max-w-5xl mx-auto rounded-b-3xl  object-cover border-b border-b-foreground/10",
                clerkuser.banner ==
                  "https://hgrncbiqksbbxlrjxfoj.supabase.co/storage/v1/object/public/banners/dev/bannerplaceholder.png"
                  ? " dark:invert"
                  : ""
              )}
              src={clerkuser?.banner}
              alt="User Banner"
            />
          </>
        )}
      </div>

      {/* Profile Image Section */}
      <div className="wrapper -mt-14">
        <div className="relative border-4 bg-background/25 backdrop-blur-lg border-background hover:border-foreground/25 shadow-xl transition-all duration-300 cursor-pointer group rounded-full overflow-hidden w-fit">
          <motion.img
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{
              opacity: 1,
              filter: "blur(0px)",
              transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] },
            }}
            className="size-32 shadow-lg"
            src={clerkuser?.pfp}
            alt="Profile"
          />
        </div>
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

export default UserProfilePageContent;
