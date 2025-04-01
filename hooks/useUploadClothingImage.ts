import supabase from "@/app/supabase/supaClient";
import { useState } from "react";

const BUCKET_NAME = "pieces-bucket";

export function useUploadClothingImage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadClothingImage = async (file: File) => {
    setIsLoading(true);
    setError(null);

    try {
      const filePath = `clothing-images/${Date.now()}-${file.name}`;

      // Upload image to Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from(BUCKET_NAME)
        .upload(filePath, file, { cacheControl: "3600", upsert: false });

      if (uploadError) throw uploadError;

      const imageUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${BUCKET_NAME}/${uploadData.path}`;

      return imageUrl;
    } catch (err: any) {
      setError(err.message || "Failed to upload image");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { uploadClothingImage, isLoading, error };
}
