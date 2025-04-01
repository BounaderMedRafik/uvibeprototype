import { ClothingPiece } from "@/data/type";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { ChevronRight, Hash } from "lucide-react";
import moment from "moment";
import Link from "next/link";

const ClothPieceTemplate: React.FC<ClothingPiece> = ({
  pieceid,
  senderid,
  created_at,
  name,
  description,
  brand,
  color,
  size,
  category,
  fit,
  gender,
  pattern,
  season,
  occasion,
  price,
  image,
  source,
  forsale,
  tags,
}) => {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <div className="relative group border border-foreground/10 rounded-xl">
            {forsale && (
              <div className="pointer-events-none px-2 border-2 border-background/50 py-0.5 bg-primary text-background w-fit text-xs absolute top-1 right-1 md:top-0 md:right-0 md:rotate-45 md:rounded-sm rounded-full shadow md:translate-x-1/2 z-20">
                FOR SALE
              </div>
            )}

            <div className="opacity-0 group-hover:opacity-100 absolute bottom-0 left-0 w-full p-2 pointer-events-none transition-all">
              <div className="text-xs bg-background/75 backdrop-blur-lg rounded-sm mb-0.5 w-fit ml-auto px-2 py-0.5 font-mono">
                {moment(created_at).startOf("day").fromNow()}
              </div>
              <div className="bg-background/75 backdrop-blur-lg p-1.5 px-2 rounded-lg">
                <div className="text-sm font-semibold line-clamp-1">{name}</div>
                <div className="text-xs opacity-75 line-clamp-2">
                  {description}
                </div>
              </div>
            </div>
            {image && image.trim() !== "" && (
              <img className="rounded-2xl" src={image} alt={name} />
            )}
          </div>
        </DialogTrigger>

        <DialogContent className="md:min-w-2xl">
          <DialogHeader>
            <DialogTitle>
              <div className="flex items-center justify-between">
                <div>{name}</div>
                <div className="text-xs opacity-75">
                  {moment(created_at).format("ll")}
                </div>
              </div>
            </DialogTitle>
          </DialogHeader>

          <div className="w-full md:flex">
            <div className="md:w-1/3">
              {image && image.trim() !== "" && (
                <img
                  src={image}
                  className="w-full h-64 object-cover rounded-2xl"
                  alt={name}
                />
              )}
            </div>

            <div className="md:w-2/3 p-3">
              <div className="text-sm opacity-75 flex items-center gap-1">
                <ChevronRight size={10} />
                <div>Description</div>
              </div>
              <div className="text-xs opacity-75 mt-2">{description}</div>

              <div className="my-3 bg-foreground/25 h-px w-full" />
              <div className="grid gap-1">
                {[
                  "Brand",
                  "Gender",
                  "Category",
                  "Fit",
                  "Pattern",
                  "Season",
                  "Occasion",
                ].map((label, index) => (
                  <div
                    key={index}
                    className="text-sm opacity-75 flex items-center gap-1"
                  >
                    <ChevronRight size={10} />
                    <div>
                      {label} :{" "}
                      <span className="italic font-semibold">
                        {eval(label.toLowerCase())}
                      </span>
                    </div>
                  </div>
                ))}
                <div className="text-sm opacity-75 flex items-center gap-1">
                  <ChevronRight size={10} />
                  <div>Color : </div>
                  <div
                    style={{ backgroundColor: color }}
                    className="size-5 ml-1 rounded-sm border-foreground/20"
                  />
                </div>
                {forsale && (
                  <div className="text-sm opacity-75 flex items-center gap-1">
                    <ChevronRight size={10} />
                    <div>
                      Price :{" "}
                      <span className="italic font-semibold">{price} DZD</span>
                    </div>
                  </div>
                )}
                {source && (
                  <div className="text-sm opacity-75 flex items-center gap-1">
                    <ChevronRight size={10} />
                    <div>
                      Source :{" "}
                      <a
                        target="_blank"
                        href={source}
                        className="italic hover:border-foreground/75 px-1 text-xs border border-foreground/10 bg-accent rounded-sm"
                      >
                        link ↳
                      </a>
                    </div>
                  </div>
                )}
              </div>
              <div className="mt-5 text-sm opacity-75 flex items-center gap-1">
                <div className="flex flex-wrap items-center gap-0.5">
                  {tags.map((item, i) => (
                    <Link key={i} href={`/tag/${item}`}>
                      <div className="text-xs flex items-center gap-1 px-1 py-0.5 bg-accent border border-foreground/10 hover:border-foreground/50 rounded-sm font-mono">
                        <Hash size={12} /> {item}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ClothPieceTemplate;
