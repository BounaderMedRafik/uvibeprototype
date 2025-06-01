import { Bookmark, Compass, Home } from "lucide-react";
import { TbShirt } from "react-icons/tb";
import {
  BodyTypesProps,
  BrandCategory,
  ClothingCategory,
  ClothingOccasionCategory,
  ColorCategory,
  HeadTypesProps,
  linkTypeProps,
  SizeCategory,
  SkinToneTypesProps,
  TailwindColor,
} from "./type";

export const buttonIconSize = 16;
export const navItems: linkTypeProps[] = [
  {
    link: "/",
    text: "Home",
    icon: <Home size={buttonIconSize} />,
  },
  {
    link: "/explore",
    text: "Explore",
    icon: <Compass size={buttonIconSize} />,
  },
  {
    link: "/profile/wardrobe",
    text: "Wardrobe",
    icon: <TbShirt size={buttonIconSize} />,
  },
  {
    link: "/saves",
    text: "Saved",
    icon: <Bookmark size={buttonIconSize} />,
  },
];

export const headTypes: HeadTypesProps[] = [
  {
    head: "Diamond",
    headPic: "/faces/diamond.png",
  },
  {
    head: "Heart",
    headPic: "/faces/heart.png",
  },
  {
    head: "Inverted Triangle",
    headPic: "/faces/inv-triangle.png",
  },
  {
    head: "Oblong",
    headPic: "/faces/oblong.png",
  },
  {
    head: "Oval",
    headPic: "/faces/oval.png",
  },
  {
    head: "Rectangle",
    headPic: "/faces/rectangle.png",
  },
  {
    head: "Round",
    headPic: "/faces/round.png",
  },
  {
    head: "Square",
    headPic: "/faces/square.png",
  },
  {
    head: "Triangle",
    headPic: "/faces/triangle.png",
  },
];

export const BodyTypes: BodyTypesProps[] = [
  {
    body: "Hour Glass",
    bodyPic: "/body/hour-glass.png",
  },
  {
    body: "Rectangle",
    bodyPic: "/body/rectrigle.png",
  },
  {
    body: "Triangle",
    bodyPic: "/body/tringle.png",
  },
  {
    body: "Reverse Triangle",
    bodyPic: "/body/reverse-tringle.png",
  },
];

export const skinTones: SkinToneTypesProps[] = [
  {
    skinTone: "Fair",
    skinToneColors: ["#FFDFC4", "#F0D5B8", "#F3D6C6"],
  },
  {
    skinTone: "Light",
    skinToneColors: ["#F1C27D", "#EAC9A4", "#E4BFA2"],
  },
  {
    skinTone: "Medium",
    skinToneColors: ["#D1A27E", "#C69682", "#BE8A72"],
  },
  {
    skinTone: "Tan",
    skinToneColors: ["#A87552", "#9C6B43", "#B27958"],
  },
  {
    skinTone: "Deep",
    skinToneColors: ["#8D5524", "#7D4A26", "#6B4423"],
  },
  {
    skinTone: "Dark",
    skinToneColors: ["#5D3A1A", "#4A2C12", "#3B2010"],
  },
];

export const favoriteColors: ColorCategory[] = [
  {
    name: "Neutrals",
    examples: [
      { name: "Beige", hex: "#F5F5DC" },
      { name: "White", hex: "#FFFFFF" },
      { name: "Black", hex: "#000000" },
      { name: "Gray", hex: "#808080" },
      { name: "Taupe", hex: "#483C32" },
    ],
  },
  {
    name: "Pastels",
    examples: [
      { name: "Baby Blue", hex: "#89CFF0" },
      { name: "Lavender", hex: "#E6E6FA" },
      { name: "Soft Pink", hex: "#FFB6C1" },
      { name: "Mint Green", hex: "#98FB98" },
      { name: "Peach", hex: "#FFDAB9" },
    ],
  },
  {
    name: "Earth Tones",
    examples: [
      { name: "Olive Green", hex: "#808000" },
      { name: "Rust", hex: "#B7410E" },
      { name: "Terracotta", hex: "#E2725B" },
      { name: "Brown", hex: "#8B4513" },
      { name: "Mustard", hex: "#FFDB58" },
    ],
  },
  {
    name: "Brights",
    examples: [
      { name: "Electric Blue", hex: "#007FFF" },
      { name: "Hot Pink", hex: "#FF69B4" },
      { name: "Lime Green", hex: "#32CD32" },
      { name: "Neon Yellow", hex: "#FFFF00" },
      { name: "Vivid Orange", hex: "#FF4500" },
    ],
  },
  {
    name: "Jewel Tones",
    examples: [
      { name: "Emerald Green", hex: "#50C878" },
      { name: "Ruby Red", hex: "#9B111E" },
      { name: "Sapphire Blue", hex: "#0F52BA" },
      { name: "Amethyst Purple", hex: "#9966CC" },
      { name: "Topaz Gold", hex: "#FFC87C" },
    ],
  },
  {
    name: "Muted Tones",
    examples: [
      { name: "Dusty Rose", hex: "#DCAE96" },
      { name: "Muted Sage", hex: "#A8BBA2" },
      { name: "Washed Denim", hex: "#7E99A4" },
      { name: "Soft Plum", hex: "#967E76" },
      { name: "Pale Gold", hex: "#E6CBA8" },
    ],
  },
  {
    name: "Warm Colors",
    examples: [
      { name: "Red", hex: "#FF0000" },
      { name: "Orange", hex: "#FFA500" },
      { name: "Yellow", hex: "#FFFF00" },
      { name: "Coral", hex: "#FF6F61" },
      { name: "Peach", hex: "#FFDAB9" },
    ],
  },
  {
    name: "Cool Colors",
    examples: [
      { name: "Blue", hex: "#0000FF" },
      { name: "Green", hex: "#008000" },
      { name: "Purple", hex: "#800080" },
      { name: "Teal", hex: "#008080" },
      { name: "Turquoise", hex: "#40E0D0" },
    ],
  },
];

export const favoriteBrands: BrandCategory[] = [
  {
    name: "Luxury",
    examples: [
      {
        name: "Gucci",
        logo: "https://cdn.logojoy.com/wp-content/uploads/20240306150540/1992-Gucci-logo-600x319.png",
      },
      {
        name: "Louis Vuitton",
        logo: "https://static.vecteezy.com/system/resources/previews/023/871/227/non_2x/louis-vuitton-brand-logo-pink-symbol-design-clothes-fashion-illustration-with-black-background-free-vector.jpg",
      },
      {
        name: "Prada",
        logo: "https://logo.com/image-cdn/images/kts928pd/production/5be7f05ad50b4254e440898461e4ad1026a11723-900x592.png?w=1920&q=72&fm=webp",
      },
      {
        name: "Chanel",
        logo: "https://static.vecteezy.com/system/resources/previews/023/400/665/non_2x/chanel-brand-clothes-logo-symbol-black-design-fashion-illustration-free-vector.jpg",
      },
      {
        name: "Versace",
        logo: "https://static.vecteezy.com/system/resources/previews/024/131/544/non_2x/versace-brand-symbol-brown-logo-clothes-design-icon-abstract-illustration-with-black-background-free-vector.jpg",
      },
    ],
  },
  {
    name: "Streetwear",
    examples: [
      {
        name: "Nike",
        logo: "https://masterbundles.com/wp-content/uploads/2022/03/1-nike-logo-design-%E2%80%93-history-meaning-and-evolution.png",
      },
      {
        name: "Adidas",
        logo: "https://cdn-icons-png.flaticon.com/512/731/731962.png",
      },
      {
        name: "Supreme",
        logo: "https://static.vecteezy.com/system/resources/previews/023/871/581/non_2x/supreme-logo-brand-red-symbol-clothes-design-icon-abstract-illustration-with-black-background-free-vector.jpg",
      },
      {
        name: "Off-White",
        logo: "https://www.vectorkhazana.com/assets/images/products/Off_White_Symbol.png",
      },
      {
        name: "Bape",
        logo: "https://1000logos.net/wp-content/uploads/2018/04/Bape-logo.jpg",
      },
    ],
  },
  {
    name: "Casual",
    examples: [
      {
        name: "Zara",
        logo: "https://logomakerr.ai/blog/wp-content/uploads/2022/08/2019-to-Present-Zara-logo-design-1024x538.jpg",
      },
      {
        name: "H&M",
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMAaKiaRYNTRewPvMiE3pTI6o9LoTX1gpOtw&s",
      },
      {
        name: "Uniqlo",
        logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/UNIQLO_logo.svg/2058px-UNIQLO_logo.svg.png",
      },
      {
        name: "Levi’s",
        logo: "https://media.designrush.com/inspirations/758970/conversions/1-preview.jpg",
      },
      {
        name: "Tommy Hilfiger",
        logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-uoAI7Hl964hOvaINbuJw_--r5T7SvZBkpQ&s",
      },
    ],
  },
];

export const clothingBrands = [
  // Luxury Fashion Brands
  "Louis Vuitton",
  "Gucci",
  "Chanel",
  "Prada",
  "Dior",
  "Versace",
  "Burberry",
  "Balenciaga",
  "Givenchy",
  "Fendi",
  "Saint Laurent",
  "Hermès",
  "Valentino",
  "Bottega Veneta",
  "Alexander McQueen",

  // High-Street & Fast Fashion Brands
  "Zara",
  "H&M",
  "Uniqlo",
  "Mango",
  "Forever 21",
  "Topshop",
  "ASOS",
  "Bershka",
  "Pull & Bear",
  "Urban Outfitters",
  "Stradivarius",
  "River Island",
  "New Look",
  "American Eagle",
  "Cotton On",

  // Sportswear & Athleisure Brands
  "Nike",
  "Adidas",
  "Puma",
  "Reebok",
  "Under Armour",
  "Lululemon",
  "Gymshark",
  "The North Face",
  "Columbia Sportswear",
  "Patagonia",
  "Arc'teryx",
  "Champion",
  "Fila",
  "ASICS",
  "New Balance",

  // Streetwear Brands
  "Supreme",
  "Off-White",
  "A Bathing Ape (BAPE)",
  "Stüssy",
  "Fear of God",
  "Palace Skateboards",
  "Kith",
  "Anti Social Social Club",
  "Billionaire Boys Club",
  "Neighborhood",
  "Rhude",
  "Cactus Jack",
  "Vetements",
  "Yeezy",
  "NOAH",

  // Denim & Casualwear Brands
  "Levi’s",
  "Wrangler",
  "Diesel",
  "True Religion",
  "G-Star RAW",
  "Lee",
  "Guess",
  "Pepe Jeans",
  "Nudie Jeans",
  "AG Jeans",

  // Outdoor & Workwear Brands
  "Carhartt",
  "Timberland",
  "Dickies",
  "Patagonia",
  "Columbia",
  "Arc'teryx",
  "The North Face",
  "Barbour",
  "Filson",
  "Helly Hansen",

  // Formal & Business Wear Brands
  "Ralph Lauren",
  "Hugo Boss",
  "Tommy Hilfiger",
  "Brooks Brothers",
  "Ermenegildo Zegna",
  "Giorgio Armani",
  "Brioni",
  "Paul Smith",
  "Canali",
  "Ted Baker",

  // Affordable & Department Store Brands
  "GAP",
  "Old Navy",
  "Banana Republic",
  "Marks & Spencer",
  "J.Crew",
  "Target (Goodfellow & Co, A New Day)",
  "Walmart (George)",
  "ASOS Design",
  "Primark",
  "Lands' End",
];

export const tailwindColors: TailwindColor[] = [
  { name: "Slate 50", hex: "#F8FAFC" },
  { name: "Slate 100", hex: "#F1F5F9" },
  { name: "Slate 200", hex: "#E2E8F0" },
  { name: "Slate 300", hex: "#CBD5E1" },
  { name: "Slate 400", hex: "#94A3B8" },
  { name: "Slate 500", hex: "#64748B" },
  { name: "Slate 600", hex: "#475569" },
  { name: "Slate 700", hex: "#334155" },
  { name: "Slate 800", hex: "#1E293B" },
  { name: "Slate 900", hex: "#0F172A" },

  { name: "Gray 50", hex: "#F9FAFB" },
  { name: "Gray 100", hex: "#F3F4F6" },
  { name: "Gray 200", hex: "#E5E7EB" },
  { name: "Gray 300", hex: "#D1D5DB" },
  { name: "Gray 400", hex: "#9CA3AF" },
  { name: "Gray 500", hex: "#6B7280" },
  { name: "Gray 600", hex: "#4B5563" },
  { name: "Gray 700", hex: "#374151" },
  { name: "Gray 800", hex: "#1F2937" },
  { name: "Gray 900", hex: "#111827" },

  { name: "Red 50", hex: "#FEF2F2" },
  { name: "Red 100", hex: "#FEE2E2" },
  { name: "Red 200", hex: "#FECACA" },
  { name: "Red 300", hex: "#FCA5A5" },
  { name: "Red 400", hex: "#F87171" },
  { name: "Red 500", hex: "#EF4444" },
  { name: "Red 600", hex: "#DC2626" },
  { name: "Red 700", hex: "#B91C1C" },
  { name: "Red 800", hex: "#991B1B" },
  { name: "Red 900", hex: "#7F1D1D" },

  { name: "Orange 50", hex: "#FFF7ED" },
  { name: "Orange 100", hex: "#FFEDD5" },
  { name: "Orange 200", hex: "#FED7AA" },
  { name: "Orange 300", hex: "#FDBA74" },
  { name: "Orange 400", hex: "#FB923C" },
  { name: "Orange 500", hex: "#F97316" },
  { name: "Orange 600", hex: "#EA580C" },
  { name: "Orange 700", hex: "#C2410C" },
  { name: "Orange 800", hex: "#9A3412" },
  { name: "Orange 900", hex: "#7C2D12" },

  { name: "Yellow 50", hex: "#FEFCE8" },
  { name: "Yellow 100", hex: "#FEF9C3" },
  { name: "Yellow 200", hex: "#FEF08A" },
  { name: "Yellow 300", hex: "#FDE047" },
  { name: "Yellow 400", hex: "#FACC15" },
  { name: "Yellow 500", hex: "#EAB308" },
  { name: "Yellow 600", hex: "#CA8A04" },
  { name: "Yellow 700", hex: "#A16207" },
  { name: "Yellow 800", hex: "#854D0E" },
  { name: "Yellow 900", hex: "#713F12" },

  { name: "Green 50", hex: "#F0FDF4" },
  { name: "Green 100", hex: "#DCFCE7" },
  { name: "Green 200", hex: "#BBF7D0" },
  { name: "Green 300", hex: "#86EFAC" },
  { name: "Green 400", hex: "#4ADE80" },
  { name: "Green 500", hex: "#22C55E" },
  { name: "Green 600", hex: "#16A34A" },
  { name: "Green 700", hex: "#15803D" },
  { name: "Green 800", hex: "#166534" },
  { name: "Green 900", hex: "#14532D" },

  { name: "Blue 50", hex: "#EFF6FF" },
  { name: "Blue 100", hex: "#DBEAFE" },
  { name: "Blue 200", hex: "#BFDBFE" },
  { name: "Blue 300", hex: "#93C5FD" },
  { name: "Blue 400", hex: "#60A5FA" },
  { name: "Blue 500", hex: "#3B82F6" },
  { name: "Blue 600", hex: "#2563EB" },
  { name: "Blue 700", hex: "#1D4ED8" },
  { name: "Blue 800", hex: "#1E40AF" },
  { name: "Blue 900", hex: "#1E3A8A" },

  { name: "Purple 50", hex: "#FAF5FF" },
  { name: "Purple 100", hex: "#F3E8FF" },
  { name: "Purple 200", hex: "#E9D5FF" },
  { name: "Purple 300", hex: "#D8B4FE" },
  { name: "Purple 400", hex: "#C084FC" },
  { name: "Purple 500", hex: "#A855F7" },
  { name: "Purple 600", hex: "#9333EA" },
  { name: "Purple 700", hex: "#7E22CE" },
  { name: "Purple 800", hex: "#6B21A8" },
  { name: "Purple 900", hex: "#581C87" },

  { name: "Pink 50", hex: "#FDF2F8" },
  { name: "Pink 100", hex: "#FCE7F3" },
  { name: "Pink 200", hex: "#FBCFE8" },
  { name: "Pink 300", hex: "#F9A8D4" },
  { name: "Pink 400", hex: "#F472B6" },
  { name: "Pink 500", hex: "#EC4899" },
  { name: "Pink 600", hex: "#DB2777" },
  { name: "Pink 700", hex: "#BE185D" },
  { name: "Pink 800", hex: "#9D174D" },
  { name: "Pink 900", hex: "#831843" },

  { name: "Black", hex: "#000000" },
  { name: "White", hex: "#FFFFFF" },
];

export const clothingSizes: SizeCategory[] = [
  {
    name: "Standard Sizes",
    sizes: ["XXS", "XS", "S", "M", "L", "XL", "XXL", "XXXL"],
  },
  {
    name: "Numeric Sizes",
    sizes: [
      "00",
      "0",
      "2",
      "4",
      "6",
      "8",
      "10",
      "12",
      "14",
      "16",
      "18",
      "20",
      "22",
      "24",
      "26",
      "28",
    ],
  },
  {
    name: "Jeans Sizes",
    sizes: [
      "W24",
      "W25",
      "W26",
      "W27",
      "W28",
      "W29",
      "W30",
      "W31",
      "W32",
      "W33",
      "W34",
      "W36",
      "W38",
      "W40",
      "W42",
    ],
  },
  {
    name: "Dress Sizes",
    sizes: [
      "US 2",
      "US 4",
      "US 6",
      "US 8",
      "US 10",
      "US 12",
      "US 14",
      "US 16",
      "US 18",
      "UK 4",
      "UK 6",
      "UK 8",
      "UK 10",
      "UK 12",
      "UK 14",
      "UK 16",
      "UK 18",
      "UK 20",
      "EU 32",
      "EU 34",
      "EU 36",
      "EU 38",
      "EU 40",
      "EU 42",
      "EU 44",
      "EU 46",
      "EU 48",
    ],
  },
  {
    name: "Shoe Sizes",
    sizes: [
      "US 5",
      "US 6",
      "US 7",
      "US 8",
      "US 9",
      "US 10",
      "US 11",
      "US 12",
      "US 13",
      "EU 36",
      "EU 37",
      "EU 38",
      "EU 39",
      "EU 40",
      "EU 41",
      "EU 42",
      "EU 43",
      "EU 44",
      "UK 3",
      "UK 4",
      "UK 5",
      "UK 6",
      "UK 7",
      "UK 8",
      "UK 9",
      "UK 10",
      "UK 11",
    ],
  },
  {
    name: "Kids Sizes",
    sizes: [
      "NB",
      "0-3M",
      "3-6M",
      "6-9M",
      "9-12M",
      "12-18M",
      "18-24M",
      "2T",
      "3T",
      "4T",
      "5T",
      "6T",
      "7T",
      "XS Kids",
      "S Kids",
      "M Kids",
      "L Kids",
      "XL Kids",
    ],
  },
  {
    name: "Special Fit Sizes",
    sizes: [
      "Petite XS",
      "Petite S",
      "Petite M",
      "Petite L",
      "Petite XL",
      "Tall S",
      "Tall M",
      "Tall L",
      "Tall XL",
      "Tall XXL",
      "Plus 1X",
      "Plus 2X",
      "Plus 3X",
      "Plus 4X",
      "Maternity XS",
      "Maternity S",
      "Maternity M",
      "Maternity L",
      "Maternity XL",
    ],
  },
  {
    name: "Universal Sizes",
    sizes: ["One Size", "Free Size", "Custom Size"],
  },
];

export const clothingCategories: ClothingCategory[] = [
  {
    name: "Tops",
    subcategories: [
      "T-Shirts",
      "Shirts",
      "Blouses",
      "Sweaters",
      "Hoodies",
      "Tank Tops",
    ],
  },
  {
    name: "Bottoms",
    subcategories: [
      "Jeans",
      "Trousers",
      "Shorts",
      "Leggings",
      "Joggers",
      "Skirts",
    ],
  },
  {
    name: "Outerwear",
    subcategories: ["Jackets", "Coats", "Blazers", "Parkas", "Windbreakers"],
  },
  {
    name: "Dresses & Jumpsuits",
    subcategories: ["Casual Dresses", "Formal Dresses", "Jumpsuits", "Rompers"],
  },
  {
    name: "Activewear",
    subcategories: ["Sports Bras", "Leggings", "Tracksuits", "Tank Tops"],
  },
  {
    name: "Undergarments",
    subcategories: ["Bras", "Underwear", "Boxers", "Panties", "Thermal Wear"],
  },
  {
    name: "Footwear",
    subcategories: [
      "Sneakers",
      "Boots",
      "Sandals",
      "Loafers",
      "Heels",
      "Slippers",
    ],
  },
  {
    name: "Accessories",
    subcategories: ["Hats", "Scarves", "Gloves", "Belts", "Sunglasses", "Bags"],
  },
  {
    name: "Sleepwear",
    subcategories: ["Pajamas", "Nightgowns", "Robes"],
  },
  {
    name: "Swimwear",
    subcategories: ["Bikinis", "One-Piece Swimsuits", "Swim Trunks"],
  },
  {
    name: "Traditional & Cultural Wear",
    subcategories: ["Abayas", "Kurtas", "Kimonos", "Saris", "Dirndls"],
  },
];

export const clothingFits: string[] = [
  "Regular Fit", // Standard, not too tight or too loose
  "Slim Fit", // Tighter around the body, accentuating shape
  "Relaxed Fit", // Looser than regular fit, more comfortable
  "Loose Fit", // Very baggy and oversized
  "Oversized", // Intentionally larger, trendy baggy style
  "Skinny Fit", // Very tight, mostly for jeans and trousers
  "Tapered Fit", // Narrowing toward the bottom (mostly pants)
  "Athletic Fit", // Trim around waist, more room in chest & shoulders
  "Boxy Fit", // Wide and short, usually for tops
  "Cropped Fit", // Shorter than normal length
  "Tall Fit", // Made for taller individuals, longer length
  "Petite Fit", // Designed for smaller body frames
  "Curvy Fit", // Designed to accommodate curvier body shapes
  "Stretch Fit", // Includes stretchy material for flexibility
  "Compression Fit", // Very tight, used in sportswear for muscle support
];

export const clothingGender: string[] = ["Female", "Unisex"];

export const clothingPatterns: string[] = [
  "Solid", // Single, uniform color
  "Striped", // Horizontal, vertical, or diagonal stripes
  "Checked", // Includes plaid, gingham, buffalo check, etc.
  "Plaid", // Crisscrossing horizontal & vertical stripes
  "Houndstooth", // Jagged, repeating black-and-white checks
  "Herringbone", // V-shaped zigzag pattern
  "Polka Dot", // Dots evenly spaced on the fabric
  "Floral", // Flower-based patterns
  "Paisley", // Curved teardrop shapes (bohemian style)
  "Geometric", // Triangles, squares, diamonds, abstract shapes
  "Camouflage", // Military-inspired blend of colors
  "Animal Print", // Leopard, zebra, tiger, snake prints
  "Tie-Dye", // Swirled, multi-color psychedelic patterns
  "Ombre", // Gradient color effect from light to dark
  "Abstract", // Unique, artistic, non-uniform designs
  "Tartan", // Traditional Scottish checkered design
  "Argyle", // Diamond-shaped overlapping patterns
  "Lace", // Semi-transparent, delicate floral patterns
  "Textured", // Raised fabric pattern like corduroy or ribbed
  "Quilted", // Stitched padding creating a diamond pattern
  "Graphic", // Prints of images, text, or logos
  "Marbled", // Swirled, stone-like patterns
  "Galaxy", // Space-themed, nebula-style prints
  "Denim Wash", // Stone-washed, acid-washed, or faded denim effects
  "Metallic", // Shiny, reflective patterns
];

export const clothingSeasons: string[] = [
  "Spring", // Light layers, pastel colors, floral patterns
  "Summer", // Breathable fabrics, bright colors, shorts, T-shirts
  "Autumn", // Warm tones, layered outfits, sweaters, jackets
  "Winter", // Heavy coats, thermal wear, wool, dark tones
  "All-Season", // Versatile clothing suitable year-round
];

export const clothingOccasions: ClothingOccasionCategory[] = [
  {
    name: "Everyday Wear",
    occasions: [
      "Casual",
      "Smart Casual",
      "Business Casual",
      "Formal",
      "Workwear",
      "Loungewear",
    ],
  },
  {
    name: "Special Events",
    occasions: [
      "Wedding",
      "Engagement Party",
      "Bridal Shower",
      "Baby Shower",
      "Birthday Party",
      "Graduation",
      "Anniversary",
      "Gala",
      "Cocktail Party",
    ],
  },
  {
    name: "Seasonal & Holiday Wear",
    occasions: [
      "Winter Holiday",
      "Halloween",
      "Thanksgiving",
      "Easter",
      "Valentine’s Day",
      "Independence Day",
    ],
  },
  {
    name: "Outdoor & Recreational",
    occasions: [
      "Beach",
      "Resort",
      "Hiking",
      "Camping",
      "Festival",
      "Picnic",
      "Yacht Party",
    ],
  },
  {
    name: "Active & Sportswear",
    occasions: [
      "Sports",
      "Yoga",
      "Tennis",
      "Golf",
      "Skiing",
      "Cycling",
      "Swimming",
    ],
  },
  {
    name: "Cultural & Religious",
    occasions: ["Religious Ceremony", "Church", "Mosque", "Temple", "Funeral"],
  },
  {
    name: "Romantic & Social",
    occasions: [
      "Date Night",
      "Clubwear",
      "Romantic Getaway",
      "Bachelorette Party",
    ],
  },
  {
    name: "Travel & Lifestyle",
    occasions: ["Airport", "Road Trip", "Safari", "Cruise"],
  },
  {
    name: "Maternity & Family",
    occasions: ["Maternity", "Nursing", "Family Gathering"],
  },
  {
    name: "Professional & Performance",
    occasions: ["Job Interview", "Corporate Meeting", "Performance", "Theater"],
  },
  {
    name: "Themed & Costumes",
    occasions: [
      "Cosplay",
      "Renaissance Fair",
      "Masquerade Ball",
      "Steampunk Event",
      "Sci-Fi Convention",
    ],
  },
];
