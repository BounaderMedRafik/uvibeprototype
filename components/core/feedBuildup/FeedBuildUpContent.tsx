"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { favoriteBrands, favoriteColors, wardrobe } from "@/frontdata";
import { BrandExample, ColorExample } from "@/fronttypes";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight, Plus, Upload, X } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";

const FeedBuildUpContent = () => {
  const [step, setStep] = useState(0);
  return (
    <div className=" flex items-center justify-center flex-col h-svh w-full relative ">
      <img
        src="/background/image.png"
        className="  absolute top-0 left-0 w-full  h-full z-10"
      />
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
        className=" relative  z-20 max-w-md p-5 bg-slate-50 dark:bg-slate-950 w-full shadow-lg rounded-2xl border border-border/10  flex-col flex items-center justify-center"
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
          src="/brand/logos/logo.jpeg"
          alt=""
        />
        <motion.div
          initial={{
            y: 20,
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
              delay: 0.3,
            },
          }}
          className=" text-2xl font-Poppins"
        >
          Let&apos;s Build Your Feed
        </motion.div>

        <div className=" mt-5 w-full">
          <Section number={step} />
        </div>

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
          {step == 2 ? (
            <>
              <Link
                href={"/feed"}
                onClick={() => {
                  console.log("yaaayyy");
                }}
                className={buttonVariants({
                  variant: "default",
                  size: "sm",
                })}
              >
                <div className="flex items-center gap-2">
                  <div>Submit</div>
                  <div>
                    <ArrowRight size={10} />
                  </div>
                </div>
              </Link>
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
      </motion.div>
    </div>
  );
};

const Section = ({ number }: { number: number }) => {
  const [selectedColors, setSelectedColors] = useState<ColorExample[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<BrandExample[]>([]);

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

  return (
    <div className="w-full">
      {number === 0 ? (
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
      ) : number === 1 ? (
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
                    transition: { ease: [0.25, 1, 0.5, 1], duration: 0.3 },
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
                      initial={{ y: 30, opacity: 0, filter: "blur(10px)" }}
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
      ) : number === 2 ? (
        <>
          <div className="w-full">
            <div className="font-Poppins text-xl font-semibold w-full">
              Upload Wardrobe
            </div>
            <div className="font-Poppins mt-1 max-w-xs w-full text-xs opacity-75 text-start">
              Upload your wardrobe to get personalized recommendations
            </div>

            <div>
              <div className=" mt-3 flex flex-wrap gap-2 w-full ">
                {wardrobe.map((item, i) => (
                  <div key={i} className="relative">
                    <Tooltip>
                      <TooltipTrigger>
                        <div className="text-xs font-Poppins px-3 cursor-pointer hover:bg-foreground/10 transition-all py-1 border border-foreground/25 rounded-full flex items-center gap-1 w-full whitespace-nowrap">
                          <div>
                            {" "}
                            <span className=" font-semibold opacity-75">
                              {item.brand}
                            </span>{" "}
                            - <span>{item.name}</span>
                          </div>
                          <div
                            style={{
                              backgroundColor: item.color,
                            }}
                            className=" size-4 rounded-full border border-foreground/25"
                          ></div>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent className=" shadow-lg ">
                        <img
                          className=" size-24 object-cover rounded-xl"
                          src={item.image}
                          alt=""
                        />
                      </TooltipContent>
                    </Tooltip>
                  </div>
                ))}

                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      size={"sm"}
                      variant={"outline"}
                      className=" rounded-full"
                    >
                      <div className="flex gap-2 items-center">
                        <div>
                          <Plus size={13} />
                        </div>
                        <div>Add Cloth</div>
                      </div>
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Adding a new cloth</DialogTitle>
                    </DialogHeader>

                    <div>
                      <div>
                        <div className="flex items-center justify-center w-full ">
                          <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-accent/50 border-dashed rounded-lg cursor-pointer bg-accent/10 ">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <Upload size={30} className=" mb-3 opacity-75" />
                              <p className="mb-2 text-sm text-foreground/75">
                                <span className="font-semibold">
                                  Click to upload
                                </span>{" "}
                                or drag and drop
                              </p>
                              <p className="text-xs text-foreground/75">
                                SVG, PNG, JPG (MAX. 800x400px)
                              </p>
                            </div>
                            <input
                              id="dropzone-file"
                              type="file"
                              className="hidden"
                            />
                          </label>
                        </div>
                      </div>

                      <div className=" mt-3 space-y-1">
                        <Input placeholder="Name of Cloth" type="text" />
                        <Input placeholder="Brand of Cloth" type="text" />
                      </div>

                      <div className="flex mt-2 items-center justify-end gap-0.5">
                        <DialogClose asChild>
                          <Button
                            size={"sm"}
                            variant={"secondary"}
                            className=""
                          >
                            Cancel
                          </Button>
                        </DialogClose>
                        <Button size={"sm"} className="">
                          <div className="flex items-center gap-2">
                            <div>Add</div>
                            <div>
                              <Plus size={13} />
                            </div>
                          </div>
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default FeedBuildUpContent;
