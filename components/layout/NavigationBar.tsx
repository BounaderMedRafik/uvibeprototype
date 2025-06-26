"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { buttonIconSize, navItems } from "@/data/data";
import { cn } from "@/lib/utils";
import { SignOutButton, useUser } from "@clerk/nextjs";
import {
  CheckCircle2,
  Crown,
  Loader,
  LogOut,
  Moon,
  Search,
  Sun,
  User,
} from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

const NavigationBar = () => {
  const pathname = usePathname();
  return (
    <>
      <div className="hidden md:flex w-full fixed z-50 top-0 left-0  pt-3   justify-center  items-center">
        <div className="  w-full ">
          <div className=" px-3 shadow-md border border-foreground/10 bg-background rounded-xl py-2.5 flex items-center justify-between max-w-2xl mx-auto ">
            <div className="flex items-center gap-2">
              <Link href={"/"} className="flex items-center gap-2">
                <img
                  className=" size-7 scale-150 opacity-75 hover:opacity-100 transition-all"
                  src={"/brand/logo.png"}
                  alt=""
                />
                {/* <div className=" font-siradj">UVIBE</div> */}
              </Link>
              <SearchComponent />
            </div>
            <div className="flex items-center gap-1 ">
              {navItems.map((item, i) => (
                <div key={i}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link href={item.link}>
                        <div
                          className={cn(
                            " opacity-50 p-1 rounded-sm hover:opacity-100 transition-all",
                            item.link == pathname
                              ? "opacity-100 bg-foreground/5 border border-foreground/5"
                              : ""
                          )}
                        >
                          {item.icon}
                        </div>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>{item.text}</TooltipContent>
                  </Tooltip>
                </div>
              ))}

              <div className=" ml-1  -mb-1.5">
                <Profile />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Mobile Nav */}
      <div className="md:hidden w-full fixed z-50 bottom-0 left-0 pb-2 px-3">
        <div className="bg-background shadow-lg rounded-xl border border-foreground/10 px-4 py-2 flex justify-between items-center max-w-md mx-auto">
          {navItems.map((item, i) => (
            <Link
              key={i}
              href={item.link}
              className="flex flex-col items-center text-xs"
            >
              <div
                className={cn(
                  " pt-2 rounded-full transition-all ",
                  item.link === pathname
                    ? "bg-foreground/5 text-foreground"
                    : "text-foreground/50"
                )}
              >
                {item.icon}
              </div>
              <span
                className={cn(
                  "text-[14px] mt-1",
                  item.link === pathname
                    ? "text-foreground"
                    : "text-foreground/40"
                )}
              >
                {item.text}
              </span>
            </Link>
          ))}
        </div>

        {/* Floating Profile Icon */}
        <div className="absolute -top-5 left-1/2 transform -translate-x-1/2">
          <div className=" rounded-full p-1 shadow-lg ">
            <Profile />
          </div>
        </div>
      </div>

      <div className="md:hidden w-full fixed flex items-center justify-center z-50 top-0 left-0 pt-2">
        <div className="relative z-20 flex items-center justify-center">
          <img className="  size-14" src="/brand/logo.png" alt="" />
          <SearchComponent />
        </div>
        <div className=" w-full h-full absolute bg-gradient-to-b from-background to-transparent top-0 left-0 " />
      </div>
    </>
  );
};

const SearchComponent = () => {
  return (
    <Link href={"/search"}>
      <div className=" flex bg-background  cursor-pointer hover:bg-foreground/5 transition-all items-center gap-0.5 px-2 py-1 border   border-foreground/10 rounded-full">
        <div>
          <Search size={12} />
        </div>
        <div className=" text-xs opacity-75">Search</div>
      </div>
    </Link>
  );
};

const Profile = () => {
  const { user, isLoaded } = useUser();
  const { setTheme } = useTheme();
  const pathname = usePathname();
  const role = user?.unsafeMetadata.role;

  if (!isLoaded) {
    return (
      <div>
        <Loader
          className="animate-spin text-foreground"
          size={buttonIconSize - 4}
        />
      </div>
    );
  }

  return (
    <div key={user?.id}>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <img
            className={cn(
              "md:size-6 size-10  cursor-pointer border border-accent hover:border-primary/60 transition-all rounded-full",
              pathname === "/profile" ? "border-primary" : ""
            )}
            src={user?.imageUrl || "/default-avatar.png"} // Fallback image to avoid empty src
            alt="User Avatar"
          />
        </DropdownMenuTrigger>

        <DropdownMenuContent className="md:mt-0.5">
          <Link className="cursor-pointer" href="/profile">
            <DropdownMenuItem>
              Profile
              <DropdownMenuShortcut>
                <User size={buttonIconSize} />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>

          {role == "pro" && (
            <Dialog>
              <DialogTrigger asChild>
                <div
                  className="focus:bg-accent hover:bg-accent justify-between focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
                  onClick={(e) => e.stopPropagation()}
                >
                  Upgrade PRO
                  <Crown size={buttonIconSize} className="mr-2" />
                </div>
              </DialogTrigger>

              <DialogContent className="sm:max-w-xs">
                <DialogHeader className="mb-6">
                  <DialogTitle className="text-lg flex items-center gap-2">
                    <Crown size={18} className="text-yellow-500" />
                    Upgrade to PRO —{" "}
                    <span className="font-bold ml-1">2000 DZD</span>
                  </DialogTitle>
                </DialogHeader>

                <div className="space-y-4 text-sm text-muted-foreground">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-green-500 mt-0.5" />
                    Guarantee top placement in searches and feed visibility.
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-green-500 mt-0.5" />
                    Customizable shop layout and professional profile.
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-green-500 mt-0.5" />
                    Reduce shop transaction fees by <b>20%</b>.
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-green-500 mt-0.5" />
                    Priority support and faster response times.
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 size={16} className="text-green-500 mt-0.5" />
                    Access to exclusive shop analytics and insights.
                  </div>
                </div>

                <DialogFooter className="mt-4">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="default" className="w-full">
                        Upgrade Now —{" "}
                        <span className="line-through mr-1">2000</span>{" "}
                        <b>1300 DZD</b>
                      </Button>
                    </DialogTrigger>

                    <DialogContent className="sm:max-w-sm">
                      <DialogHeader>
                        <DialogTitle className="text-base">
                          Payment Details
                        </DialogTitle>
                        <p className="text-xs text-muted-foreground">
                          Complete your upgrade with a one-time payment.
                        </p>
                      </DialogHeader>

                      <div className="space-y-3 mt-4">
                        <div>
                          <label htmlFor="ccp" className="text-xs block mb-1">
                            CCP Number
                          </label>
                          <input
                            id="ccp"
                            type="text"
                            placeholder="eg. 00123456789"
                            className="w-full px-3 py-2 text-sm rounded-md border border-foreground/20 bg-background"
                          />
                        </div>
                        <div>
                          <label htmlFor="name" className="text-xs block mb-1">
                            CCP Name
                          </label>
                          <input
                            id="name"
                            type="text"
                            placeholder="Account holder name"
                            className="w-full px-3 py-2 text-sm rounded-md border border-foreground/20 bg-background"
                          />
                        </div>
                        <div className="text-xs text-muted-foreground">
                          You are eligible for a <b>35% discount</b> on your
                          first upgrade.
                        </div>
                      </div>

                      <DialogFooter className="mt-4">
                        <Button className="w-full">
                          Confirm & Pay 1300 DZD
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}

          <DropdownMenuItem
            className="hidden dark:flex"
            onClick={() => setTheme("light")}
          >
            Light Mode
            <DropdownMenuShortcut>
              <Sun size={buttonIconSize} />
            </DropdownMenuShortcut>
          </DropdownMenuItem>

          <DropdownMenuItem
            className="dark:hidden"
            onClick={() => setTheme("dark")}
          >
            Dark Mode
            <DropdownMenuShortcut>
              <Moon size={buttonIconSize} />
            </DropdownMenuShortcut>
          </DropdownMenuItem>

          <SignOutButton>
            <DropdownMenuItem>
              Log out
              <DropdownMenuShortcut>
                <LogOut size={buttonIconSize} />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </SignOutButton>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
export default NavigationBar;
