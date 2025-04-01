import { ReactNode } from "react";

export type linkTypeProps = {
  link: string;
  text: string;
  icon: ReactNode;
};

export type SupaUser = {
  userid: string;
  created_at: Date;
  name: string;
  username: string;
  pfp: string;
  bio: string;
  banner: string;
  gender: string;
  weight: string;
  height: string;
  headShape: string;
  bodyShape: string;
  relation: string;
  work: string;
  skintone: string;
  favColors: ColorExample[];
  favBrands: BrandExample[];
};

export type HeadTypesProps = {
  head: string;
  headPic: string;
};

export type BodyTypesProps = {
  body: string;
  bodyPic: string;
};

export type SkinToneTypesProps = {
  skinTone: string;
  skinToneColors: string[];
};

export type FeedNavigationItemsProps = {
  title: string;
  icon: ReactNode;
  href: string;
};

export type NotificationTypeProps = {
  id: string;
  title: string;
  message: string;
  type: "success" | "error" | "info" | "warning";
  createdAt: Date;
  read: boolean;
};

export type MessageTypeProps = {
  id: string;
  senderName: string;
  senderPfp: string;
  content: string;
  timestamp: Date;
  read: boolean;
};

export type PostTypeProps = {
  id: string;
  title: string;
  description: string;
  outfitImage: string;
  outfit: {
    headwear: {
      name: string;
      image: string;
      originalSource: string;
    };
    top: {
      name: string;
      image: string;
      originalSource: string;
    };
    bottom: {
      name: string;
      image: string;
      originalSource: string;
    };
    footwear: {
      name: string;
      image: string;
      originalSource: string;
    };
    accessory: {
      name: string;
      image: string;
      originalSource: string;
    };
  };
  comments: {
    id: string;
    name: string;
    profilePic: string;
    content: string;
    timestamp: Date;
    likes: number;
  }[];
  upVotes: number;
  downVotes: number;
  category: string;
  createdAt: Date;

  sender: {
    id: string;
    name: string;
    profilePic: string;
  };

  saved: boolean;

  colorScheme: {
    mainColor: string;
    secondaryColor: string;
    accentColor: string;
  };
};

export type ColorExample = {
  name: string;
  hex: string;
};

export type ColorCategory = {
  name: string;
  examples: ColorExample[];
};

export type BrandExample = {
  name: string;
  logo: string; // URL to brand logo
};

export type BrandCategory = {
  name: string;
  examples: BrandExample[];
};

export type WardrobeItemExample = {
  name: string;
  brand: string;
  image: string; // URL to item image
  color: string;
};

export type ClothingPiece = {
  pieceid: string;
  senderid: string;
  created_at: Date;
  name: string;
  description: string;
  brand: string;
  color: string;
  size: string;
  category: string;
  fit: string;
  gender: string;
  pattern: string;
  season: string;
  occasion: string;
  price: string;
  image: string;
  source: string;
  forsale: boolean;
  tags: string[];
};

export type ClothingFit = {
  fitid: string; // UUID
  created_at: Date; // ISO timestamp
  name?: string;
  description?: string;
  facewearid?: string;
  topwearid?: string;
  bottomwearid?: string;
  footwearid?: string;
  senderid: string;
  tags: string[];
};

export type TailwindColor = {
  name: string;
  hex: string;
};

export type SizeCategory = {
  name: string;
  sizes: string[];
};

export type ClothingCategory = {
  name: string;
  subcategories: string[];
};

export type ClothingOccasionCategory = {
  name: string;
  occasions: string[];
};

export type CommentType = {
  commentid: string;
  created_at: Date;
  content: string;
  senderid: string;
  postid: string;
};

export type SaveProperties = {
  saveid: string;
  created_at: string;
  fitid: string;
  saverid: string;
};
