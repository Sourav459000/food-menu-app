const ButtonGroup = ({ onClearFilters, onShowAll }) => (
    <div className="flex items-center gap-2">
      <button
        className="bg-blue-500 text-white text-sm px-3 py-1 rounded-full hover:bg-blue-600 transition"
        onClick={onShowAll}
      >
        All Items
      </button>
      <button
        className="bg-red-500 text-white text-sm px-3 py-1 rounded-full hover:bg-red-600 transition"
        onClick={onClearFilters}
      >
        Clear Filters
      </button>
    </div>
  );
  
  export default ButtonGroup;
  