"use client";

import supabase from "@/app/supabase/supaClient";
import { SupaUser } from "@/data/type";
import useChangeUserBanner from "@/hooks/useChangeUserBanner";
import useChangeUserBio from "@/hooks/useChangeUserBio";
import useGetSupaUser from "@/hooks/useGetSupaUser";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import {
  BriefcaseBusiness,
  Brush,
  Camera,
  CheckCircle2,
  Eye,
  Info,
  Loader,
} from "lucide-react";
import { motion } from "motion/react";
import { ChangeEvent, useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import { Input } from "../ui/input";
import { Skeleton } from "../ui/skeleton";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { TbClover, TbShirt } from "react-icons/tb";
import { CgColorPicker, CgMoon } from "react-icons/cg";
import { FaCloudSunRain } from "react-icons/fa6";
import { IoIosBody } from "react-icons/io";
import { IoScale } from "react-icons/io5";
import { MdFace } from "react-icons/md";
import { GiBodyHeight } from "react-icons/gi";

const ProfilePageContent = () => {
  const { user, isLoaded } = useUser();
  const role = user?.unsafeMetadata.role;
  const { supaUser, isLoadingSupaUser } = useGetSupaUser(user?.id);
  // console.log(role);

  return (
    <div className=" -mt-24">
      <div className=" -mt-24 ">
        <div className=" w-full ">
          <ProfileBannerAndInfos clerkuser={supaUser} />
        </div>

        <div className=" wrapper mt-5">
          <div className="flex items-center justify-between">
            <div className=" text-sm opacity-75">
              {isLoaded ? (
                <div className="flex items-center gap-2">
                  {`${user?.username == null ? "" : "@"}${
                    user?.username == null ? "set a username" : user.username
                  }`}

                  {user?.username == null ? <Brush size={12} /> : ""}
                </div>
              ) : (
                <Skeleton className=" w-14 h-3 mb-3" />
              )}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="  text-xl  font-bold flex items-center gap-2">
              <div>
                {isLoaded ? (
                  role === "pro" ? (
                    <div className="flex items-center gap-1">
                      <div>{user?.fullName}</div>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-800 text-rose-200 text-xs font-semibold border border-rose-700">
                            Shop
                            <CheckCircle2 className="w-3.5 h-3.5 text-rose-200" />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Verified</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1">
                      <div>{user?.fullName} </div>
                      <HoverCard openDelay={300}>
                        <HoverCardTrigger asChild>
                          <div className=" rounded-full bg-primary size-5 flex items-center justify-center text-background">
                            <Info size={14} />
                          </div>
                        </HoverCardTrigger>
                        <HoverCardContent>
                          <div className=" text-sm opacity-75 font-semibold">
                            {user?.firstName} Informations
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
                              <CgMoon className=" opacity-75" size={16} />
                              <div className="text-sm ">
                                {supaUser?.hijabi ? "Hijab" : "Non Hijab"}
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
                  )
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
                <Bio user={supaUser} />
              </motion.div>
            )}
          </div>
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
  const { user, isLoaded } = useUser();
  const { updateBanner } = useChangeUserBanner(user?.id || "");

  const handleBannerUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    if (!file) return;

    try {
      const newBannerUrl = await updateBanner(file, clerkuser?.banner);
      if (newBannerUrl) {
        toast.success("Banner updated successfully!");
      }
    } catch (error) {
      console.error("Error uploading banner:", error);
      toast.error("Failed to upload banner. Try again.");
    }
  };

  const handleImageUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return; // Ensure files exist

    const file = files[0];
    if (!file || !user?.setProfileImage || !user?.id) return;

    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = async () => {
      if (img.width !== img.height) {
        toast.error("Only 1:1 aspect ratio images are allowed!");
        return;
      }

      try {
        // Upload new image to Clerk
        await user.setProfileImage({ file });

        // Wait a moment for Clerk to update the profile image URL
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // Fetch the updated user data from Clerk
        const updatedUser = await user?.reload(); // Ensure Clerk refreshes user data
        const newProfileImageUrl = updatedUser?.imageUrl;

        if (!newProfileImageUrl)
          throw new Error("Failed to get new profile image URL");

        // Update the profile image URL in Supabase database
        const { error } = await supabase
          .from("users")
          .update({ pfp: newProfileImageUrl })
          .eq("userid", user.id);

        if (error) throw error;

        toast.success("Profile picture updated successfully!");
      } catch (error) {
        console.error("Error updating profile picture:", error);
        toast.error("Failed to update profile picture. Try again.");
      }
    };
  };

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

        {/* Buttons */}
        <div className="absolute -bottom-9 group-hover:bottom-2 transition-all left-1/2 -translate-x-1/2">
          <div className="flex items-center ">
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="secondary"
                  size="icon"
                  className=" rounded-l-full "
                >
                  <Eye size={13} />
                </Button>
              </DialogTrigger>
              <DialogContent className="p-0.5">
                <DialogTitle className=" sr-only" />
                <img
                  className="h-64 w-full object-cover rounded-md"
                  src={
                    clerkuser?.banner
                      ? clerkuser.banner
                      : "https://images.pexels.com/photos/1133957/pexels-photo-1133957.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  }
                  alt=""
                />
              </DialogContent>
            </Dialog>
            <label className="inline-block relative">
              <input
                type="file"
                className="hidden"
                onChange={handleBannerUpload}
                accept="image/*"
                id="bannerUpload"
              />
              <Button
                size="sm"
                className=" rounded-r-full"
                onClick={() => document.getElementById("bannerUpload")?.click()}
              >
                Change cover
              </Button>
            </label>
          </div>
        </div>
      </div>

      {/* Profile Image Section */}
      <div className="wrapper -mt-14">
        {isLoaded ? (
          <div className="relative border-4 bg-background/25 backdrop-blur-lg border-background hover:border-foreground/25 shadow-xl transition-all duration-300 cursor-pointer group rounded-full overflow-hidden w-fit">
            <motion.img
              initial={{ opacity: 0, filter: "blur(10px)" }}
              animate={{
                opacity: 1,
                filter: "blur(0px)",
                transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] },
              }}
              className="size-32 shadow-lg"
              src={user?.imageUrl}
              alt="Profile"
            />
            <label className="h-1/2 text-center group-hover:bottom-0 flex-col gap-1 opacity-0 group-hover:opacity-100 w-full absolute -bottom-full transition-all ease-[0.25, 1, 0.5, 1] duration-300 left-0 bg-background/75 backdrop-blur-sm z-20 flex items-center object-cover justify-center cursor-pointer">
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
              />
              <Camera size={16} className="opacity-75" />
              <div className="text-xs w-1/2">Recommend size 1:1</div>
            </label>
          </div>
        ) : (
          <Skeleton className="size-32 shadow-lg rounded-full flex items-center justify-center">
            <Loader size={24} className="animate-spin" />
          </Skeleton>
        )}
      </div>
    </div>
  );
};

const Bio = ({ user }: { user: SupaUser | null }) => {
  const MAX_BIO_LENGTH = 40;
  const { user: clerkUser } = useUser();
  const { updateBio, isLoading } = useChangeUserBio(clerkUser?.id);

  const [editing, setEditing] = useState(false);
  const [newBio, setNewBio] = useState(user?.bio || "");
  const [error, setError] = useState<string | null>(null);

  const handleSave = async () => {
    if (newBio.length > MAX_BIO_LENGTH) return;
    await updateBio(newBio);
    setEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewBio(value);

    if (value.length > MAX_BIO_LENGTH) {
      setError(`Bio must be ${MAX_BIO_LENGTH} characters max.`);
    } else {
      setError(null);
    }
  };

  return (
    <div
      className={cn(
        "text-base  opacity-75 flex flex-col gap-1 transition-all w-2/3 cursor-pointer hover:opacity-100",
        editing ? "opacity-100" : ""
      )}
    >
      {editing ? (
        <motion.div
          initial={{
            opacity: 0,
            filter: "blur(10px)",
          }}
          animate={{
            opacity: 1,
            filter: "blur(0)",
            transition: {
              ease: [0.33, 1, 0.68, 1],
            },
          }}
          className="flex flex-col gap-1"
        >
          <div className="flex gap-1 items-center">
            <Input
              type="text"
              value={newBio}
              onChange={handleChange}
              max={41}
              maxLength={41}
              className="border h-8 rounded text-sm"
              disabled={isLoading}
            />
            <div className="flex items-center gap-0.5">
              <Button
                size="sm"
                onClick={handleSave}
                disabled={isLoading || !!error}
              >
                {isLoading ? "Saving..." : "Save"}
              </Button>
              <Button
                onClick={() => setEditing(false)}
                size="sm"
                variant="outline"
              >
                Cancel
              </Button>
            </div>
          </div>
          {error && <p className="text-destructive text-xs">{error}</p>}
        </motion.div>
      ) : (
        <div
          onClick={() => setEditing(true)}
          className="flex items-center gap-1 text-sm group"
        >
          <div>{user?.bio ? user.bio : "No bio yet, Create one!"}</div>
          <div className="group-hover:opacity-100 opacity-0 transition-all text-xs">
            (Edit Bio)
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePageContent;
