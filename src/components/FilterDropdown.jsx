import { FaFilter } from "react-icons/fa";

const FilterDropdown = ({ show, toggle, locations, selectedArea, onSelect, onClear }) => (
  <div className="relative">
    <button
      className="flex items-center bg-gray-200 text-gray-800 text-sm px-3 py-1 rounded-full hover:bg-gray-300"
      onClick={toggle}
    >
      <FaFilter className="mr-1" /> Filter
    </button>
    {show && (
      <div className="absolute bg-white shadow-md rounded-lg mt-2 p-3 w-48 z-10">
        <p className="text-gray-600 font-semibold text-xs mb-2">Filter by Area</p>
        {locations.map((area, index) => (
          <label key={index} className="flex items-center text-xs">
            <input
              type="radio"
              name="area"
              value={area}
              checked={selectedArea === area}
              onChange={(e) => onSelect(e.target.value)}
              className="mr-2"
            />
            {area}
          </label>
        ))}
        <button
          onClick={onClear}
          className="text-xs mt-2 text-red-500 underline hover:text-red-700"
        >
          Clear Filters
        </button>
      </div>
    )}
  </div>
);

export default FilterDropdown;
