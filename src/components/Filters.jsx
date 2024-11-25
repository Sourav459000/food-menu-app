import React, { useState, useEffect } from "react";
import axios from "axios";
import FilterDropdown from "./FilterDropdown";
import SortDropdown from "./SortDropdown";
import Pagination from "./Pagination";

const puneLocations = [
  "Hadapsar",
  "Kalyani Nagar",
  "Aundh",
  "Viman Nagar",
  "Magarpatta",
  "Pimpri-Chinchwad",
  "Baner",
  "Shivaji Nagar",
  "Karve Nagar",
  "Koregaon Park",
];

const Header = ({ title }) => (
  <h2 className="text-lg lg:text-3xl font-bold text-gray-800 mb-3">{title}</h2>
);

const Filters = () => {
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  const [expandedCardIndex, setExpandedCardIndex] = useState(null);

  const [meals, setMeals] = useState([]);
  const [selectedArea, setSelectedArea] = useState("");
  const [selectedSort, setSelectedSort] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await axios.get("https://www.themealdb.com/api/json/v1/1/filter.php?a=indian");
        const mealsData = response.data.meals;

        const generatePrice = (size) => {
          const fullPrices = [549, 599, 649, 699, 749, 799];
          const halfPrices = [299, 349, 399, 449, 499];
          return size === "Full"
            ? fullPrices[Math.floor(Math.random() * fullPrices.length)]
            : halfPrices[Math.floor(Math.random() * halfPrices.length)];
        };

        const mealsWithLocation = mealsData.map((meal) => {
          const size = Math.random() > 0.5 ? "Full" : "Half";
          return {
            ...meal,
            location: puneLocations[Math.floor(Math.random() * puneLocations.length)],
            rating: (Math.random() * (5 - 3) + 3).toFixed(1),
            price: generatePrice(size),
            size,
            description: `A delicious meal of ${meal.strMeal}, prepared with authentic ingredients to give you the best taste!`,
          };
        });

        setMeals(mealsWithLocation);
      } catch (error) {
        console.error("Error fetching meals:", error);
      }
    };

    fetchMeals();
  }, []);

  const handleAreaSelection = (selected) => setSelectedArea(selected);
  const handleSortSelection = (selected) => setSelectedSort(selected);

  const clearFilters = () => {
    setSelectedArea("");
    setSelectedSort("");
  };

  const toggleFilterDropdown = () => {
    setShowFilterDropdown((prev) => !prev);
    if (showSortDropdown) setShowSortDropdown(false);
  };

  const toggleSortDropdown = () => {
    setShowSortDropdown((prev) => !prev);
    if (showFilterDropdown) setShowFilterDropdown(false);
  };

  const getFilteredMeals = () => {
    let filteredMeals = meals;

    if (selectedArea) {
      const matchingMeals = filteredMeals.filter((meal) => meal.location === selectedArea);
      const remainingMeals = filteredMeals.filter((meal) => meal.location !== selectedArea);
      filteredMeals = [...matchingMeals, ...remainingMeals];
    }

    if (selectedSort === "Popularity") {
      filteredMeals = filteredMeals.sort((a, b) => b.rating - a.rating);
    } else if (selectedSort === "Alphabetically") {
      filteredMeals = filteredMeals.sort((a, b) => a.strMeal.localeCompare(b.strMeal));
    }

    return filteredMeals;
  };

  const filteredMeals = getFilteredMeals();
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentMeals = filteredMeals.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="bg-gray-100 py-3">
      <div className="container mx-auto lg:px-48 md:px-12 px-4">
        <Header title="Restaurants with online food delivery in Pune" />
        <div className="flex flex-wrap items-center gap-3">
          <FilterDropdown
            show={showFilterDropdown}
            toggle={toggleFilterDropdown}
            locations={puneLocations}
            selectedArea={selectedArea}
            onSelect={handleAreaSelection}
            onClear={clearFilters}
          />
          <SortDropdown
            show={showSortDropdown}
            toggle={toggleSortDropdown}
            selectedSort={selectedSort}
            onSelect={handleSortSelection}
            onClear={clearFilters}
          />
          {/* Additional Filter Buttons */}
          {[
            "Fast Delivery",
            "New on Swiggy",
            "Ratings 4.0+",
            "Pure Veg",
            "Offers",
            "Rs 300 - Rs 600",
            "Less than Rs 300",
          ].map((text, index) => (
            <button
              key={index}
              className="bg-gray-200 text-gray-800 text-sm px-1 py-1 rounded-full hover:bg-gray-300 md:px-3"
            >
              {text}
            </button>
          ))}
        </div>
        <div className="mt-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Meals:</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {currentMeals.map((meal, index) => (
              <div
                key={index}
                onClick={() => setExpandedCardIndex(expandedCardIndex === index ? null : index)}
                className={`relative bg-white p-4 rounded-xl shadow-md cursor-pointer transition-all duration-300 ${expandedCardIndex === index ? "max-h-100" : "max-h-72"
                  } ${expandedCardIndex === index ? "" : "hover:scale-90"}`}
              >
                {/* Food Image */}
                <img
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                  className="w-full h-32 object-cover rounded-lg mb-4"
                />

                {/* Basic Details */}
                <h4 className="text-sm font-semibold text-gray-700">{meal.strMeal}</h4>
                <p className="text-xs text-gray-500">Location: {meal.location}</p>
                <p className="text-xs text-gray-500">Rating: ⭐ {meal.rating}</p>

                {/* Additional Details */}
                {expandedCardIndex === index && (
                  <div className="text-xs text-gray-500 mt-2">
                    <p className="text-gray-800 font-semibold">Price: ₹{meal.price}</p>
                    <p className="text-gray-800">Size: {meal.size}</p>
                    <p>{meal.description}</p>
                  </div>
                )}
              </div>
            ))}

          </div>
          <Pagination
            totalItems={filteredMeals.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default Filters;
