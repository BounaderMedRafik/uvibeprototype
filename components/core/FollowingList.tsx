import useFollowedTags from "@/hooks/useFollowedTags";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Hash } from "lucide-react";
import useToggleFollowTag from "@/hooks/useToggleFollowTag";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { replacePercent } from "@/lib/space";

const FollowedTagRow = ({ tag }: { tag: string }) => {
  const { isFollowing, toggleFollow, loading } = useToggleFollowTag(tag);

  return (
    <div className="flex items-center justify-between ">
      <div className="flex items-center gap-2">
        <Hash size={13} />
        <div className="text-sm font-bold  opacity-75">
          {replacePercent(tag)}
        </div>
      </div>
      <Button
        size="sm"
        variant="ghost"
        className="text-xs"
        onClick={toggleFollow}
        disabled={loading}
      >
        {loading ? "..." : isFollowing ? "Unfollow" : "Follow"}
      </Button>
    </div>
  );
};

const FollowingList = () => {
  const { tags, loading: loadingTags } = useFollowedTags();

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <div className="opacity-75 hover:opacity-100 text-sm px-2 py-1 cursor-pointer">
            {tags.length} Following
          </div>
        </DialogTrigger>
        <DialogContent className="w-64">
          <DialogHeader>
            <DialogTitle>Followings</DialogTitle>
          </DialogHeader>
          <div className="mt-2">
            <div className="text-sm font-bold opacity-75 mb-2">Tags</div>
            <ScrollArea className=" h-44">
              {loadingTags ? (
                <div className="text-xs opacity-50">Loading...</div>
              ) : tags.length === 0 ? (
                <div className="text-xs opacity-50">No followed tags.</div>
              ) : (
                <div className="">
                  {tags.map((tag, i) => (
                    <FollowedTagRow key={i} tag={tag} />
                  ))}
                </div>
              )}
            </ScrollArea>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FollowingList;
