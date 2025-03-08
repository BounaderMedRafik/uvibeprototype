import { Bookmark, BookMarked, Compass, Home, PlusCircle } from "lucide-react";
import {
  BodyTypesProps,
  FeedNavigationItemsProps,
  HeadTypesProps,
  MessageTypeProps,
  NotificationTypeProps,
  PostTypeProps,
  SkinToneTypesProps,
} from "./fronttypes";

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

export const FeedNavigationItems: FeedNavigationItemsProps[] = [
  {
    title: "Home",
    icon: <Home size={14} />,
    href: "/feed",
  },
  {
    title: "Explore",
    icon: <Compass size={14} />,
    href: "/feed/explore",
  },
  {
    title: "Saved outfits",
    icon: <Bookmark size={14} />,
    href: "/feed/saved",
  },
];

export const notifications: NotificationTypeProps[] = [
  {
    id: "1",
    title: "Welcome!",
    message: "Thank you for joining our platform.",
    type: "success",
    createdAt: new Date("2025-03-01T10:00:00Z"),
    read: true,
  },
  {
    id: "2",
    title: "System Update",
    message: "Our servers will be down for maintenance at midnight.",
    type: "warning",
    createdAt: new Date("2025-03-02T18:30:00Z"),
    read: true,
  },
  {
    id: "3",
    title: "New Message",
    message: "You have received a new message from John.",
    type: "info",
    createdAt: new Date("2025-03-03T08:15:00Z"),
    read: false,
  },
  {
    id: "4",
    title: "Payment Failed",
    message: "Your last payment attempt was unsuccessful.",
    type: "error",
    createdAt: new Date("2025-03-04T14:45:00Z"),
    read: false,
  },
];

export const messages: MessageTypeProps[] = [
  {
    id: "1",
    senderName: "Siradj Monir Lamri",
    senderPfp:
      "https://scontent.faae2-1.fna.fbcdn.net/v/t51.75761-15/466066603_18376124068106478_2899312711218220516_n.jpg?stp=dst-jpg_tt6&_nc_cat=109&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeFcZo2qTPoF-a9UO0sq-GaMCilxGPD7xAMKKXEY8PvEAzSy_ZSZ_7vwsPb9cddg3LGMuAx_Iw9OkH7QosHqfyjW&_nc_ohc=4xOb0YeVf20Q7kNvgGK2Qcp&_nc_oc=Adgpt4hd5X7USmiG5VpDEIO7IWfPnyRIgNV1-cVuhS9ysLn2C5y2q_qEUgXpFWww0CE&_nc_zt=23&_nc_ht=scontent.faae2-1.fna&_nc_gid=AHUOvUsuLfR5wffGOOhZCW3&oh=00_AYCtYVXUSR1SQdDZB-G_C7xmMwA_Ov0yInz7649jWpvkyA&oe=67CC1EB3",
    content:
      "Hey Mohamed Rafik! Are you free to call later? I need your opinion on something.",
    timestamp: new Date("2025-03-04T09:15:00Z"),
    read: true,
  },
  {
    id: "2",
    senderName: "Chirine Bouzana",
    senderPfp:
      "https://i.pinimg.com/736x/cf/7d/9d/cf7d9dbd11c0751b2201ae8f566519ca.jpg",
    content:
      "Mohamed Rafik! Just wanted to say that your last idea was brilliant. Keep it up!",
    timestamp: new Date("2025-03-04T09:30:00Z"),
    read: true,
  },
  {
    id: "3",
    senderName: "Aymen Melouah",
    senderPfp:
      "https://scontent.faae2-3.fna.fbcdn.net/v/t39.30808-6/438092609_3685531365037369_3090009362209181785_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeFMZ72jp-DANk1_oCQSyM3KOktzPS6b9B86S3M9Lpv0H05oR0_1Osc4uABbG0YvUp3TK2lvrUTm14Kd2dYxYanL&_nc_ohc=zCWZaJVjhP4Q7kNvgHHIipi&_nc_oc=Adh_8PTgpGCvqLJaJc9AtWBHSimNLYPjVfSBXtPtR2mCT1hxpnFcagOT206_rHgiRxg&_nc_zt=23&_nc_ht=scontent.faae2-3.fna&_nc_gid=AEEHmSmwykSz2XJwrkd_SCz&oh=00_AYDdjRNr8OKnONv_7seJ6tNOJldc6eekxJHDHuTpUTk-vQ&oe=67CC3DA9",
    content:
      "Hey Rafik, did you check out the new project update? Let me know your thoughts!",
    timestamp: new Date("2025-03-04T10:00:00Z"),
    read: false,
  },
  {
    id: "4",
    senderName: "Chirine Bouzana",
    senderPfp:
      "https://i.pinimg.com/736x/cf/7d/9d/cf7d9dbd11c0751b2201ae8f566519ca.jpg",
    content:
      "Rafik, we should meet up soon! I have some ideas I’d love to discuss with you.",
    timestamp: new Date("2025-03-04T10:45:00Z"),
    read: false,
  },
];

export const clothingStyles = [
  "Casual",
  "Formal",
  "Streetwear",
  "Bohemian",
  "Vintage",
];

export const posts: PostTypeProps[] = [
  {
    id: "1",
    title: "Casual Streetwear",
    description: "A cool and comfortable outfit for everyday wear.",
    outfitImage:
      "https://cdn.prod.website-files.com/640af9a044ffd036837edf6a/66dec50466ef517f613512f2_66dec3fc54a0222ec2c40522_These%2520Fashion%2520Mistakes%2520Can%2520Add%252010%2520Pounds%2520to%2520Your%2520Look.webp",
    outfit: {
      headwear: {
        name: "Baseball Cap",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/5/58/Basecap_New_York_Yankees.jpg",
        originalSource: "NewYork™",
      },
      top: {
        name: "Graphic Sweatshirt",
        image:
          "https://img.abercrombie.com/is/image/anf/KIC_122-3278-0089-910_prod1?policy=product-large",
        originalSource: "Falcons™",
      },
      bottom: {
        name: "Slim Fit Jeans",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRS6HZ0N4SS06N9DTqGKbph-87Ql9sipj6NiA&s",
        originalSource: "Brand Z™",
      },
      footwear: {
        name: "Nike Air Force",
        image:
          "https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/b7d9211c-26e7-431a-ac24-b0540fb3c00f/AIR+FORCE+1+%2707.png",
        originalSource: "Nike™",
      },
      accessory: {
        name: "Leather Watch",
        image:
          "https://www.carlocecchini.com/wp-content/uploads/2022/04/image1-11.jpeg",
        originalSource: "Binch™",
      },
    },
    comments: [
      {
        id: "c1",
        name: "John Doe",
        profilePic:
          "https://i.pinimg.com/736x/9a/26/d4/9a26d4f9f2b3f304826b7a20307a9f3f.jpg",
        content: "Love this style! Where can I get the sneakers?",
        timestamp: new Date(),
        likes: 64,
      },
      {
        id: "c1",
        name: "John Doe",
        profilePic:
          "https://i.pinimg.com/736x/9a/26/d4/9a26d4f9f2b3f304826b7a20307a9f3f.jpg",
        content: "Love this style! Where can I get the sneakers?",
        timestamp: new Date(),
        likes: 64,
      },
      {
        id: "c1",
        name: "John Doe",
        profilePic:
          "https://i.pinimg.com/736x/9a/26/d4/9a26d4f9f2b3f304826b7a20307a9f3f.jpg",
        content: "Love this style! Where can I get the sneakers?",
        timestamp: new Date(),
        likes: 64,
      },
      {
        id: "c1",
        name: "John Doe",
        profilePic:
          "https://i.pinimg.com/736x/9a/26/d4/9a26d4f9f2b3f304826b7a20307a9f3f.jpg",
        content: "Love this style! Where can I get the sneakers?",
        timestamp: new Date(),
        likes: 64,
      },
      {
        id: "c1",
        name: "John Doe",
        profilePic:
          "https://i.pinimg.com/736x/9a/26/d4/9a26d4f9f2b3f304826b7a20307a9f3f.jpg",
        content: "Love this style! Where can I get the sneakers?",
        timestamp: new Date(),
        likes: 64,
      },
      {
        id: "c1",
        name: "John Doe",
        profilePic:
          "https://i.pinimg.com/736x/9a/26/d4/9a26d4f9f2b3f304826b7a20307a9f3f.jpg",
        content: "Love this style! Where can I get the sneakers?",
        timestamp: new Date(),
        likes: 64,
      },
      {
        id: "c1",
        name: "John Doe",
        profilePic:
          "https://i.pinimg.com/736x/9a/26/d4/9a26d4f9f2b3f304826b7a20307a9f3f.jpg",
        content: "Love this style! Where can I get the sneakers?",
        timestamp: new Date(),
        likes: 64,
      },
    ],
    upVotes: 15,
    downVotes: 2,
    category: "Casual",
    createdAt: new Date(),
    sender: {
      id: "u1",
      name: "Saint Levant",
      profilePic:
        "https://i.pinimg.com/736x/8a/ab/44/8aab44b11d524f2f98426777114b4250.jpg",
    },
    saved: true,
    colorScheme: {
      mainColor: "#1a1a1a",
      secondaryColor: "#f4f0f0",
      accentColor: "#204a92",
    },
  },
  {
    id: "2",
    title: "Formal Business Attire",
    description: "A professional and elegant look for the office.",
    outfitImage: "https://i.imgflip.com/7nx67f.png?a483360",
    outfit: {
      headwear: {
        name: "Classic Fedora",
        image:
          "https://www.bon-clic-bon-genre.eu/photo/fedora-noir-1_20240103104939.jpg",
        originalSource: "Fedora™",
      },
      top: {
        name: "Stripped White Dress Shirt",
        image:
          "https://cdn11.bigcommerce.com/s-vsmfh/images/stencil/original/products/278/2858/WHITE_2__50254.1659041794.jpg?c=2",
        originalSource: "BoyOxford™",
      },
      bottom: {
        name: "Tailored Trousers",
        image:
          "https://sfycdn.speedsize.com/c93e51c9-c4ee-4999-a19a-e064e9375152/https://www.percivalclo.com/cdn/shop/files/PERCIVAL_MENSWEAR_94fb719e-31c7-44ab-a18b-cf277973978d.jpg?v=1718889700&width=514",
        originalSource: "Dickies™",
      },
      footwear: {
        name: "Black Leather Oxfords",
        image:
          "https://www.cheaney.co.uk/images/lime-classic-oxford-in-black-calf-leather-p34-1274_image.jpg",
        originalSource: "Oxfords™",
      },
      accessory: {
        name: "Silk Tie",
        image:
          "https://www.tiemart.com/cdn/shop/products/red-silk-skinny-tie_1001x.jpg?v=1580853890",
        originalSource: "HoodTie™",
      },
    },
    comments: [
      {
        id: "c2",
        name: "Ahmed Achouri",
        profilePic:
          "https://i.pinimg.com/736x/c1/59/98/c15998ebc0711d57a91e2634c9d87f99.jpg",
        content: "Perfect for a business meeting!",
        timestamp: new Date(),
        likes: 0,
      },
    ],
    upVotes: 22,
    downVotes: 1,
    category: "Formal",
    createdAt: new Date(),
    sender: {
      id: "",
      name: "",
      profilePic: "",
    },
    saved: false,
    colorScheme: {
      mainColor: "",
      secondaryColor: "",
      accentColor: "",
    },
  },
];
