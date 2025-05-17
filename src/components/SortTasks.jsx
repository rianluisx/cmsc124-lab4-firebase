export default function SortTasks({ sortBy, changeSorting }) {
  const sortOptions = ["dateAdded", "dueDate", "priority"];

  return (
    <>
      <div className="flex justify-center space-x-2 mb-4">
        {sortOptions.map((sortType) => {
          const label =
            sortType === "dateAdded"
              ? "Date Added"
              : sortType === "dueDate"
              ? "Due Date"
              : "Priority";
          const btnClass = `font-mono px-4 py-2 text-[10px] rounded transition-all cursor-pointer ${
            sortBy === sortType
              ? "bg-gray-500 text-white font-mono"
              : "bg-gray-300 hover:shadow-lg"
          }`;
          return (
            <button
              key={sortType}
              className={btnClass}
              onClick={() => changeSorting(sortType)}
            >
              Sort by {label}
            </button>
          );
        })}
      </div>
    </>
  );
}
