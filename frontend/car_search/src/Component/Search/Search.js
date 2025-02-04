import React, { useState } from "react";
import "./Search.css";

export default function Search({ onSearch }) {
  const [searchCriteria, setSearchCriteria] = useState({
    make: "",
    model: "",
    year: "",
    state: "",
    car_condition: "",
    sales_category: "",
    body_type: "",
    fuel_type: "",
    engine: "",
    transmission: "",
    odometer: "",
    // sale_date: "",
    custom_date: "",
    badges: "",
    cylinders: "",
    division: "",
    drive: "",
    seats: "",
    doors: ""
  });

  const [showMoreFilters, setShowMoreFilters] = useState(false);
  const [filteredModels, setFilteredModels] = useState([]); 

  const options = {
    "make": ["Audi", "BMW", "Mercedes", "Toyota", "Ford", "Tesla", "Subaru"],
  "model": {
    "Audi": ["A3", "A4", "A5", "A6", "Q3", "Q5", "Q7", "Q8", "RS5"],
    "BMW": ["X1", "X3", "X5", "X7", "3 Series", "5 Series", "7 Series", "4 Series", "M3"],
    "Mercedes": ["C-Class", "E-Class", "S-Class", "GLC", "GLE", "GLS", "A-Class", "CLA"],
    "Toyota": ["Corolla", "Camry", "RAV4", "Highlander", "Hilux", "Land Cruiser", "Supra"],
    "Ford": ["Ranger", "Mustang", "F-150", "Explorer"],
    "Tesla": ["Model 3", "Model S", "Model X", "Model Y"],
    "Subaru": ["Outback", "Forester", "WRX", "Crosstrek"]
  },
    year: ["2015", "2016", "2017", "2018"],
    state: ["Victoria", "New South Wales", "Western Australia", "Tasmania", "Queensland", "South Australia", "Australian Capital Territory"],
    car_condition: ["New", "Used", "Certified Pre-Owned"],
    sales_category: ["Private", "Dealer"],
    body_type: ["Sedan", "Sportback", "SUV", "Truck"],
    fuel_type: ["Gasoline", "Diesel", "Electric", "Hybrid"],
    engine: ["2.0 Turbo", "3.0 V6", "4.0 V8"],
    transmission: ["Automatic", "Manual"],
    odometer: ["0-50k", "50k-100k", "100k-150k", "150k+"],
    // sale_date: ["Last Week", "Last Month", "Last Year"],
    custom_date: ["2024-02-07", "2024-01-01", "2023-12-01"],
    badges: ["Quattro", "M Performance", "AMG"],
    cylinders: ["4", "6", "8"],
    division: ["Luxury", "Sports", "Economy"],
    drive: ["FWD", "RWD", "AWD"],
    seats: ["2", "4", "5", "7"],
    doors: ["2", "4", "5"]
  };
 
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // listen to make change
    if (name === "make") {
      setFilteredModels(options.model[value] || []); // update the available model
      setSearchCriteria((prev) => ({
        ...prev,
        make: value,
        model: ""
      }));
    } else {
      setSearchCriteria((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const filteredCriteria = Object.fromEntries(
      Object.entries(searchCriteria).filter(([_, value]) => value !== "")
    );

    if (filteredCriteria.odometer) {
      const range = filteredCriteria.odometer.match(/\d+/g);
      if (range) {
        if (range.length === 2) {
          filteredCriteria.odometer_min = parseInt(range[0], 10) * 1000;
          filteredCriteria.odometer_max = parseInt(range[1], 10) * 1000;
        } else if (range.length === 1) {
          filteredCriteria.odometer_min = parseInt(range[0], 10) * 1000;
        }
      }
      delete filteredCriteria.odometer;
    }

    onSearch(filteredCriteria);
  };

  const handleReset = () => {
    setSearchCriteria({
      make: "",
      model: "",
      year: "",
      state: "",
      car_condition: "",
      sales_category: "",
      body_type: "",
      fuel_type: "",
      engine: "",
      transmission: "",
      odometer: "",
      sale_date: "",
      custom_date: "",
      badges: "",
      cylinders: "",
      division: "",
      drive: "",
      seats: "",
      doors: ""
    });
    setFilteredModels([]); // empty model 
    onSearch({});
  };

  const criteriaKeys = Object.keys(searchCriteria);
  const visibleFields = showMoreFilters ? criteriaKeys : criteriaKeys.slice(0, 8);

  const groupedFields = [];
  for (let i = 0; i < visibleFields.length; i += 4) {
    groupedFields.push(visibleFields.slice(i, i + 4));
  }

  return (
    <div className="search-container">
      <h2>Car Search</h2>
      <form onSubmit={handleSubmit}>
        <div className="search-fields">
          {groupedFields.map((row, rowIndex) => (
            <div className="search-row" key={rowIndex}>
              {row.map((key) => (
                <div className="search-field" key={key}>
                  <label>{key.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}</label>
                  <select
                    name={key}
                    value={searchCriteria[key]}
                    onChange={handleInputChange}
                    className="search-select"
                  >
                    <option value="">Select {key}</option>
                    {key === "model"
                      ? filteredModels.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))
                      : options[key] &&
                        options[key].map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                  </select>
                </div>
              ))}
            </div>
          ))}
        </div>
        {/* show more filter options */}
        <div className="button-group">
          <button type="button" className="more-filters-button" onClick={() => setShowMoreFilters(!showMoreFilters)}>
            {showMoreFilters ? "Show Less Filters" : "More Filters"}
          </button>
          <button type="button" className="reset-button" onClick={handleReset}>
            Reset Filters
          </button>
          <button type="submit" className="search-button">
            Search
          </button>
        </div>
      </form>
    </div>
  );
}
