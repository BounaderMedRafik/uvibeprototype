import FeedNavigation from "@/components/core/feedComps/FeedNavigation";

export default function FeedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className=" font-Poppins">
      <div>
        <FeedNavigation />
      </div>
      <div className=" pt-24">{children}</div>
    </div>
  );
}
