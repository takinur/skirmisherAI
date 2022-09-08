import TopNavigation from "../TopNav";

const ContentContainer = () => {
  return (
    <div
      className="content-container md:pl-64 flex flex-col 
    bg-gray-300 dark:bg-gray-700
    m-0 
    h-full w-full 
    overflow-hidden"
    >
      <TopNavigation />
      <div className="content-list min-h-screen p-2">
        <h1 className="text-ceter text-2xl font-bold">Content List</h1>
      </div>
    </div>
  );
};

export default ContentContainer;
