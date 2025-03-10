import { ReactNode } from "react";

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
