import React from "react";
import {
  clothingSeasons,
  clothingOccasions,
  clothingPatterns,
  clothingCategories,
} from "@/data/data";

const ExploreSection = ({
  title,
  items,
}: {
  title: string;
  items: string[];
}) => (
  <div className="mt-6 ">
    <h2 className="text-lg  mb-2 ">{title}</h2>
    <div className="flex flex-wrap gap-2">
      {items.sort().map((item) => (
        <a href={`/explore/${item}`} key={item}>
          <span className="px-3 py-1 bg-accent/50 hover:bg-accent border border-transparent hover:border-foreground/25 transition-all rounded-lg text-xs font-mono">
            {item}
          </span>
        </a>
      ))}
    </div>
  </div>
);

const ExplorePageContent = () => {
  return (
    <div className="max-w-2xl mx-auto pb-52 p-4 md:p-0 ">
      <div className="mb-6">
        <h1 className="text-2xl  font-siradj">Explore</h1>
        <p className="opacity-50 text-sm">
          Discover clothing styles, patterns, seasons, and occasions.
        </p>
      </div>

      {/* Clothing Seasons */}
      <ExploreSection title="Seasons" items={clothingSeasons} />

      {/* Clothing Occasions */}
      {clothingOccasions.map((category) => (
        <ExploreSection
          key={category.name}
          title={category.name}
          items={category.occasions.sort()}
        />
      ))}

      {/* Clothing Patterns */}
      <ExploreSection title="Patterns" items={clothingPatterns} />

      {/* Clothing Categories */}
      {clothingCategories.map((category) => (
        <ExploreSection
          key={category.name}
          title={category.name}
          items={category.subcategories.sort()}
        />
      ))}
    </div>
  );
};

export default ExplorePageContent;
