import { Input } from "@/components/ui/input";
import { Hash, X } from "lucide-react";
import { useState } from "react";

export function TagsInput({
  tags,
  setTags,
}: {
  tags: string[];
  setTags: (tags: string[]) => void;
}) {
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      e.preventDefault();
      if (!tags.includes(inputValue.trim())) {
        setTags([...tags, inputValue.trim()]);
      }
      setInputValue("");
    }
  };

  const removeTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  return (
    <div>
      <Input
        type="text"
        placeholder="Enter a tag and press Enter..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      {/* Tags Preview */}
      <div className="flex flex-wrap gap-0.5 mt-2">
        {tags.map((tag, index) => (
          <div
            key={index}
            className=" text-xs flex items-center gap-1 px-1 py-0.5 bg-accent border border-foreground/10 rounded-sm font-mono"
          >
            <div className="flex items-center gap-0.5">
              <div>
                <Hash size={12} />
              </div>
              <div>{tag}</div>
            </div>
            <div onClick={() => removeTag(index)}>
              <X className="w-3 h-3 hover:text-destructive" />
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-end">
        {tags.length > 0 && (
          <div
            onClick={() => {
              setTags([]);
            }}
            className=" text-xs opacity-75 hover:opacity-100 transition-all cursor-pointer mt-2 flex items-center gap-1"
          >
            <div>clear all</div>
            <div>
              <X size={10} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
