"use client";

import ArtworkGrid from "../components/ArtworkGrid";

export default function LoadingPage() {
  return (
    <>
      <div className="flex w-full px-4 py-4 md:px-8 md:py-8">
        <ArtworkGrid>
          <div className="h-[400px] w-full flex-grow bg-bg-600"></div>
          <div className="h-[500px] w-full flex-grow bg-bg-600"></div>
          <div className="h-[450px] w-full flex-grow bg-bg-600"></div>
          <div className="h-[550px] w-full flex-grow bg-bg-600"></div>
          <div className="h-[400px] w-full flex-grow bg-bg-600"></div>
          <div className="h-[350px] w-full flex-grow bg-bg-600"></div>
          <div className="h-[450px] w-full flex-grow bg-bg-600"></div>
        </ArtworkGrid>
      </div>
    </>
  );
}
