import UserProfilePageContent from "@/components/core/UserProfilePageContent";
import React, { use } from "react";

type tParams = Promise<{ id: string }>;

interface OutfitPageProps {
  params: tParams;
}

export default function UserProfilePage({ params }: OutfitPageProps) {
  const { id } = use(params);

  return (
    <div>
      <UserProfilePageContent id={id} />
      <div className=" h-px w-full p-0 wrapper mx-auto my-6 bg-foreground/25" />
    </div>
  );
}
