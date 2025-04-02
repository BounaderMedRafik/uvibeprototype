import ProfileInWardrobe from "@/components/core/ProfileInWardrobe";
import ProfilePageContent from "@/components/core/ProfilePageContent";
import React from "react";

export default function ProfilePage() {
  return (
    <div>
      <ProfilePageContent />
      <div className=" h-px w-full p-0 wrapper mx-auto my-6 bg-foreground/25" />
      <ProfileInWardrobe />
    </div>
  );
}
