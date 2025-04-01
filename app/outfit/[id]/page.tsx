import OutfitPageContent from "@/components/core/OutfitPageContent";
import { use } from "react";

// Fix params type to match the Next.js expectation
type tParams = Promise<{ id: string }>;

interface OutfitPageProps {
  params: tParams;
}

export default function OutfitPage({ params }: OutfitPageProps) {
  // ✅ Resolve the Promise using `use()`
  const { id } = use(params);

  return (
    <div>
      <OutfitPageContent id={id} />
    </div>
  );
}
