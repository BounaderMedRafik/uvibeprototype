"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FeedNavigationItems, messages, notifications } from "@/frontdata";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  Bell,
  Check,
  Clock,
  Info,
  LogOut,
  MailWarning,
  Menu,
  MessageCircleDashed,
  PlusCircle,
  Search,
  Trash,
  TriangleAlert,
  User,
  X,
} from "lucide-react";
import moment from "moment";
import { motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const FeedNavigation = () => {
  const path = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="fixed top-0 left-0 w-full bg-background/90 backdrop-blur-md z-50 shadow-md">
      <div className="wrapper py-2 px-4 flex items-center justify-center gap-2 ">
        {/* Logo and Search */}
        <div className="flex items-center gap-4">
          <Link href={"/feed"}>
            <motion.img
              initial={{ rotate: "180deg", filter: "blur(5px)", opacity: 0 }}
              animate={{
                rotate: 0,
                filter: "blur(0px)",
                opacity: 1,
                transition: { ease: [0.25, 1, 0.5, 1], duration: 2 },
              }}
              className="size-12 md:size-16 rounded-full mix-blend-multiply"
              src="/brand/logos/logo.jpeg"
              alt="Logo"
            />
          </Link>
          <div className="hidden md:block">
            <SearchComp />
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-4">
          {FeedNavigationItems.map((item, i) => (
            <Link
              key={i}
              href={item.href}
              className={buttonVariants({
                variant: "link",
                size: "icon",
                className: cn(
                  "opacity-75 hover:opacity-100 transition-all",
                  path === item.href && "bg-primary/25 text-background"
                ),
              })}
            >
              {item.icon}
            </Link>
          ))}
          <CreatePost />
          <Messages />
          <Notification />
          <ProfileButton />
        </div>

        <CreatePost />
        <Messages />
        <Notification />
        <ProfileButton />
        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-background/95 shadow-md p-4 flex flex-col gap-4">
          {FeedNavigationItems.map((item, i) => (
            <Link
              key={i}
              href={item.href}
              className="flex items-center gap-2 p-2 rounded-md hover:bg-primary/20"
              onClick={() => setMenuOpen(false)}
            >
              {item.icon} <span>{item.title}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

const SearchComp = () => {
  return (
    <>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
          <Search size={14} />
        </div>
        <input
          type="text"
          id="input-group-1"
          className="bg-gray-50 border rounded-full border-gray-300 text-gray-900 text-sm focus-visible:outline-none focus:ring-primary/25 focus:border-primary/25 block w-full ps-10 p-2.5  "
          placeholder="Search ..."
        />
      </div>
    </>
  );
};

const CreatePost = () => {
  return (
    <div>
      <Button
        className=" opacity-75 hover:opacity-100"
        variant={"link"}
        size={"icon"}
      >
        <PlusCircle size={14} />
      </Button>
    </div>
  );
};

const Notification = () => {
  return (
    <div>
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              className=" opacity-75 hover:opacity-100"
              variant={"link"}
              size={"icon"}
            >
              <div className=" relative">
                <div className=" size-2 bg-red-500  absolute top-0 right-0 rounded-full" />
                <Bell size={14} />
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className=" min-w-72 w-full">
            <div className=" space-y-0.5">
              <div className="flex items-center justify-between">
                <div className=" px-2 py-2 flex items-center gap-2">
                  <div>
                    <Bell size={15} />
                  </div>
                  <div className=" font-semibold">Notifications</div>
                </div>

                <div className=" text-xs select-none  px-2.5 py-1 bg-accent text-background rounded-full opacity-75 mr-2">
                  +3 Notifications
                </div>
              </div>
              {notifications.map((item, i) => (
                <div
                  className={cn(
                    " w-full relative p-2.5 border rounded-md opacity-90 cursor-pointer hover:opacity-100 transition-all",
                    item.type == "success"
                      ? "bg-green-600/10 border-green-600/25"
                      : item.type == "error"
                      ? "bg-red-600/10 border-red-600/25"
                      : item.type == "info"
                      ? "bg-gray-300/10 border-gray-300/25"
                      : item.type == "warning"
                      ? "bg-yellow-600/10 border-yellow-600/25"
                      : null
                  )}
                  key={i}
                >
                  {item.read ? (
                    <>
                      <div
                        className={cn(
                          "absolute top-3 right-3 size-5 rounded-full flex items-center justify-center text-xs ",
                          item.type == "success"
                            ? "bg-green-600/50 "
                            : item.type == "error"
                            ? "bg-red-600/50 "
                            : item.type == "info"
                            ? "bg-gray-300/50 "
                            : item.type == "warning"
                            ? "bg-yellow-600/50 "
                            : null
                        )}
                      >
                        !
                      </div>
                    </>
                  ) : null}
                  <div className="text-sm opacity-75 flex items-center gap-2 ">
                    <div>
                      {item.type == "success" ? (
                        <Check size={14} />
                      ) : item.type == "error" ? (
                        <TriangleAlert size={14} />
                      ) : item.type == "info" ? (
                        <Info size={14} />
                      ) : item.type == "warning" ? (
                        <MailWarning size={14} />
                      ) : null}
                    </div>
                    <div>{item.title}</div>
                  </div>
                  <div className=" text-xs mt-1.5">{item.message}</div>
                  <div className=" text-xs opacity-75 flex items-center gap-2 mt-2">
                    <div>
                      <Clock size={10} />
                    </div>
                    <div>
                      {" "}
                      {moment(item.createdAt).format("MMM Do 20YY")} •{" "}
                      {item.read ? "Checked ✓" : "Unread"}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

const Messages = () => {
  return (
    <div>
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              className=" opacity-75 hover:opacity-100"
              variant={"link"}
              size={"icon"}
            >
              <div className="relative">
                <div className=" size-2 bg-red-500  absolute top-0 right-0 rounded-full" />
                <MessageCircleDashed size={14} />
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className=" max-w-72 w-full">
            <div
              className=" w-full
            "
            >
              <div className="flex items-center justify-between">
                <div className=" px-2 py-2 flex items-center gap-2">
                  <div>
                    <MessageCircleDashed size={15} />
                  </div>
                  <div className=" font-semibold">Messages</div>
                </div>

                <div className=" text-xs select-none  px-2.5 py-1 bg-accent text-background rounded-full opacity-75 mr-2">
                  +3 Messages
                </div>
              </div>

              <div className="p-2">
                <div className=" text-sm font-semibold opacity-75">
                  Send Message
                </div>
                <div>
                  <div>
                    <Input
                      placeholder="Email"
                      type="text"
                      className=" mt-1 text-xs"
                    />
                  </div>
                  <div>
                    <Textarea placeholder="Message" className=" mt-1 text-xs" />
                  </div>
                  <div className=" mt-1 flex justify-end ">
                    <Button
                      size={"sm"}
                      className=" py-0 h-6 shadow-none"
                      variant={"outline"}
                    >
                      <div className="flex items-center gap-2">
                        <div> Send</div>
                        <div>
                          <ArrowRight size={10} />
                        </div>
                      </div>
                    </Button>
                  </div>
                </div>
              </div>

              <div className=" my-1.5 h-px w-1/2 mx-auto bg-foreground/25" />

              {messages.map((item, i) => (
                <DropdownMenuSub key={i}>
                  <DropdownMenuSubTrigger>
                    <div className="p-2 hover:bg-accent/10 transition-all rounded-lg cursor-pointer">
                      <div className="flex items-start relative">
                        <div className=" size-12 relative aspect-square">
                          {item.read ? null : (
                            <div className=" size-3.5 bg-accent rounded-full absolute -top-1.5 -right-1.5" />
                          )}
                          <img
                            src={item.senderPfp}
                            className={cn(
                              " size-12 rounded-lg object-cover",
                              item.read
                                ? "ring-gray-400 ring-2"
                                : "ring-accent ring-2"
                            )}
                          />
                        </div>

                        <div className="px-3">
                          <div className="text-sm flex items-center justify-between">
                            <div>{item.senderName}</div>
                            <div className=" text-xs opacity-75 italic">
                              {moment().diff(moment(item.timestamp), "hours") *
                                -1}
                            </div>
                          </div>
                          <div className="text-xs opacity-50 mt-0.5 line-clamp-2">
                            {item.content}
                          </div>
                        </div>
                      </div>
                    </div>
                  </DropdownMenuSubTrigger>

                  <DropdownMenuSubContent>
                    <div className=" text-sm font-semibold opacity-75">
                      {item.senderName}
                    </div>
                    <div className=" mt-1">{item.content}</div>
                    <div className=" mt-2 flex items-center justify-start opacity-75">
                      {moment(item.timestamp).format("MMM Do YY")} •{" "}
                      {item.read ? "Checked ✓" : "Unread"}
                    </div>
                    <div className=" mt-2">
                      <Button size={"sm"} variant={"destructive"}>
                        <div className="flex items-center gap-2">
                          <div>
                            <Trash size={12} />
                          </div>
                          <div>Delete</div>
                        </div>
                      </Button>
                    </div>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
              ))}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

const ProfileButton = () => {
  return (
    <div className="ml-2">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <img
            className=" size-6 ring-2 ring-accent object-cover  rounded-full shadow-sm"
            src="https://hxcqxvdpfctfywkxocdr.supabase.co/storage/v1/object/public/MyPics/myself/photo_2025-03-02_23-42-20.jpg"
            alt=""
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent className=" mt-2  border border-accent/25">
          <div>
            <Link href={"/feed/profile"}>
              <div className=" py-1 px-2 text-xs flex items-center gap-3 opacity-75 hover:opacity-100 transition-all">
                <div>
                  <User size={16} />
                </div>
                <div className="">Profile</div>
              </div>
            </Link>

            <Link href={"/"}>
              <div className=" py-2 px-2 text-xs flex items-center gap-3 opacity-75 hover:opacity-100 transition-all">
                <div>
                  <LogOut size={16} />
                </div>
                <div className="">Log Out</div>
              </div>
            </Link>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default FeedNavigation;
