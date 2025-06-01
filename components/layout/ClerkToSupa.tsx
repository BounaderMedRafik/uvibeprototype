"use client";
import supabase from "@/app/supabase/supaClient";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  BodyTypes,
  favoriteBrands,
  favoriteColors,
  headTypes,
  skinTones,
} from "@/data/data";
import { BrandExample, ColorExample } from "@/data/type";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import { ArrowLeft, ArrowRight, ChevronDown, Triangle, X } from "lucide-react";
import { motion } from "motion/react";
import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ScrollArea } from "../ui/scroll-area";

const ClerkToSupa = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoaded } = useUser();
  const [bio, setBio] = useState("");
  const [step, setStep] = useState(0);
  const [gender, setGender] = useState("");
  const [wieght, setWieght] = useState("");
  const [hieght, setHieght] = useState("");
  const [faceType, setFaceType] = useState("");
  const [bodyType, setBodyType] = useState("");
  const [RelationStatus, setRelationStatus] = useState("");
  const [work, setWork] = useState("");
  const [skin, setSkin] = useState("");
  const [selectedColors, setSelectedColors] = useState<ColorExample[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<BrandExample[]>([]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleColorClick = (color: ColorExample) => {
    if (selectedColors.some((c) => c.name === color.name)) {
      setSelectedColors(selectedColors.filter((c) => c.name !== color.name));
    } else if (selectedColors.length < 5) {
      setSelectedColors([...selectedColors, color]);
    }
  };

  const handleBrandClick = (brand: BrandExample) => {
    if (selectedBrands.some((b) => b.name === brand.name)) {
      setSelectedBrands(selectedBrands.filter((b) => b.name !== brand.name));
    } else if (selectedBrands.length < 5) {
      setSelectedBrands([...selectedBrands, brand]);
    }
  };

  // Function to determine text color for contrast
  const getTextColor = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
    return brightness > 128 ? "#000000" : "#FFFFFF";
  };

  useEffect(() => {
    const checkUserExists = async () => {
      if (!isLoaded || !user) return;

      // Fetch the user from Supabase
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("userid", user.id)
        .single();

      if (error) {
        setIsDialogOpen(true);
        return;
      }

      if (!data) {
        setIsDialogOpen(true);
      }
    };

    checkUserExists();
  }, [isLoaded, user]);

  const handleSubmit = async () => {
    const { error } = await supabase.from("users").insert({
      userid: user?.id,
      created_at: user?.createdAt,
      name: user?.fullName,
      username: user?.username,
      pfp: user?.imageUrl,
      bio,
      banner:
        "https://www.fairtrade.org.uk/wp-content/uploads/2024/03/buying-flowers-banner-1200x600.jpg",
      gender: gender,
      weight: wieght,
      height: hieght,
      headShape: faceType,
      bodyShape: bodyType,
      relation: RelationStatus,
      work: work,
      skintone: skin,
      favColors: selectedColors,
      favBrands: selectedBrands,
    });

    if (error) {
      console.log("Error saving bio:", error);
    } else {
      console.log("Bio saved successfully", user?.firstName);
      setIsDialogOpen(false);
    }
  };

  return (
    <>
      <Dialog open={isDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Welcome to UVIBE!</DialogTitle>
          </DialogHeader>

          <motion.div
            initial={{
              y: 40,
              opacity: 0,
              filter: "blur(10px)",
            }}
            animate={{
              y: 0,
              opacity: 1,
              filter: "blur(0px)",
              transition: {
                ease: [0.25, 1, 0.5, 1],
                duration: 1,
              },
            }}
            className=" relative  z-20   w-full  md:rounded-2xl border border-border/10  "
          >
            <motion.img
              initial={{
                rotate: "180deg",
                y: 20,
              }}
              animate={{
                rotate: 0,
                y: 0,
                transition: {
                  ease: [0.25, 1, 0.5, 1],
                  duration: 2,
                },
              }}
              className=" size-32 rounded-full  mix-blend-multiply"
              src="/brand/logo.png"
              alt=""
            />
            {step == 0 ? (
              <>
                <div className="font-Poppins text-xl font-semibold w-full">
                  Basic Information
                </div>
                <div className="font-Poppins mt-1 max-w-xs w-full text-xs opacity-75 text-start">
                  Tell us about yourself to get better style recommendations and
                  personalized shopping suggestions.
                </div>

                <div className=" mt-4">
                  <div>
                    <div className=" font-Poppins text-sm opacity-75">
                      <div className="flex items-center gap-2">
                        <div>
                          <Triangle className=" fill-foreground" size={12} />
                        </div>
                        <div className=" mt-1">Gender</div>
                      </div>
                    </div>

                    <div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" className=" w-full">
                            <div className="flex items-center gap-3">
                              <div className=" text-sm opacity-75">
                                {gender ? gender : "Select Gender"}
                              </div>
                              <div>
                                <ChevronDown size={11} />
                              </div>
                            </div>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="  w-96">
                          <DropdownMenuRadioGroup
                            value={gender}
                            onValueChange={setGender}
                          >
                            <DropdownMenuRadioItem disabled value="Male">
                              <div className="flex items-center gap-2">
                                <div>
                                  {gender == "Male" ? (
                                    <Triangle
                                      className=" fill-foreground"
                                      size={10}
                                    />
                                  ) : null}
                                </div>
                                <div>Male (coming soon)</div>
                              </div>
                            </DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="Female">
                              <div className="flex items-center gap-2">
                                <div>
                                  {gender == "Female" ? (
                                    <Triangle
                                      className=" fill-foreground"
                                      size={10}
                                    />
                                  ) : null}
                                </div>
                                <div>Female</div>
                              </div>
                            </DropdownMenuRadioItem>
                          </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>

                <div className=" mt-2 flex items-center gap-3">
                  <div>
                    <div className=" font-Poppins text-sm opacity-75">
                      <div className="flex items-center gap-2">
                        <div>
                          <Triangle className=" fill-foreground" size={12} />
                        </div>
                        <div className=" mt-1">Weight (kg)</div>
                      </div>
                    </div>

                    <div className=" mt-1">
                      <Input
                        type="number"
                        placeholder="52kg"
                        min={0}
                        value={wieght}
                        onChange={(e) => setWieght(e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <div className=" font-Poppins text-sm opacity-75">
                      <div className="flex items-center gap-2">
                        <div>
                          <Triangle className=" fill-foreground" size={12} />
                        </div>
                        <div className=" mt-1">Height (cm)</div>
                      </div>
                    </div>

                    <div className=" mt-1">
                      <Input
                        type="number"
                        placeholder="175cm"
                        min={0}
                        value={hieght}
                        onChange={(e) => setHieght(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </>
            ) : step == 1 ? (
              <>
                <div className="font-Poppins text-xl font-semibold w-full">
                  Head Shape
                </div>
                <div className="font-Poppins mt-1 max-w-xs w-full text-xs opacity-75 text-start">
                  Select your head shape to discover the most flattering
                  hairstyles, hats, and eyewear that complement your features.
                </div>

                <div className=" grid grid-cols-3 gap-3  mt-4 ">
                  {headTypes.map((item, i) => (
                    <div
                      onClick={() => {
                        setFaceType(item.head);
                      }}
                      key={i}
                      className={cn(
                        " border hover:opacity-75  transition-all ease-in-out  duration-300 cursor-pointer border-foreground/10 relative aspect-square overflow-hidden rounded-lg",
                        faceType == item.head && "border-primary/75"
                      )}
                    >
                      <img
                        className="w-full h-full absolute top-0 left-0 z-10"
                        src={item.headPic}
                        alt={item.head}
                      />
                      <div
                        className={cn(
                          " absolute top-0 left-0 w-full h-full z-20 bg-accent opacity-0 transition-all  duration-300 ease-in-out",
                          faceType == item.head && "opacity-25"
                        )}
                      />

                      <div className=" absolute bottom-2 z-20 text-xs left-1/2 -translate-x-1/2 bg-accent text-background font-Poppins px-3 py-0.5 rounded-md">
                        {item.head}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : step == 2 ? (
              <>
                <div className="font-Poppins text-xl font-semibold w-full">
                  Body Shape
                </div>
                <div className="font-Poppins mt-1 max-w-xs w-full text-xs opacity-75 text-start">
                  Identify your body type to receive personalized clothing
                  recommendations that flatter your natural proportions and
                  highlight your best features.
                </div>
                <div>
                  <div className=" grid grid-cols-2 gap-3  mt-4 ">
                    {BodyTypes.map((item, i) => (
                      <div
                        onClick={() => {
                          setBodyType(item.body);
                        }}
                        key={i}
                        className={cn(
                          " border hover:opacity-75  transition-all ease-in-out  duration-300 cursor-pointer border-foreground/10 relative aspect-square overflow-hidden rounded-lg",
                          bodyType == item.body && "border-primary/75"
                        )}
                      >
                        <img
                          className="w-full h-full absolute top-0 left-0 z-10"
                          src={item.bodyPic}
                          alt={item.body}
                        />
                        <div
                          className={cn(
                            " absolute top-0 left-0 w-full h-full z-20 bg-accent opacity-0 transition-all  duration-300 ease-in-out",
                            bodyType == item.body && "opacity-25"
                          )}
                        />

                        <div className=" absolute bottom-2 z-20 text-xs left-1/2 -translate-x-1/2 bg-accent text-background text-center font-Poppins px-3 py-0.5 rounded-md">
                          {item.body}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : step == 3 ? (
              <>
                <div className="font-Poppins text-xl font-semibold w-full">
                  Your Style Profile
                </div>
                <div className="font-Poppins mt-1 max-w-xs w-full text-xs opacity-75 text-start">
                  These questions help us understand your unique fashion
                  personality and preferences for more accurate recommendations.
                </div>

                <div className=" mt-3">
                  <div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className=" w-full">
                          <div className="flex items-center gap-3">
                            <div className=" text-sm opacity-75">
                              {RelationStatus
                                ? RelationStatus
                                : "Select Relationship Status"}
                            </div>
                            <div>
                              <ChevronDown size={11} />
                            </div>
                          </div>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="  w-96">
                        <DropdownMenuRadioGroup
                          value={RelationStatus}
                          onValueChange={setRelationStatus}
                        >
                          <DropdownMenuRadioItem value="Single">
                            <div className="flex items-center gap-2">
                              <div>
                                {RelationStatus == "Single" ? (
                                  <Triangle
                                    className=" fill-foreground"
                                    size={10}
                                  />
                                ) : null}
                              </div>
                              <div>Single</div>
                            </div>
                          </DropdownMenuRadioItem>
                          <DropdownMenuRadioItem value="Married">
                            <div className="flex items-center gap-2">
                              <div>
                                {RelationStatus == "Married" ? (
                                  <Triangle
                                    className=" fill-foreground"
                                    size={10}
                                  />
                                ) : null}
                              </div>
                              <div>Married</div>
                            </div>
                          </DropdownMenuRadioItem>
                          <DropdownMenuRadioItem value="Divorced">
                            <div className="flex items-center gap-2">
                              <div>
                                {RelationStatus == "Divorced" ? (
                                  <Triangle
                                    className=" fill-foreground"
                                    size={10}
                                  />
                                ) : null}
                              </div>
                              <div>Divorced</div>
                            </div>
                          </DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  <div className=" mt-2">
                    <div className=" font-Poppins text-sm opacity-75">
                      <div className="flex items-center gap-2">
                        <div>
                          <Triangle className=" fill-foreground" size={12} />
                        </div>
                        <div className=" mt-1">What do you do for work?</div>
                      </div>
                    </div>

                    <div className=" mt-1">
                      <Input
                        type="text"
                        placeholder="A Doctor"
                        min={0}
                        value={work}
                        onChange={(e) => setWork(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </>
            ) : step == 4 ? (
              <>
                <div className="font-Poppins text-xl font-semibold w-full">
                  Skin Tone
                </div>
                <div className="font-Poppins mt-1 max-w-xs w-full text-xs opacity-75 text-start">
                  Select your skin tone to receive personalized color
                  recommendations that complement your natural complexion
                  beautifully.
                </div>

                <div className=" grid-cols-4 grid w-full mt-4">
                  <div></div>
                  <div className=" text-sm opacity-75 font-Poppins px-3 bg-foreground/10 m-1 rounded-sm pt-1">
                    Cool
                  </div>
                  <div className=" text-sm opacity-75 font-Poppins px-3 bg-foreground/10 m-1 rounded-sm pt-1">
                    Warm
                  </div>
                  <div className=" text-sm opacity-75 font-Poppins px-3 bg-foreground/10 m-1 rounded-b-none rounded-sm pt-1">
                    Neutral
                  </div>
                </div>
                <div>
                  <div>
                    {skinTones.map((item, i) => (
                      <div className=" grid grid-cols-4 w-full mt-1" key={i}>
                        <div className=" text-sm opacity-75 font-Poppins">
                          {item.skinTone}
                        </div>
                        {item.skinToneColors.map((SubItem, j) => (
                          <div
                            onClick={() => {
                              setSkin(SubItem);
                            }}
                            style={{
                              backgroundColor: SubItem,
                            }}
                            className={cn(
                              ` w-full transition-all cursor-pointer `,
                              skin == SubItem
                                ? " border-4 border-accent transition-all "
                                : null
                            )}
                            key={j}
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : step == 5 ? (
              <>
                <div className="font-Poppins text-xl font-semibold w-full">
                  Thank you for your time!
                </div>
                <div className="font-Poppins mt-1 max-w-xs w-full text-xs opacity-75 text-start">
                  We&apos;re now creating your personalized style profile.
                  You&apos;ll receive your first recommendations shortly!
                </div>

                <div className=" mt-3">
                  <div className=" text-sm font-Poppins">
                    <span>
                      <span className="font-semibold">• Gender</span> :{" "}
                      {gender || "Please fill out"}
                    </span>
                  </div>
                  <div className=" text-sm font-Poppins">
                    <span>
                      <span className="font-semibold">• Height</span> :{" "}
                      {hieght || "Please fill out"}
                      {!hieght || "kg"}
                    </span>
                  </div>
                  <div className=" text-sm font-Poppins">
                    <span>
                      <span className="font-semibold">• Weight</span> :{" "}
                      {wieght || "Please fill out"}
                      {!wieght || "kg"}
                    </span>
                  </div>
                  <div className=" text-sm font-Poppins">
                    <span>
                      <span className="font-semibold">• Face Type</span> :{" "}
                      {faceType || "Please fill out"}
                    </span>
                  </div>
                  <div className=" text-sm font-Poppins">
                    <span>
                      <span className="font-semibold">• Body Type</span> :{" "}
                      {bodyType || "Please fill out"}
                    </span>
                  </div>
                  <div className=" text-sm font-Poppins">
                    <span>
                      <span className="font-semibold">
                        • Relationship Status
                      </span>{" "}
                      : {RelationStatus || "Please fill out"}
                    </span>
                  </div>
                  <div className=" text-sm font-Poppins">
                    <span>
                      <span className="font-semibold">• Work Nature</span> :{" "}
                      {work || "Please fill out"}
                    </span>
                  </div>
                </div>
              </>
            ) : step == 6 ? (
              <>
                <div className="w-full">
                  <div className="font-Poppins text-xl font-semibold w-full">
                    Favourite Colors
                  </div>
                  <div className="font-Poppins mt-1 max-w-xs w-full text-xs opacity-75 text-start">
                    Select up to 5 colors that best represent your style.
                  </div>
                </div>

                {/* Scrollable color selection */}
                <ScrollArea className="h-64 pt-4">
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    {favoriteColors.map((category) => (
                      <div key={category.name} className="mb-2">
                        <div className="font-Poppins text-sm font-medium mb-2">
                          {category.name}
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {category.examples.map((color) => (
                            <button
                              key={color.name}
                              className={`px-3 py-1 text-xs rounded-full border transition-all duration-300
                            ${
                              selectedColors.some((c) => c.name === color.name)
                                ? "border-foreground/50 shadow-md"
                                : "border-gray-300"
                            }`}
                              style={{
                                backgroundColor: color.hex,
                                color: getTextColor(color.hex),
                              }}
                              onClick={() => handleColorClick(color)}
                            >
                              {color.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>

                {/* Selected Colors as Color Balls */}
                <motion.div className="mt-4">
                  {selectedColors.length > 0 && (
                    <motion.div
                      key={selectedColors.length > 0 ? "open" : "close"}
                      initial={{
                        y: 30,
                        opacity: 0,
                        filter: `blur(10px)`,
                      }}
                      animate={{
                        y: 0,
                        opacity: 1,
                        filter: "blur(0)",
                        transition: {
                          ease: [0.25, 1, 0.5, 1],
                          duration: 0.3,
                        },
                      }}
                      exit={{
                        y: 30,
                        opacity: 0,
                        filter: `blur(10px)`,
                      }}
                      className="text-sm font-medium flex items-center gap-2"
                    >
                      <span>Selected Colors:</span>
                      <div className="flex items-center gap-2">
                        {selectedColors.map((color) => (
                          <div
                            key={color.name}
                            className="w-6 h-6 rounded-full border border-foreground/50"
                            style={{ backgroundColor: color.hex }}
                          ></div>
                        ))}
                        <motion.div
                          initial={{
                            y: 30,
                            opacity: 0,
                            filter: `blur(10px)`,
                          }}
                          animate={{
                            y: 0,
                            opacity: 1,
                            filter: "blur(0)",
                            transition: {
                              ease: [0.25, 1, 0.5, 1],
                              duration: 0.3,
                              delay: 0.2,
                            },
                          }}
                          onClick={() => {
                            setSelectedColors([]);
                          }}
                          className="flex items-center gap-1 px-2  cursor-pointer py-0.5 rounded-full bg-accent/10 border border-accent/25 font-Poppins text-xs"
                        >
                          <div>clear</div>
                          <div>
                            <X size={10} />
                          </div>
                        </motion.div>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              </>
            ) : step == 7 ? (
              <>
                <div className="w-full">
                  <div className="w-full">
                    <div className="font-Poppins text-xl font-semibold w-full">
                      Favourite Brands
                    </div>
                    <div className="font-Poppins mt-1 max-w-xs w-full text-xs opacity-75 text-start">
                      Select up to 5 brands that best represent your style.
                    </div>
                  </div>

                  {/* Scrollable Brand Selection */}
                  <ScrollArea className="h-64 pt-4">
                    <div className="mt-4 grid grid-cols-2 gap-3">
                      {favoriteBrands.map((category) => (
                        <div key={category.name} className="mb-2">
                          <div className="font-Poppins text-sm font-medium mb-2">
                            {category.name}
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {category.examples.map((brand) => (
                              <button
                                key={brand.name}
                                className={`px-3 py-1 text-xs rounded-full border transition-all duration-300 flex items-center gap-2
                        ${
                          selectedBrands.some((b) => b.name === brand.name)
                            ? "border-black shadow-md"
                            : "border-gray-300"
                        }`}
                                onClick={() => handleBrandClick(brand)}
                              >
                                <img
                                  src={brand.logo}
                                  alt={brand.name}
                                  className="w-5 h-5 object-contain"
                                />
                                {brand.name}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>

                  {/* Selected Brands */}
                  <motion.div className="mt-4">
                    {selectedBrands.length > 0 && (
                      <motion.div
                        key={selectedBrands.length > 0 ? "open" : "close"}
                        initial={{ y: 30, opacity: 0, filter: "blur(10px)" }}
                        animate={{
                          y: 0,
                          opacity: 1,
                          filter: "blur(0)",
                          transition: {
                            ease: [0.25, 1, 0.5, 1],
                            duration: 0.3,
                          },
                        }}
                        exit={{ y: 30, opacity: 0, filter: "blur(10px)" }}
                        className="text-sm font-medium flex items-center gap-2"
                      >
                        <span>Selected Brands:</span>
                        <div className="flex items-center gap-2">
                          {selectedBrands.map((brand) => (
                            <div
                              key={brand.name}
                              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center"
                            >
                              <img
                                src={brand.logo}
                                alt={brand.name}
                                className="w-6 h-6 object-contain"
                              />
                            </div>
                          ))}
                          <motion.div
                            initial={{
                              y: 30,
                              opacity: 0,
                              filter: "blur(10px)",
                            }}
                            animate={{
                              y: 0,
                              opacity: 1,
                              filter: "blur(0)",
                              transition: {
                                ease: [0.25, 1, 0.5, 1],
                                duration: 0.3,
                                delay: 0.2,
                              },
                            }}
                            onClick={() => setSelectedBrands([])}
                            className="flex items-center gap-1 px-2 cursor-pointer py-0.5 rounded-full bg-accent/10 border border-accent/25 font-Poppins text-xs"
                          >
                            <div>clear</div>
                            <X size={10} />
                          </motion.div>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                </div>
              </>
            ) : null}

            <div className=" mt-2 w-full relative">
              <div
                className={cn(
                  " mt-4 flex items-center gap-0.5 w-full justify-between",
                  step == 0 || step < 0 ? " justify-end" : null
                )}
              >
                {step == 0 || step < 0 ? null : (
                  <Button
                    onClick={() => {
                      setStep(step - 1);
                    }}
                    className={buttonVariants({
                      variant: "secondary",
                      size: "sm",
                    })}
                  >
                    <div className="flex items-center gap-2">
                      <div>
                        <ArrowLeft size={10} />
                      </div>
                      <div>Previous</div>
                    </div>
                  </Button>
                )}
                {step == 7 ? (
                  <>
                    <Button onClick={handleSubmit} size={"sm"}>
                      <div className="flex items-center gap-2">
                        <div>Submit</div>
                        <div>
                          <ArrowRight size={10} />
                        </div>
                      </div>
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      onClick={() => {
                        setStep(step + 1);
                      }}
                      size={"sm"}
                    >
                      <div className="flex items-center gap-2">
                        <div>Next</div>
                        <div>
                          <ArrowRight size={10} />
                        </div>
                      </div>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </DialogContent>
      </Dialog>
      {children}
    </>
  );
};

export default ClerkToSupa;
