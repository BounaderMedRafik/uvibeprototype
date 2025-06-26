"use client";
import { ClothingPiece } from "@/data/type";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "../ui/dialog";
import { BarChart, Bug, ChevronRight, Hash, Trash } from "lucide-react";
import moment from "moment";
import Link from "next/link";
import useGetSupaUser from "@/hooks/useGetSupaUser";
import { useUser } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { useDeletePiece } from "@/hooks/useDeletePiece";
import { useReportPost } from "@/hooks/useReportPost";
import { Textarea } from "../ui/textarea";

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
  const { supaUser } = useGetSupaUser(senderid);
  const { user } = useUser();
  const { deletePiece, loading } = useDeletePiece();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [reportOpen, setReportOpen] = useState(false);
  const [reportMessage, setReportMessage] = useState("");
  const [reportSuccess, setReportSuccess] = useState(false);
  const { report, loading: reportLoading } = useReportPost();

  const handleDelete = async () => {
    const success = await deletePiece(pieceid);
    if (success) {
      setConfirmOpen(false);
      window.location.reload();
    } else {
      alert("Failed to delete the item. Please try again.");
    }
  };

  const handleSubmitReport = async () => {
    if (!user?.id || !reportMessage.trim()) return;

    const success = await report({
      userid: user.id,
      postid: pieceid,
      reportMessage,
      typepost: "cloth",
    });

    if (success) {
      setReportSuccess(true);
    }
  };

  return (
    <div className="w-full">
      <Dialog>
        <DialogTrigger asChild>
          <div className="relative group border border-foreground/10 rounded-xl cursor-pointer w-full aspect-square ">
            {forsale && (
              <div className="pointer-events-none px-2 border-2 border-background/50 py-0.5 bg-primary text-background w-fit text-xs absolute top-1 right-1 md:top-0 md:right-0 md:rotate-45 md:rounded-sm rounded-full shadow md:translate-x-1/2 z-20">
                FOR SALE
              </div>
            )}

            <div className="opacity-0 group-hover:opacity-100 absolute bottom-0 left-0 w-full p-2 pointer-events-none transition-all z-10">
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

            {image && image.trim() !== "" ? (
              <img
                className="w-full h-full object-cover rounded-xl hover:scale-105 transition-transform duration-300"
                src={image}
                alt={name}
              />
            ) : (
              <div className="w-full h-full bg-accent/50 flex items-center justify-center rounded-xl">
                <div className="text-xs opacity-50">No Image</div>
              </div>
            )}
          </div>
        </DialogTrigger>

        <DialogContent className=" md:min-w-4xl  max-h-[90vh]  overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div className="text-lg font-bold line-clamp-2">{name}</div>
                <div className="text-xs opacity-75">
                  {moment(created_at).format("ll")}
                </div>
              </div>
            </DialogTitle>
          </DialogHeader>

          <div className="w-full flex flex-col md:flex-row gap-4 md:gap-6">
            {/* Image Section */}
            <div className="w-full md:w-1/3 flex flex-col gap-2">
              {image && image.trim() !== "" && (
                <img
                  src={image}
                  className="w-full h-64 md:h-80 object-cover rounded-xl"
                  alt={name}
                />
              )}

              {/* User Info - Mobile */}
              <div className="flex gap-2 md:hidden items-center">
                <Link
                  href={
                    senderid == user?.id ? "/profile" : `/profile/${senderid}`
                  }
                >
                  <img
                    className="size-10 rounded-full"
                    src={supaUser?.pfp}
                    alt={supaUser?.name}
                  />
                </Link>
                <div>
                  <div className="text-xs opacity-75">
                    @{supaUser?.username}
                  </div>
                  <div className="text-sm">{supaUser?.name}</div>
                </div>
              </div>
            </div>

            {/* Details Section */}
            <div className="w-full md:w-2/3 flex flex-col gap-4">
              {/* User Info - Desktop */}
              <div className="hidden md:flex gap-2 items-center">
                <Link
                  href={
                    senderid == user?.id ? "/profile" : `/profile/${senderid}`
                  }
                >
                  <img
                    className="size-10 rounded-full"
                    src={supaUser?.pfp}
                    alt={supaUser?.name}
                  />
                </Link>
                <div>
                  <div className="text-xs opacity-75">
                    @{supaUser?.username}
                  </div>
                  <div className="text-sm">{supaUser?.name}</div>
                </div>
              </div>

              {/* Description */}
              <div>
                <div className="text-sm opacity-75 flex items-center gap-1">
                  <ChevronRight size={10} />
                  <div>Description</div>
                </div>
                <div className="text-sm opacity-75 mt-2 p-2 bg-accent/20 rounded-md">
                  {description || "No description provided"}
                </div>
              </div>

              <div className="my-2 bg-foreground/10 h-px w-full" />

              {/* Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  ["Brand", brand],
                  ["Gender", gender],
                  ["Category", category],
                  ["Size", size],
                  ["Fit", fit],
                  ["Pattern", pattern],
                  ["Season", season],
                  ["Occasion", occasion],
                ].map(([label, value], index) => (
                  <div key={index} className="text-sm flex items-start gap-1">
                    <ChevronRight size={10} className="mt-0.5 flex-shrink-0" />
                    <div>
                      <span className="opacity-75">{label}: </span>
                      <span className="font-medium">{value || "-"}</span>
                    </div>
                  </div>
                ))}

                <div className="text-sm flex items-center gap-1">
                  <ChevronRight size={10} />
                  <div className="opacity-75">Color: </div>
                  {color ? (
                    <div
                      style={{ backgroundColor: color }}
                      className="size-5 ml-1 rounded-sm border border-foreground/20"
                    />
                  ) : (
                    <span className="font-medium">-</span>
                  )}
                </div>

                {forsale && (
                  <div className="text-sm flex items-center gap-1">
                    <ChevronRight size={10} />
                    <div className="opacity-75">Price: </div>
                    <span className="font-medium">{price} DZD</span>
                  </div>
                )}

                {source && (
                  <div className="text-sm flex items-center gap-1 col-span-full">
                    <ChevronRight size={10} />
                    <div className="opacity-75">Source: </div>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={source}
                      className="italic hover:border-foreground/75 px-1 text-xs border border-foreground/10 bg-accent rounded-sm"
                    >
                      link ↗
                    </a>
                  </div>
                )}
              </div>

              {/* Tags */}
              {tags.length > 0 && (
                <div className="mt-2">
                  <div className="text-sm opacity-75 mb-1">Tags:</div>
                  <div className="flex flex-wrap items-center gap-1">
                    {tags.map((item, i) => (
                      <Link key={i} href={`/tag/${item}`}>
                        <div className="text-xs flex items-center gap-1 px-2 py-1 bg-accent border border-foreground/10 hover:border-foreground/50 rounded-full font-mono">
                          <Hash size={12} /> {item}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-end gap-2 mt-4">
                <Button
                  size={"sm"}
                  variant="outline"
                  onClick={() => setReportOpen(true)}
                  className="flex-1 sm:flex-none"
                >
                  <div className="flex items-center gap-2">
                    <div>Report</div>
                    <Bug size={13} />
                  </div>
                </Button>

                {supaUser?.userid === user?.id && (
                  <Button
                    size={"sm"}
                    variant="destructive"
                    onClick={() => setConfirmOpen(true)}
                    disabled={loading}
                    className="flex-1 sm:flex-none"
                  >
                    <div className="flex items-center gap-2">
                      <div>{loading ? "Deleting..." : "Delete"}</div>
                      <Trash size={13} />
                    </div>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Report Dialog */}
      <Dialog
        open={reportOpen}
        onOpenChange={(open) => {
          setReportOpen(open);
          if (!open) {
            setReportMessage("");
            setReportSuccess(false);
          }
        }}
      >
        <DialogContent className="sm:max-w-md">
          {reportSuccess ? (
            <>
              <DialogHeader>
                <DialogTitle className="text-green-600">
                  Report Submitted ✅
                </DialogTitle>
              </DialogHeader>
              <p className="text-sm text-muted-foreground">
                Thank you for your report. We'll review this item shortly.
              </p>
              <DialogFooter className="mt-4">
                <Button onClick={() => setReportOpen(false)}>Close</Button>
              </DialogFooter>
            </>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle>Report this Item</DialogTitle>
                <p className="text-sm text-muted-foreground">
                  Please describe the issue with this item
                </p>
              </DialogHeader>
              <Textarea
                placeholder="Describe the issue..."
                value={reportMessage}
                onChange={(e) => setReportMessage(e.target.value)}
                className="min-h-[120px]"
              />
              <DialogFooter>
                <Button variant="outline" onClick={() => setReportOpen(false)}>
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmitReport}
                  disabled={reportLoading || !reportMessage.trim()}
                >
                  {reportLoading ? "Submitting..." : "Submit Report"}
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <p className="text-sm text-muted-foreground">
              This action cannot be undone.
            </p>
          </DialogHeader>
          <p className="text-sm">
            Are you sure you want to delete <b>{name}</b>?
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={loading}
            >
              {loading ? "Deleting..." : "Confirm Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ClothPieceTemplate;
