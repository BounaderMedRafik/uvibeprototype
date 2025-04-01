"use client";
import { useFetchClothingPieceById } from "@/hooks/useFetchSingClothPiece";
import React from "react";
import ClothPieceTemplate from "./ClothPieceTemplate";
import { Comments, LikeAndSaveButton } from "./FitTemplate";
import Link from "next/link";
import { Hash, Share, Clipboard } from "lucide-react";
import useGetSupaUser from "@/hooks/useGetSupaUser";
import moment from "moment";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import useFetchFitById from "@/hooks/useFetchFitById";

const OutfitPageContent = ({ id }: { id: string }) => {
  const { fit, isLoading } = useFetchFitById(id);
  const { clothingPiece: face } = useFetchClothingPieceById(fit?.facewearid);
  const { clothingPiece: body } = useFetchClothingPieceById(fit?.topwearid);
  const { clothingPiece: legs } = useFetchClothingPieceById(fit?.bottomwearid);
  const { clothingPiece: feet } = useFetchClothingPieceById(fit?.footwearid);

  const { supaUser, isLoadingSupaUser } = useGetSupaUser(fit?.senderid);
  const { user } = useUser();

  const handleCopyLink = () => {
    const outfitUrl = `${window.location.origin}/outfit/${id}`;
    navigator.clipboard.writeText(outfitUrl);
    toast.success("Link copied to clipboard!");
  };

  return (
    <div className="wrapper">
      <div className="flex gap-10">
        <div className="w-1/2 columns-2 space-y-2">
          <ClothPieceTemplate {...face} />
          <ClothPieceTemplate {...body} />
          <ClothPieceTemplate {...legs} />
          <ClothPieceTemplate {...feet} />
        </div>

        <div className="mt-2 w-1/2">
          <div className="text-xl flex items-center justify-between">
            <div>{fit?.name}</div>
            <div className="flex items-center gap-1">
              <div
                className="flex items-center gap-2 px-3 py-1 hover:bg-accent rounded-full cursor-pointer"
                onClick={handleCopyLink}
              >
                <Share size={14} />
                <div className="text-sm opacity-75">Share</div>
              </div>

              <LikeAndSaveButton fitid={id} />
            </div>
          </div>

          <div className="text-sm opacity-75 mb-5">{fit?.description}</div>

          <div className=" my-4 h-px w-full bg-accent" />

          <Link
            href={
              user?.id === supaUser?.userid
                ? "/profile"
                : `/user/${supaUser?.userid}`
            }
          >
            <div className="flex gap-2 mb-4 w-full hover:opacity-75">
              <img src={supaUser?.pfp} className="size-10 rounded-full" />
              <div className="w-full">
                <div className="text-sm opacity-75 font-mono">
                  @{supaUser?.username}
                </div>
                <div className="flex items-center justify-between w-full">
                  <div>{supaUser?.name}</div>
                  <div className="text-xs opacity-75">
                    {moment(fit?.created_at).startOf("hour").fromNow()}
                  </div>
                </div>
              </div>
            </div>
          </Link>

          <div className=" my-4 h-px w-full bg-accent" />

          <div className="text-sm opacity-75 font-mono mb-5 space-y-2">
            <div>Tags</div>
            <div className="flex flex-wrap items-center gap-0.5">
              {fit?.tags.map((item, i) => (
                <Link key={i} href={`/tag/${item}`}>
                  <div className="text-xs flex items-center gap-1 px-1 py-0.5 bg-accent border border-foreground/10 hover:border-foreground/50 rounded-sm font-mono">
                    <div className="flex items-center gap-0.5">
                      <Hash size={12} />
                      <div>{item}</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <Comments fitid={id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OutfitPageContent;
