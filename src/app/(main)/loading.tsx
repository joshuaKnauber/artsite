"use client";

import ArtworkGrid from "../components/ArtworkGrid";

export default function LoadingPage() {
  return (
    <>
      <div className="sticky left-0 top-0 z-40 flex h-header w-full flex-row items-center justify-between border-b border-b-white border-opacity-10 bg-bg-500 px-4 md:px-8"></div>
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
