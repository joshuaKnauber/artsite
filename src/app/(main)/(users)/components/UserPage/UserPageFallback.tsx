import ArtworkGrid from "@/app/components/ArtworkGrid";

const UserPageFallback = () => {
  return (
    <div className="flex w-full flex-col gap-8 px-4 py-8 md:flex-row md:gap-0 md:px-0 md:py-0">
      <div className="flex w-full flex-shrink-0 flex-col gap-8 overflow-y-auto px-4 py-4 md:sticky md:left-0 md:top-header md:h-[100vh] md:max-h-[calc(100vh-4rem)] md:w-sidebar md:px-8 md:px-8 md:py-8 md:py-8">
        <div className="flex w-full flex-row items-start gap-4">
          <div className="h-28 w-28 rounded-full bg-bg-600"></div>
          <div className="flex flex-grow flex-col">
            <div className="flex flex-grow flex-col gap-2">
              <div className="h-6 w-full rounded-full bg-bg-600"></div>
              <div className="h-4 w-full rounded-full bg-bg-600"></div>
            </div>
          </div>
        </div>
      </div>
      <div className={`md:flex-grow md:bg-bg-400 md:px-8 md:py-8`}>
        <ArtworkGrid>
          <div className="h-[400px] w-full flex-grow bg-bg-600"></div>
          <div className="h-[450px] w-full flex-grow bg-bg-600"></div>
          <div className="h-[500px] w-full flex-grow bg-bg-600"></div>
          <div className="h-[350px] w-full flex-grow bg-bg-600"></div>
          <div className="h-[450px] w-full flex-grow bg-bg-600"></div>
          <div className="h-[400px] w-full flex-grow bg-bg-600"></div>
        </ArtworkGrid>
      </div>
    </div>
  );
};

export default UserPageFallback;
