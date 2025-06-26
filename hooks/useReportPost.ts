import supabase from "@/app/supabase/supaClient";
import { useState } from "react";

export function useReportPost() {
  const [loading, setLoading] = useState(false);

  const report = async ({
    userid,
    postid,
    reportMessage,
    typepost,
  }: {
    userid: string;
    postid: string;
    reportMessage: string;
    typepost: string;
  }) => {
    setLoading(true);
    const { error } = await supabase.from("reports").insert({
      userid,
      postid,
      reportMessage,
      typepost,
    });
    setLoading(false);

    return !error;
  };

  return { report, loading };
}
