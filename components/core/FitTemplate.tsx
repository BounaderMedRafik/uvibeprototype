"use client";
import { ClothingFit, CommentType } from "@/data/type";
import useDeleteFit from "@/hooks/useDeleteFit";
import useFetchComments from "@/hooks/useFetchCommentsByPostID";
import { useFetchClothingPieceById } from "@/hooks/useFetchSingClothPiece";
import useGetSupaUser from "@/hooks/useGetSupaUser";
import useSendComment from "@/hooks/useSendComment";
import { useUser } from "@clerk/nextjs";
import {
  ArrowRight,
  ArrowUpRight,
  Bookmark,
  ExternalLink,
  Heart,
  Save,
  Trash,
} from "lucide-react";
import moment from "moment";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import React, { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import ClothPieceTemplate from "./ClothPieceTemplate";
import { usePathname } from "next/navigation";
import { Textarea } from "../ui/textarea";
import useToggleSave from "@/hooks/useToggleSave";
import { Skeleton } from "../ui/skeleton";

const FitTemplate: React.FC<ClothingFit> = ({
  fitid,
  created_at,
  name,
  description,
  facewearid,
  topwearid,
  bottomwearid,
  footwearid,
  senderid,
}) => {
  const { clothingPiece: face } = useFetchClothingPieceById(facewearid);
  const { clothingPiece: body } = useFetchClothingPieceById(topwearid);
  const { clothingPiece: legs } = useFetchClothingPieceById(bottomwearid);
  const { clothingPiece: feet } = useFetchClothingPieceById(footwearid);
  const { supaUser, isLoadingSupaUser } = useGetSupaUser(senderid);
  const { user } = useUser();

  const { deleteFit, isLoading, error } = useDeleteFit();

  const handleDelete = async () => {
    const success = await deleteFit(fitid);
    if (success) {
      console.log("Fit deleted successfully!");
    } else {
      console.error("Failed to delete fit:", error);
    }
  };
  return (
    <Dialog>
      <div
        id="Whole container"
        className="w-full aspect-square grid grid-cols-2 gap-2 relative group/container"
      >
        {/* Profile Picture (Separate Group) */}
        <div
          id="profilePicture"
          className="absolute shadow-xl hover:scale-110 transition-all group z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 rounded-full border-background"
        >
          <div className="pointer-events-none absolute top-0 left-0 w-full h-full flex items-center justify-center opacity-0 group-hover:opacity-100 bg-background/75 transition-all rounded-full">
            <ArrowUpRight size={13} />
          </div>

          {isLoading ? (
            <Skeleton className=" rounded-full size-20 " />
          ) : (
            <Link
              className="rounded-full "
              href={
                user?.id == supaUser?.userid
                  ? "/profile"
                  : `/user/${supaUser?.userid}`
              }
            >
              <img
                className="size-20 bg-background/90 backdrop-blur-lg rounded-full"
                src={supaUser?.pfp}
                alt={supaUser?.name}
              />
            </Link>
          )}
        </div>

        {user?.id == supaUser?.userid && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className=" size-5 bg-primary text-background rounded-full flex items-center justify-center absolute top-2 right-2 z-40">
                <BsThreeDots size={13} />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Options</DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuItem onClick={handleDelete}>
                <div className="flex items-center gap-2 ">
                  <div>
                    <Trash size={10} />
                  </div>
                  <div>Removes</div>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}

        {/* Hidden Hover Content (Only Affected by group/container) */}
        <div className="opacity-0 pointer-events-none group-hover/container:opacity-100 absolute bottom-0 left-0 w-full p-2 z-30 transition-all">
          <div className="text-xs bg-background/75 backdrop-blur-lg rounded-sm mb-0.5 w-fit ml-auto px-2 py-0.5 font-mono">
            {moment(created_at).startOf("day").fromNow()}
          </div>
          <div className="bg-background/75 backdrop-blur-lg p-1.5 px-2 rounded-lg">
            <div className="text-sm font-semibold line-clamp-1">{name}</div>
            <div className="text-xs opacity-75 line-clamp-1">{description}</div>
          </div>
        </div>

        <DialogTrigger className="absolute top-0 left-0 w-full h-full hover:bg-background/25 z-10 cursor-pointer" />
        <DialogContent className=" min-w-2xl ">
          <DialogTitle className="hidden" />
          <div className=" w-full  flex ">
            <div className=" w-1/2 columns-2 space-y-2">
              <ClothPieceTemplate
                pieceid={face?.pieceid}
                senderid={face?.senderid}
                created_at={face?.created_at}
                name={face?.name}
                description={face?.description}
                brand={face?.brand}
                color={face?.color}
                size={face?.size}
                category={face?.category}
                fit={face?.fit}
                gender={face?.gender}
                pattern={face?.pattern}
                season={face?.season}
                occasion={face?.season}
                price={face?.price}
                image={face?.image}
                source={face?.source}
                forsale={face?.forsale}
                tags={face?.tags}
              />

              <ClothPieceTemplate
                pieceid={body?.pieceid}
                senderid={body?.senderid}
                created_at={body?.created_at}
                name={body?.name}
                description={body?.description}
                brand={body?.brand}
                color={body?.color}
                size={body?.size}
                category={body?.category}
                fit={body?.fit}
                gender={body?.gender}
                pattern={body?.pattern}
                season={body?.season}
                occasion={body?.season}
                price={body?.price}
                image={body?.image}
                source={body?.source}
                forsale={body?.forsale}
                tags={body?.tags}
              />

              <ClothPieceTemplate
                pieceid={legs?.pieceid}
                senderid={legs?.senderid}
                created_at={legs?.created_at}
                name={legs?.name}
                description={legs?.description}
                brand={legs?.brand}
                color={legs?.color}
                size={legs?.size}
                category={legs?.category}
                fit={legs?.fit}
                gender={legs?.gender}
                pattern={legs?.pattern}
                season={legs?.season}
                occasion={legs?.season}
                price={legs?.price}
                image={legs?.image}
                source={legs?.source}
                forsale={legs?.forsale}
                tags={legs?.tags}
              />

              <ClothPieceTemplate
                pieceid={feet?.pieceid}
                senderid={feet?.senderid}
                created_at={feet?.created_at}
                name={feet?.name}
                description={feet?.description}
                brand={feet?.brand}
                color={feet?.color}
                size={feet?.size}
                category={feet?.category}
                fit={feet?.fit}
                gender={feet?.gender}
                pattern={feet?.pattern}
                season={feet?.season}
                occasion={feet?.season}
                price={feet?.price}
                image={feet?.image}
                source={feet?.source}
                forsale={feet?.forsale}
                tags={feet?.tags}
              />
            </div>
            <div className=" w-1/2 p-3 ml-6">
              <div className=" text-lg font-semibold opacity-100 flex items-center justify-between">
                <div>{name}</div>
                <div>
                  <LikeAndSaveButton fitid={fitid} />
                </div>
              </div>
              <div className=" text-xs opacity-75">{description}</div>

              <div className=" my-4 bg-foreground/15 h-px w-full" />

              <Comments fitid={fitid} />
            </div>
          </div>
        </DialogContent>

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
    </Dialog>
  );
};

export const Comments = ({ fitid }: { fitid: string }) => {
  const urlRegex = /(https?:\/\/[\w.-]+)/g;
  const { user } = useUser();
  const [comment, setComment] = useState("");
  const { sendComment, loading, error } = useSendComment();
  const path = usePathname();
  const {
    comments,
    loading: commentsLoading,
    error: commentError,
  } = useFetchComments(fitid);

  if (commentError) {
    console.log("comments error", commentError);
  }

  const handleSendComment = async () => {
    if (!comment.trim()) return;
    const result = await sendComment({
      content: comment,
      senderid: user?.id || "",
      postid: fitid,
    });
    if (result) setComment("");
  };

  return (
    <div>
      <div className="text-sm opacity-75 font-mono flex items-center justify-between">
        <div>Comments {comments.length}</div>
        {path !== `/outfit/${fitid}` && (
          <div>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href={`/outfit/${fitid}`}>
                  <ExternalLink size={14} />
                </Link>
              </TooltipTrigger>
              <TooltipContent>Outfit post</TooltipContent>
            </Tooltip>
          </div>
        )}
      </div>
      <div className="relative mt-2">
        <img
          className="size-5 rounded-full absolute top-2 left-2"
          src={user?.imageUrl}
          alt=""
        />
        {path !== `/outfit/${fitid}` ? (
          <Input
            className="text-xs placeholder:text-xs px-9 font-mono "
            placeholder="Comment your opinion..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        ) : (
          <Textarea
            className="text-xs placeholder:text-xs px-9 font-mono resize-none"
            placeholder="Comment your opinion..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        )}
        <AnimatePresence mode="wait">
          {comment && (
            <motion.button
              key="submit"
              initial={{ opacity: 0, y: 10 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { ease: [0.25, 1, 0.5, 1] },
              }}
              exit={{
                opacity: 0,
                y: 10,
                transition: { ease: [0.25, 1, 0.5, 1] },
              }}
              onClick={handleSendComment}
              disabled={loading}
              className="absolute cursor-pointer top-2 right-2 size-5 flex items-center justify-center bg-primary text-background rounded-full disabled:opacity-50"
            >
              <ArrowRight size={10} />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}

      <ScrollArea className=" h-64 mt-2">
        <div className=" space-y-1">
          {comments.map((item, i) => (
            <div key={i}>
              <CommentCard
                commentid={item.commentid}
                created_at={item.created_at}
                content={item.content}
                senderid={item.senderid}
                postid={item.postid}
              />
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export const LikeAndSaveButton = ({ fitid }: { fitid: string }) => {
  const { user } = useUser();
  const saverid = user?.id;
  const { isSaved, toggleSave, isLoading } = useToggleSave(fitid, saverid!);

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={toggleSave}
        disabled={isLoading}
        className="cursor-pointer"
      >
        <Bookmark
          size={18}
          className={isSaved ? "text-primary fill-primary" : "text-gray-500"}
        />
      </button>
    </div>
  );
};

const CommentCard: React.FC<CommentType> = ({
  commentid,
  created_at,
  content,
  senderid,
  postid,
}) => {
  const [expanded, setExpanded] = useState(false);
  const { supaUser, isLoadingSupaUser } = useGetSupaUser(senderid);
  const urlRegex = /(https?:\/\/[\w.-]+)/g;
  const { user } = useUser();

  const formatComment = (text: string) => {
    return text.split(urlRegex).map((part, index) => {
      if (urlRegex.test(part)) {
        try {
          const url = new URL(part);
          return (
            <Tooltip key={index}>
              <TooltipTrigger asChild>
                <a
                  href={part}
                  target="_blank"
                  rel="noopener noreferrer"
                  className=" bg-accent/50 px-1 py-0.5 border border-e rounded-md underline"
                >
                  {url.host}
                </a>
              </TooltipTrigger>
              <TooltipContent>{url.href}</TooltipContent>
            </Tooltip>
          );
        } catch {
          return part;
        }
      }
      return part;
    });
  };

  return (
    <div className="p-2 bg-accent/25 border border-foreground/10 hover:border-foreground/50 group rounded-sm grid grid-cols-12">
      {/* User Image */}
      <div className="col-span-1">
        <Tooltip>
          <TooltipTrigger asChild>
            {isLoadingSupaUser ? (
              <Skeleton className="size-5 rounded-full" />
            ) : (
              <Link
                href={senderid == user?.id ? "/profile" : `/user/${senderid}`}
              >
                <img
                  className="size-5 rounded-full"
                  src={supaUser?.pfp}
                  alt=""
                />
              </Link>
            )}
          </TooltipTrigger>
          <TooltipContent>
            <div className=" font-mono">@{supaUser?.username}</div>
          </TooltipContent>
        </Tooltip>
      </div>

      {/* Comment Content */}
      <div className="col-span-10 text-xs group-hover:opacity-100 px-2 opacity-75">
        <span className={expanded ? "" : "line-clamp-3"}>
          {formatComment(content)}
        </span>

        <div className="flex items-center justify-between mt-1">
          <div className=" w-full opacity-25 font-mono ">
            {moment(created_at).startOf("hour").fromNow()}
          </div>
          {content.length > 100 && !expanded && (
            <button
              onClick={() => setExpanded(true)}
              className=" opacity-50  text-end w-full  hover:underline text-xs"
            >
              See more...
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FitTemplate;
