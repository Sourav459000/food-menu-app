import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Filters from '../components/Filters';
import Header from '../components/Header';
import Footer from '../components/Footer';

const HomePage = () => {
  // State for meals
  const [meals, setMeals] = useState([]);

  // Fetch meals data from API and randomize location
  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await axios.get('https://www.themealdb.com/api/json/v1/1/filter.php?a=indian');
        const mealsData = response.data.meals;

        // List of Pune locations (mock locations)
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

        // Randomize locations for meals
        const mealsWithLocation = mealsData.map((meal) => ({
          ...meal,
          location: puneLocations[Math.floor(Math.random() * puneLocations.length)], // Random location
        }));

        setMeals(mealsWithLocation);
      } catch (error) {
        console.error("Error fetching meals:", error);
      }
    };

    fetchMeals();
  }, []);

  return (
    <div>
      <Header/>
      
      <div className="container mx-auto ">
        {/* Filters Section */}
        <Filters />
      </div>

      <Footer />
    </div>
  );
};

export default HomePage;
