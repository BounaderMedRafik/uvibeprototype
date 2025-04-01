"use client";
import supabase from "@/app/supabase/supaClient";
import {
  clothingBrands,
  clothingCategories,
  clothingFits,
  clothingGender,
  clothingOccasions,
  clothingPatterns,
  clothingSeasons,
  clothingSizes,
  tailwindColors,
} from "@/data/data";
import useAddClothingPiece from "@/hooks/useAddClothingPiece";
import useFetchClothingPieces from "@/hooks/useFetchClothingPieces";
import useFetchFits from "@/hooks/useFetchFits";
import { useUploadClothingImage } from "@/hooks/useUploadClothingImage";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import { ChevronRight, Loader, Plus, Shirt } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MdOutlineFace } from "react-icons/md";
import { PiPantsDuotone } from "react-icons/pi";
import { TbShoe } from "react-icons/tb";
import Masonry from "react-masonry-css";
import { toast } from "sonner";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Input } from "../ui/input";
import { Switch } from "../ui/switch";
import { TagsInput } from "../ui/TagsInput";
import { Textarea } from "../ui/textarea";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import ClothPieceTemplate from "./ClothPieceTemplate";
import FitTemplate from "./FitTemplate";

const WardrobePageContent = () => {
  const { user } = useUser();
  return (
    <div className=" wrapper">
      <div className="flex items-center justify-between max-w-2xl mx-auto">
        <div>
          <div className=" text-xl  opacity-75">Your Wardrobe</div>
          <div className=" max-w-sm opacity-50 text-xs">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptas,
            ab eos? Facilis, magni voluptate.
          </div>
        </div>
        <div className="flex items-center gap-1">
          <AddPiece />
          <CreateFit />
        </div>
      </div>

      <div className=" mt-10">
        <ClothingPieces clerkID={user?.id} />
      </div>
    </div>
  );
};

const AddPiece = () => {
  const {
    addClothingPiece,
    isLoading: addPieceLoading,
    error: addPieceError,
    success,
  } = useAddClothingPiece();
  const router = useRouter();

  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedFit, setSelectedFit] = useState<string | null>(null);
  const [selectedGender, setSelectedGender] = useState<string | null>(null);
  const [selectedPattern, setSelectedPattern] = useState<string | null>(null);
  const [selectedSeason, setSelectedSeason] = useState<string | null>(null);
  const [selectedOccasion, setSelectedOccasion] = useState<string | null>(null);
  const [forsale, setForsale] = useState<boolean>(false);
  const [price, setPrice] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [description, setDescription] = useState("");
  const [source, setSource] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const { user } = useUser();

  const [brandsearch, setBrandSearch] = useState("");
  const { uploadClothingImage, isLoading, error } = useUploadClothingImage();

  const filteredBrands = clothingBrands.filter((item) =>
    item.toLowerCase().includes(brandsearch.toLowerCase())
  );

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const url = await uploadClothingImage(file);
      setImageUrl(url);
    }
  };

  const handleSubmit = async () => {
    const piece = {
      name,
      senderid: user?.id || undefined,
      brand: brand,
      color: selectedColor,
      size: selectedSize,
      category: selectedCategory,
      fit: selectedFit,
      gender: selectedGender,
      pattern: selectedPattern,
      season: selectedSeason,
      occasion: selectedOccasion,
      forsale,
      price,
      tags,
      description,
      image: imageUrl,
      source: source,
    };

    const response = await addClothingPiece(piece);
    if (success) {
      toast("published succesfully");
    }
    if (response) toast("published succesfully");
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant={"secondary"} size={"sm"}>
            <div className="flex items-center gap-2">
              <div>Add Piece</div>
              <div>
                <Plus size={14} />
              </div>
            </div>
          </Button>
        </DialogTrigger>
        <DialogContent className=" min-w-3xl w-full">
          <DialogHeader>
            <DialogTitle>Add new piece</DialogTitle>
          </DialogHeader>

          <div className=" w-full flex items-start p-2">
            <div className=" w-1/3 h-full flex flex-col justify-between items-center">
              {/* Upload Image */}
              <label htmlFor="file-upload" className="cursor-pointer w-full">
                <div className="group  cursor-pointer bg-accent/50 h-64 w-full rounded-xl border border-foreground/10 flex items-center justify-center">
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt="Uploaded Clothing"
                      className="h-full w-full object-cover rounded-xl"
                    />
                  ) : (
                    <div>
                      {isLoading ? (
                        <div>
                          <Loader size={16} className=" animate-spin" />
                        </div>
                      ) : (
                        <div className="flex items-center justify-center flex-col gap-3">
                          <Shirt
                            size={14}
                            className="translate-y-3 group-hover:translate-y-0 transition-all duration-300 ease-in-out"
                          />
                          <div className="text-xs opacity-0 group-hover:opacity-50 transition-all duration-300 ease-in-out ">
                            {isLoading ? "Uploading..." : "Upload attachment"}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </label>

              {/* Hidden File Input */}
              <input
                id="file-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
                disabled={isLoading}
              />

              {/* Error Message */}
              {error && <p className="text-sm text-red-500 mt-2">{error}</p>}

              <div className=" w-full mt-2 flex items-center gap-0.5 ">
                <DialogClose asChild>
                  <Button variant={"secondary"} size={"sm"} className=" w-1/2">
                    Cancel
                  </Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button
                    onClick={() => {
                      handleSubmit();
                      router.push("/profile/wardrobe");
                    }}
                    disabled={addPieceLoading}
                    size={"sm"}
                    className=" w-1/2"
                  >
                    Publish
                  </Button>
                </DialogClose>
              </div>
            </div>

            <div className=" w-2/3 pl-3">
              <div>
                <Input
                  placeholder="Cloth Name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>

              <div>
                <Textarea
                  placeholder="Cloth Description"
                  value={description}
                  className="mt-1"
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                />
              </div>
              <div className="flex items-center gap-1 w-full mt-1">
                {/* Brand selection */}
                <DropdownMenu>
                  <DropdownMenuTrigger className=" w-1/2" asChild>
                    <Button variant="outline">
                      <div
                        className={cn(!brand ? "opacity-50" : "opacity-100")}
                      >
                        {brand ? brand : " Brand"}
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Brands</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <div className="p-2">
                      <Input
                        type="text"
                        placeholder="Search brands..."
                        value={brandsearch}
                        onChange={(e) => setBrandSearch(e.target.value)}
                      />
                    </div>
                    <DropdownMenuSeparator />
                    {filteredBrands.length > 0 ? (
                      filteredBrands.map((item, i) => (
                        <DropdownMenuCheckboxItem
                          key={i}
                          checked={brand === item}
                          onClick={() => setBrand(item)}
                        >
                          {item}
                        </DropdownMenuCheckboxItem>
                      ))
                    ) : (
                      <div className="p-2 text-center text-xs opacity-50">
                        No results found
                      </div>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Color selection */}
                <DropdownMenu>
                  <DropdownMenuTrigger className="w-1/2" asChild>
                    <Button variant="outline">
                      <div
                        className={cn(
                          !selectedColor ? "opacity-50" : "opacity-100"
                        )}
                      >
                        {selectedColor ? (
                          <div className="flex items-center gap-2">
                            <div>{selectedColor}</div>
                            <div
                              style={{
                                backgroundColor: selectedColor,
                              }}
                              className=" size-4 rounded-sm"
                            />
                          </div>
                        ) : (
                          " Color"
                        )}
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Colors</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <div className="pt-2">
                      <div className="w-full grid grid-cols-10 gap-0.5 p-2 py-0">
                        {tailwindColors.map((color, i) => (
                          <Tooltip key={i}>
                            <TooltipTrigger asChild>
                              <button
                                className={cn(
                                  " w-full aspect-square rounded-sm  ring-2 ring-transparent transition-all",
                                  selectedColor === color.hex
                                    ? "ring-primary scale-110"
                                    : "border-transparent"
                                )}
                                style={{ backgroundColor: color.hex }}
                                onClick={() => setSelectedColor(color.hex)}
                              />
                            </TooltipTrigger>
                            <TooltipContent>{color.name}</TooltipContent>
                          </Tooltip>
                        ))}
                      </div>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="flex items-center gap-1 w-full mt-1">
                {/* Size selection */}
                <DropdownMenu>
                  <DropdownMenuTrigger className="w-1/2" asChild>
                    <Button variant="outline">
                      <div
                        className={!selectedSize ? "opacity-50" : "opacity-100"}
                      >
                        {selectedSize ? selectedSize : " Size"}
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-64 max-h-80 overflow-y-auto">
                    <DropdownMenuLabel>Sizes</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {clothingSizes.map((item, i) => (
                      <div className=" p-2" key={i}>
                        <div className=" text-sm opacity-75 flex items-center gap-1">
                          <div>
                            <ChevronRight size={10} />
                          </div>
                          <div>{item.name}</div>
                        </div>
                        <div className=" flex flex-wrap items-center gap-0.5 mt-2">
                          {item.sizes.map((size, j) => (
                            <div
                              key={j}
                              className={cn(
                                " px-1 py-0.5 font-mono transition-all bg-accent/50 border-foreground/10 rounded-sm text-xs hover:bg-accent cursor-pointer ring-2 ring-transparent ",
                                selectedSize == size
                                  ? " ring-accent scale-110"
                                  : ""
                              )}
                              onClick={() => {
                                setSelectedSize(size);
                              }}
                            >
                              {size}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Category  */}
                <DropdownMenu>
                  <DropdownMenuTrigger className="w-1/2" asChild>
                    <Button variant="outline">
                      <div
                        className={
                          !selectedCategory ? "opacity-50" : "opacity-100"
                        }
                      >
                        {selectedCategory ? selectedCategory : " Category"}
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-64 max-h-80 overflow-y-auto">
                    <DropdownMenuLabel>Categories</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {clothingCategories.map((item, i) => (
                      <div className=" p-2" key={i}>
                        <div className=" text-sm opacity-75 flex items-center gap-1">
                          <div>
                            <ChevronRight size={10} />
                          </div>
                          <div>{item.name}</div>
                        </div>
                        <div className=" flex flex-wrap items-center gap-0.5 mt-2">
                          {item.subcategories.map((cate, j) => (
                            <div
                              key={j}
                              className={cn(
                                " px-1 py-0.5 font-mono transition-all bg-accent/50 border-foreground/10 rounded-sm text-xs hover:bg-accent cursor-pointer ring-2 ring-transparent ",
                                selectedCategory == cate
                                  ? " ring-accent scale-110"
                                  : ""
                              )}
                              onClick={() => {
                                setSelectedCategory(cate);
                              }}
                            >
                              {cate}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="flex items-center gap-1 w-full mt-1">
                {/* Fit Selection */}
                <DropdownMenu>
                  <DropdownMenuTrigger className="w-1/2" asChild>
                    <Button variant="outline">
                      <div
                        className={!selectedFit ? "opacity-50" : "opacity-100"}
                      >
                        {selectedFit ? selectedFit : " Fit style"}
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-64 max-h-80 overflow-y-auto">
                    <DropdownMenuLabel>Fit styles</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {clothingFits.map((item, i) => (
                      <div key={i}>
                        <DropdownMenuCheckboxItem
                          key={i}
                          checked={selectedFit === item}
                          onClick={() => setSelectedFit(item)}
                        >
                          {item}
                        </DropdownMenuCheckboxItem>
                      </div>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Gender Selection */}
                <DropdownMenu>
                  <DropdownMenuTrigger className="w-1/2" asChild>
                    <Button variant="outline">
                      <div
                        className={
                          !selectedGender ? "opacity-50" : "opacity-100"
                        }
                      >
                        {selectedGender ? selectedGender : " Gender Specific"}
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-64 max-h-80 overflow-y-auto">
                    <DropdownMenuLabel>Gender Specifics</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {clothingGender.map((item, i) => (
                      <div key={i}>
                        <DropdownMenuCheckboxItem
                          key={i}
                          checked={selectedGender === item}
                          onClick={() => setSelectedGender(item)}
                        >
                          {item}
                        </DropdownMenuCheckboxItem>
                      </div>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="flex items-center gap-1 w-full mt-1">
                {/* Pattern Selection */}
                <DropdownMenu>
                  <DropdownMenuTrigger className="w-1/2" asChild>
                    <Button variant="outline">
                      <div
                        className={
                          !selectedPattern ? "opacity-50" : "opacity-100"
                        }
                      >
                        {selectedPattern ? selectedPattern : " Pattern"}
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-64 max-h-80 overflow-y-auto">
                    <DropdownMenuLabel>Patterns</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {clothingPatterns.map((item, i) => (
                      <div key={i}>
                        <DropdownMenuCheckboxItem
                          key={i}
                          checked={selectedPattern === item}
                          onClick={() => setSelectedPattern(item)}
                        >
                          {item}
                        </DropdownMenuCheckboxItem>
                      </div>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Seasons Selection */}
                <DropdownMenu>
                  <DropdownMenuTrigger className="w-1/2" asChild>
                    <Button variant="outline">
                      <div
                        className={
                          !selectedSeason ? "opacity-50" : "opacity-100"
                        }
                      >
                        {selectedSeason ? selectedSeason : " Season"}
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-64 max-h-80 overflow-y-auto">
                    <DropdownMenuLabel>Seasons</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {clothingSeasons.map((item, i) => (
                      <div key={i}>
                        <DropdownMenuCheckboxItem
                          key={i}
                          checked={selectedSeason === item}
                          onClick={() => setSelectedSeason(item)}
                        >
                          {item}
                        </DropdownMenuCheckboxItem>
                      </div>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="flex items-center gap-1 w-full mt-1">
                {/* Size selection */}
                <DropdownMenu>
                  <DropdownMenuTrigger className="w-1/2" asChild>
                    <Button variant="outline">
                      <div
                        className={
                          !selectedOccasion ? "opacity-50" : "opacity-100"
                        }
                      >
                        {selectedOccasion ? selectedOccasion : " Occasion"}
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-64 max-h-80 overflow-y-auto">
                    <DropdownMenuLabel>Occasions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {clothingOccasions.map((item, i) => (
                      <div className=" p-2" key={i}>
                        <div className=" text-sm opacity-75 flex items-center gap-1">
                          <div>
                            <ChevronRight size={10} />
                          </div>
                          <div>{item.name}</div>
                        </div>
                        <div className=" flex flex-wrap items-center gap-0.5 mt-2">
                          {item.occasions.map((occ, j) => (
                            <div
                              key={j}
                              className={cn(
                                " px-1 py-0.5 font-mono transition-all bg-accent/50 border-foreground/10 rounded-sm text-xs hover:bg-accent cursor-pointer ring-2 ring-transparent ",
                                selectedOccasion == occ
                                  ? " ring-accent scale-110"
                                  : ""
                              )}
                              onClick={() => {
                                setSelectedOccasion(occ);
                              }}
                            >
                              {occ}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                <div className=" w-full">
                  <Input
                    className=" w-full"
                    placeholder="Past source URL"
                    value={source}
                    onChange={(e) => {
                      setSource(e.target.value);
                    }}
                  />
                </div>
              </div>

              <div className=" w-2/3 mx-auto my-2 h-px bg-accent" />

              <div>
                <div className="flex   gap-2">
                  <div className=" flex items-center gap-2">
                    <Switch
                      checked={forsale}
                      onClick={() => {
                        setForsale(!forsale);
                      }}
                    />
                    <div
                      className={cn(forsale ? "opacity-100" : " opacity-50")}
                    >
                      For sale
                    </div>
                  </div>

                  {forsale && (
                    <div className=" relative">
                      <div className=" text-[9px] opacity-75 font-mono absolute top-1/2 -translate-y-1/2 left-2 leading-0">
                        DZD
                      </div>
                      <Input
                        className=" h-8 text-xs w-36 pl-8 font-mono"
                        type="number"
                        value={price}
                        onChange={(e) => {
                          setPrice(e.target.value);
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className=" mt-3">
                <TagsInput tags={tags} setTags={setTags} />
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const CreateFit = () => {
  const { user } = useUser();
  const { pieces, isLoading } = useFetchClothingPieces(user?.id);
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);

  const [fitName, setFitName] = useState("");
  const [fitDescription, setFitDescription] = useState("");
  const [fitTags, setFitTags] = useState<string[]>([]);
  const [head, setHead] = useState({
    id: "",
    pic: "",
  });
  const [body, setBody] = useState({
    id: "",
    pic: "",
  });
  const [legs, setLegs] = useState({
    id: "",
    pic: "",
  });
  const [feet, setFeet] = useState({
    id: "",
    pic: "",
  });

  // Helper function to check if a category belongs to a specific main category
  const isSubcategory = (itemCategory: string, mainCategory: string) => {
    return clothingCategories
      .find((cat) => cat.name === mainCategory)
      ?.subcategories.includes(itemCategory);
  };

  // Ensure pieces is always an array
  const safePieces = pieces || [];

  // Filtered categories based on subcategories
  const facewear = safePieces.filter(
    (item) =>
      isSubcategory(item.category, "Accessories") &&
      (item.category === "Hats" || "Sunglasses" || "Scarves")
  );

  const topwear = safePieces.filter((item) =>
    ["Tops", "Outerwear", "Activewear", "Dresses & Jumpsuits"].some((cat) =>
      isSubcategory(item.category, cat)
    )
  );

  const bottomwear = safePieces.filter((item) =>
    isSubcategory(item.category, "Bottoms")
  );

  const footwear = safePieces.filter((item) =>
    isSubcategory(item.category, "Footwear")
  );

  const handlePreviousAndCancel = () => {
    if (step > 0) {
      setStep(step - 1);
    } else {
      setHead({
        id: "",
        pic: "",
      });
      setBody({
        id: "",
        pic: "",
      });
      setLegs({
        id: "",
        pic: "",
      });
      setFeet({
        id: "",
        pic: "",
      });
    }
  };

  const handleNextAndSubmit = async () => {
    if (step === 0) {
      setStep(1);
    } else {
      if (!fitName.trim()) {
        alert("Please enter a fit name!");
        return;
      }

      setLoading(true);

      const { data, error } = await supabase.from("fits").insert([
        {
          name: fitName,
          description: fitDescription || null,
          facewearid: head.id || null,
          topwearid: body.id || null,
          bottomwearid: legs.id || null,
          footwearid: feet.id || null,
          senderid: user?.id,
          tags: fitTags,
        },
      ]);

      setLoading(false);

      if (error) {
        console.error("Error inserting fit:", error.message);
        alert("Error saving fit. Please try again.");
        return;
      }

      alert("Fit saved successfully!");
      setStep(0);
      setFitName("");
      setFitDescription("");
      setHead({ id: "", pic: "" });
      setBody({ id: "", pic: "" });
      setLegs({ id: "", pic: "" });
      setFeet({ id: "", pic: "" });
    }
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            <div className="flex items-center gap-2">
              <div>Create Fit</div>
              <Shirt size={12} />
            </div>
          </Button>
        </DialogTrigger>
        <DialogContent className={cn("w-32 p-3", step > 0 ? " w-64" : "")}>
          <DialogTitle className="hidden" />
          <div className="space-y-0.5">
            {step == 0 ? (
              <>
                {/* Facewear */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    {head.pic == "" ? (
                      <div className="w-full group aspect-square bg-accent/50 border border-foreground/10 rounded-md flex items-center justify-center">
                        <MdOutlineFace
                          className="opacity-75 group-hover:opacity-100 transition-all"
                          size={24}
                        />
                      </div>
                    ) : (
                      <div>
                        <img
                          className=" w-full object-cover group aspect-square bg-accent/50 border border-foreground/10 rounded-md"
                          src={head.pic}
                          alt={head.id}
                        />
                      </div>
                    )}
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Head wear</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {facewear.length > 0 ? (
                      facewear.map((item) => (
                        <DropdownMenuCheckboxItem
                          key={item.pieceid}
                          checked={item.pieceid == head.id}
                          onClick={() => {
                            setHead({
                              id: item.pieceid,
                              pic: item.image,
                            });
                          }}
                        >
                          {item.name}
                        </DropdownMenuCheckboxItem>
                      ))
                    ) : (
                      <div className="p-2 text-xs opacity-50">
                        No items found
                      </div>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Topwear */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    {body.pic == "" ? (
                      <div className="w-full group aspect-square bg-accent/50 border border-foreground/10 rounded-md flex items-center justify-center">
                        <Shirt
                          className="opacity-75 group-hover:opacity-100 transition-all"
                          size={24}
                        />
                      </div>
                    ) : (
                      <div>
                        <img
                          className=" w-full object-cover group aspect-square bg-accent/50 border border-foreground/10 rounded-md"
                          src={body.pic}
                          alt={body.id}
                        />
                      </div>
                    )}
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Top wear</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {topwear.length > 0 ? (
                      topwear.map((item) => (
                        <DropdownMenuCheckboxItem
                          key={item.pieceid}
                          checked={item.pieceid == body.id}
                          onClick={() => {
                            setBody({
                              id: item.pieceid,
                              pic: item.image,
                            });
                          }}
                        >
                          {item.name}
                        </DropdownMenuCheckboxItem>
                      ))
                    ) : (
                      <div className="p-2 text-xs opacity-50">
                        No items found
                      </div>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Bottomwear */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    {legs.pic == "" ? (
                      <div className="w-full group aspect-square bg-accent/50 border border-foreground/10 rounded-md flex items-center justify-center">
                        <PiPantsDuotone
                          className="opacity-75 group-hover:opacity-100 transition-all"
                          size={24}
                        />
                      </div>
                    ) : (
                      <div>
                        <img
                          className=" w-full object-cover group aspect-square bg-accent/50 border border-foreground/10 rounded-md"
                          src={legs.pic}
                          alt={legs.id}
                        />
                      </div>
                    )}
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Bottom wear</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {bottomwear.length > 0 ? (
                      bottomwear.map((item) => (
                        <DropdownMenuCheckboxItem
                          key={item.pieceid}
                          checked={item.pieceid == legs.id}
                          onClick={() => {
                            setLegs({
                              id: item.pieceid,
                              pic: item.image,
                            });
                          }}
                        >
                          {item.name}
                        </DropdownMenuCheckboxItem>
                      ))
                    ) : (
                      <div className="p-2 text-xs opacity-50">
                        No items found
                      </div>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* Footwear */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    {feet.pic == "" ? (
                      <div className="w-full group aspect-square bg-accent/50 border border-foreground/10 rounded-md flex items-center justify-center">
                        <TbShoe
                          className="opacity-75 group-hover:opacity-100 transition-all"
                          size={24}
                        />
                      </div>
                    ) : (
                      <div>
                        <img
                          className=" w-full object-cover group aspect-square bg-accent/50 border border-foreground/10 rounded-md"
                          src={feet.pic}
                          alt={feet.id}
                        />
                      </div>
                    )}
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Footwear</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {footwear.length > 0 ? (
                      footwear.map((item) => (
                        <DropdownMenuCheckboxItem
                          key={item.pieceid}
                          checked={item.pieceid == feet.id}
                          onClick={() => {
                            setFeet({
                              id: item.pieceid,
                              pic: item.image,
                            });
                          }}
                        >
                          {item.name}
                        </DropdownMenuCheckboxItem>
                      ))
                    ) : (
                      <div className="p-2 text-xs opacity-50">
                        No items found
                      </div>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : step == 1 ? (
              <div className=" space-y-0.5">
                <Input
                  type="text"
                  placeholder="Fit Title..."
                  value={fitName}
                  onChange={(e) => {
                    setFitName(e.target.value);
                  }}
                />
                <Textarea
                  placeholder="Description..."
                  value={fitDescription}
                  onChange={(e) => {
                    setFitDescription(e.target.value);
                  }}
                />
                <TagsInput tags={fitTags} setTags={setFitTags} />
              </div>
            ) : null}

            <div className=" my-1.5 bg-foreground/10 w-full h-px" />

            {/* submit and cancel */}
            <div className="mt-2 space-y-0.5">
              <Button
                onClick={handleNextAndSubmit}
                className="w-full"
                size="sm"
                disabled={loading}
              >
                {loading ? "Saving..." : step === 0 ? "Next" : "Publish"}
              </Button>

              <Button
                onClick={handlePreviousAndCancel}
                variant="secondary"
                className="w-full"
                size="sm"
              >
                {step > 0 ? "Previous" : "Cancel"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const ClothingPieces = ({ clerkID }: { clerkID: string | undefined }) => {
  const { pieces, isLoading, error } = useFetchClothingPieces(clerkID);
  const { fits } = useFetchFits(clerkID);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  // Merge and sort items by created_at safely
  const mergedItems = [...(pieces || []), ...(fits || [])].sort((a, b) => {
    const dateA = new Date(a.created_at || 0).getTime();
    const dateB = new Date(b.created_at || 0).getTime();
    return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
  });

  // Masonry breakpoint settings
  const breakpointColumnsObj = {
    default: 4, // 4 columns on large screens
    1100: 3, // 3 columns on medium screens
    768: 2, // 2 columns on tablets
    500: 2, // 1 column on mobile
  };

  return (
    <div>
      {/* Sort Order Toggle */}
      <div className="flex justify-end mb-2">
        <button
          onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
          className="px-2 py-0.5 text-xs bg-accent/50 hover:border-foreground/50 rounded-md border border-foreground/10"
        >
          {sortOrder === "asc" ? "Newest First" : "Oldest First"}
        </button>
      </div>

      {isLoading ? (
        <div className="w-full flex items-center justify-center text-xs h-44 opacity-75 gap-2">
          <div>Clothes are coming</div>
          <div>
            <Loader className="animate-spin" size={15} />
          </div>
        </div>
      ) : (
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="flex w-auto gap-4"
          columnClassName="masonry-column"
        >
          {mergedItems.map((item, i) => (
            <div key={i} className="mb-4">
              {"pieceid" in item ? (
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
              ) : (
                <FitTemplate
                  fitid={item.fitid}
                  created_at={item.created_at}
                  senderid={item.senderid}
                  facewearid={item.facewearid}
                  topwearid={item.topwearid}
                  bottomwearid={item.bottomwearid}
                  footwearid={item.footwearid}
                  name={item.name}
                  description={item.description}
                  tags={item.tags}
                />
              )}
            </div>
          ))}
        </Masonry>
      )}
    </div>
  );
};
export default WardrobePageContent;
