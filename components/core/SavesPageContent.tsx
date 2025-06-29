"use client";
import React from "react";
import { useUser } from "@clerk/nextjs";
import useFetchSavedFits from "@/hooks/useFetchSavedFits";
import useFetchFitById from "@/hooks/useFetchFitById";
import FitTemplate from "./FitTemplate";

const SavesPageContent = () => {
  const { user } = useUser();
  const { savedFits, isLoading: isLoadingSaves } = useFetchSavedFits(user?.id);

  return (
    <div className="wrapper">
      <div className="max-w-2xl mx-auto">
        <div className="text-2xl opacity-75 font-siradj">Saved outfits</div>
        <div className="max-w-sm opacity-50 text-xs">
          Browse and manage your favorite clothing combinations. Save outfits
          for different occasions or seasons.
        </div>
      </div>

      <div>
        {isLoadingSaves ? (
          <div>Loading...</div>
        ) : savedFits.length === 0 ? (
          <div className="text-center  opacity-50 text-sm mt-36">
            No saved outfits yet.
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 mt-10 gap-3">
            {savedFits.map((savedFit) => (
              <div>
                <SavedFitItem key={savedFit.fitid} fitid={savedFit.fitid} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// 🏷️ New Component: Fetches and Displays a Single Fit
export const SavedFitItem = ({ fitid }: { fitid: string }) => {
  const { fit, isLoading } = useFetchFitById(fitid);

  if (isLoading) return <div>Loading...</div>;
  if (!fit) return null; // If the fit was deleted or not found, hide it

  return (
    <FitTemplate
      fitid={fit.fitid}
      created_at={fit.created_at}
      senderid={fit.senderid}
      facewearid={fit.facewearid}
      topwearid={fit.topwearid}
      bottomwearid={fit.bottomwearid}
      footwearid={fit.footwearid}
      name={fit.name}
      description={fit.description}
      tags={fit.tags}
    />
  );
};

export default SavesPageContent;
