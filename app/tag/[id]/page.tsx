import SingleTagPageContent from "@/components/core/SingleTagPageContent";
import React, { use } from "react";

type tParams = Promise<{ id: string }>;

interface OutfitPageProps {
  params: tParams;
}

export default function SingleTagPage({ params }: OutfitPageProps) {
  const { id } = use(params);
  return (
    <div>
      <SingleTagPageContent id={id} />
    </div>
  );
}
