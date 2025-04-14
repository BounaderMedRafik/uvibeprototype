import SingularExplorePageContent from "@/components/core/SingularExplorePageContent";
import React, { use } from "react";

type tParams = Promise<{ id: string }>;

interface OutfitPageProps {
  params: tParams;
}

export default function SingularExplorePage({ params }: OutfitPageProps) {
  const { id } = use(params);

  return (
    <div>
      <SingularExplorePageContent id={id} />
    </div>
  );
}
