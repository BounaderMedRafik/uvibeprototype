"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { clothingStyles, posts } from "@/frontdata";
import { PostTypeProps } from "@/fronttypes";
import { cn } from "@/lib/utils";
import { ArrowUpRight, Bookmark, Heart, Home } from "lucide-react";
import moment from "moment";
import { useEffect, useState } from "react";
import { BiSolidDownvote, BiSolidUpvote } from "react-icons/bi";

const FeedPageContent = () => {
  const [cate, setCate] = useState("");

  const [shuffledPosts, setShuffledPosts] = useState(posts);

  useEffect(() => {
    setShuffledPosts([...posts].sort(() => Math.random() - 0.5));
  }, [posts]); // Shuffle once when posts change

  return (
    <div className="wrapper">
      <div className="md:flex block  items-center justify-between">
        <div className="flex items-center gap-2">
          <div>
            <Home size={17} />
          </div>
          <div className=" text-lg">Feed</div>
        </div>
        <div className="flex items-center gap-1 mt-2 md:mt-0 flex-wrap">
          {clothingStyles.map((item, i) => (
            <div
              key={i}
              onClick={() => {
                setCate(item == cate ? "" : item);
              }}
              className={cn(
                " border select-none border-foreground/10 px-4 py-1 rounded-full text-sm cursor-pointer hover:bg-accent/10 transition-all",
                cate === item &&
                  "bg-accent/40 hover:bg-accent/30 border-accent/60"
              )}
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      <div className="md:masonry-2-col lg:masonry-3-col box-border mx-auto before:box-inherit after:box-inherit">
        {shuffledPosts.map((item, i) => (
          <div key={i} className="break-inside w-full">
            <FeedPost {...item} />
          </div>
        ))}
      </div>
    </div>
  );
};

const FeedPost = ({
  title,
  description,
  outfit,
  outfitImage,
  createdAt,
  upVotes: initialUpVotes,
  downVotes: initialDownVotes,
  comments,
  category,
  sender,
  saved: initialSaved,
  colorScheme,
}: PostTypeProps) => {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [upVotes, setUpVotes] = useState(initialUpVotes);
  const [downVotes, setDownVotes] = useState(initialDownVotes);
  const [saved, setSaved] = useState(initialSaved);
  const [commentLiked, setCommentLiked] = useState(false);

  const handleLike = () => {
    if (liked) {
      setUpVotes((prev) => prev - 1);
      setLiked(false);
    } else {
      setUpVotes((prev) => prev + 1);
      setLiked(true);
      if (disliked) {
        setDownVotes((prev) => prev - 1);
        setDisliked(false);
      }
    }
  };

  const handleDislike = () => {
    if (disliked) {
      setDownVotes((prev) => prev - 1);
      setDisliked(false);
    } else {
      setDownVotes((prev) => prev + 1);
      setDisliked(true);
      if (liked) {
        setUpVotes((prev) => prev - 1);
        setLiked(false);
      }
    }
  };

  const handleSave = () => {
    if (saved) {
      setSaved(false);
    } else {
      setSaved(true);
    }
  };

  const handleCommentLike = () => {
    if (commentLiked) {
      setCommentLiked(false);
    } else {
      setCommentLiked(true);
    }
  };

  return (
    <div className="h-full py-4">
      <div>
        <Dialog>
          <DialogTrigger>
            <div className=" relative group  cursor-pointer ">
              <div className=" absolute pointer-events-none opacity-0 group-hover:opacity-100 transition-all bg-background/80 flex items-center justify-center w-full h-full">
                <div className="flex items-center gap-3">
                  <div>View post</div>
                  <div>
                    <ArrowUpRight size={14} />
                  </div>
                </div>
              </div>
              <img
                className="rounded-xl border border-foreground/25 "
                src={outfitImage}
              />
            </div>
          </DialogTrigger>
          <DialogContent className=" max-w-screen-lg">
            <DialogHeader>
              <DialogTitle>
                <div className="flex items-center gap-3">
                  <div>{title}</div>
                  <div className=" px-2 font-normal py-1 text-xs bg-accent/40 hover:bg-accent/30 border-accent/60 rounded-full border">
                    {category}
                  </div>
                </div>
              </DialogTitle>
            </DialogHeader>
            <div className="flex items-start">
              <img
                src={outfitImage}
                className="hidden md:block rounded-xl max-w-sm"
              />
              <div className=" py-0 md:p-5 flex flex-col justify-between items-center h-full">
                <div>
                  <div className=" text-sm font-semibold opacity-75">
                    Clothes Mentioned
                  </div>
                  <ScrollArea className=" max-w-xs md:max-w-full mx-auto pb-3">
                    <div className="flex w-full  overflow-x-scroll items-stretch gap-0.5 mt-1">
                      {Object.entries(outfit).map(([key, item]) => (
                        <div
                          key={key}
                          className="flex flex-col items-center md:p-2 p-1 border border-foreground/10 rounded-xl h-fit w-28"
                        >
                          <img
                            className="aspect-square md:w-24 w-16 object-contain"
                            src={item.image}
                          />
                          <div className="text-xs text-start w-full flex-grow line-clamp-1">
                            {item.name}
                          </div>
                          <div className="text-xs text-start w-full flex-grow line-clamp-1">
                            {item.originalSource}
                          </div>
                        </div>
                      ))}
                    </div>
                    <ScrollBar orientation="horizontal" />
                  </ScrollArea>
                  <div className=" text-sm font-semibold opacity-75 mt-3">
                    Description
                  </div>
                  <div className=" text-sm opacity-75">{description}</div>

                  <div>
                    <div className=" text-sm font-semibold opacity-75 mt-3">
                      Color Distribution
                    </div>
                    <div>
                      <div className=" border border-accent rounded-full overflow-hidden max-w-sm  h-3  mt-2 flex">
                        <div
                          style={{
                            width: "60%",
                            height: "100%",
                            backgroundColor: `${colorScheme.mainColor}`,
                          }}
                        />
                        <div
                          style={{
                            width: "30%",
                            height: "100%",
                            backgroundColor: `${colorScheme.secondaryColor}`,
                          }}
                        />
                        <div
                          style={{
                            width: "10%",
                            height: "100%",
                            backgroundColor: `${colorScheme.accentColor}`,
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className=" text-sm font-semibold opacity-75 mt-3">
                    Comments {comments.length}
                  </div>

                  <ScrollArea className=" w-full h-[300px] ">
                    {comments.map((item, i) => (
                      <div
                        key={i}
                        className=" py-3 flex items-center justify-between pr-5"
                      >
                        <div className="flex gap-3">
                          <div>
                            <img
                              className=" size-10 rounded-full object-cover"
                              src={item.profilePic}
                              alt=""
                            />
                          </div>
                          <div>
                            <div className=" font-semibold opacity-75 text-sm">
                              {item.name}
                            </div>
                            <div className="text-xs">{item.content}</div>
                            <div className="text-xs opacity-75 mt-1">
                              {moment(item.timestamp).endOf("day").fromNow()}
                            </div>
                          </div>
                        </div>

                        <div
                          onClick={handleCommentLike}
                          className=" hover:opacity-75 transition-all flex items-center justify-center flex-col cursor-pointer"
                        >
                          <Heart
                            className={cn(commentLiked ? " fill-accent" : "")}
                            size={14}
                          />
                          <div className=" text-xs">
                            {item.likes == 0 ? "" : item.likes}
                          </div>
                        </div>
                      </div>
                    ))}
                  </ScrollArea>
                </div>

                <div className=" w-full flex items-center justify-between pt-1 border-t border-t-foreground/10">
                  <div className="flex items-center gap-4">
                    <div>
                      <img
                        src={sender.profilePic}
                        className=" size-10 rounded-full"
                      />
                    </div>
                    <div>
                      <div className=" text-sm font-semibold">
                        {sender.name}
                      </div>
                      <div className=" text-xs">
                        {moment(createdAt).subtract(10, "days").calendar()}
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-start ">
                      <Button
                        size="sm"
                        onClick={handleLike}
                        variant={liked ? "default" : "outline"}
                        className="rounded-r-none rounded-l-full h-6"
                      >
                        <div className="flex items-center gap-2.5">
                          <BiSolidUpvote size={10} />
                          <div className="font-semibold">{upVotes}</div>
                        </div>
                      </Button>
                      <Button
                        size="sm"
                        onClick={handleDislike}
                        variant={disliked ? "grayOne" : "outline"}
                        className="rounded-l-none rounded-r-full h-6"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="font-semibold">{downVotes}</div>
                          <BiSolidDownvote size={10} />
                        </div>
                      </Button>
                      <Button
                        size="icon"
                        onClick={handleSave}
                        variant={saved ? "greenOne" : "outline"}
                        className="w-6 h-6 ml-1"
                      >
                        <Bookmark size={10} />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        <div className="p-1">
          <div className="text-sm font-semibold opacity-75">{title}</div>
          <div className="flex justify-start mt-1">
            <Button
              size="sm"
              onClick={handleLike}
              variant={liked ? "default" : "outline"}
              className="rounded-r-none rounded-l-full h-6"
            >
              <div className="flex items-center gap-2.5">
                <BiSolidUpvote size={10} />
                <div className="font-semibold">{upVotes}</div>
              </div>
            </Button>
            <Button
              size="sm"
              onClick={handleDislike}
              variant={disliked ? "grayOne" : "outline"}
              className="rounded-l-none rounded-r-full h-6"
            >
              <div className="flex items-center gap-2.5">
                <div className="font-semibold">{downVotes}</div>
                <BiSolidDownvote size={10} />
              </div>
            </Button>
            <Button
              size="icon"
              onClick={handleSave}
              variant={saved ? "greenOne" : "outline"}
              className="w-6 h-6 ml-1"
            >
              <Bookmark size={10} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedPageContent;
