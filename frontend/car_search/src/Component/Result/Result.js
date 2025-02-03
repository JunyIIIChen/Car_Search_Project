import React, { useEffect, useState } from "react";
import "./Result.css";

export default function Result({ searchCriteria }) {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCar, setSelectedCar] = useState(null);

  useEffect(() => {
    const fetchCars = async () => {
      setLoading(true);
      setError(null);

      try {
        const queryParams = new URLSearchParams(searchCriteria).toString();
        const url = `http://localhost:3002/car${queryParams ? `?${queryParams}` : ""}`;
        console.log(url);

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch cars');
        }

        const data = await response.json();
        console.log(data);
        setCars(data);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching cars:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, [searchCriteria]);

  const handleMoreClick = (car) => {
    setSelectedCar(car);
  };

  const renderCarDetails = () => {
    if (!selectedCar) return null;

    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <button className="close-button" onClick={() => setSelectedCar(null)}>×</button>
          <h3 className="modal-title">Car Details</h3>
          <div className="modal-body">
            {Object.entries(selectedCar).map(([key, value]) => (
              <div key={key} className="modal-detail">
                <strong>{key.replace(/_/g, " ")}:</strong>
                <span>{value?.toString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return <div className="loading">Loading cars...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  if (cars.length === 0) {
    return <div className="no-results">No cars found matching your criteria</div>;
  }

  return (
    <div className="result-container">
      <h2 className="text-xl font-bold mb-4">Car List</h2>
      <table className="result-table w-full border-collapse">
        <thead>
          <tr>
            <th className="border p-2">Make</th>
            <th className="border p-2">Model</th>
            <th className="border p-2">Year</th>
            <th className="border p-2">Description</th>
            <th className="border p-2">Odometer (km)</th>
            <th className="border p-2">Vehicle Condition</th>
            <th className="border p-2">Sale Location</th>
            <th className="border p-2">Sale Category</th>
            <th className="border p-2">Salvage Vehicle</th>
            <th className="border p-2">Sale Date</th>
            <th className="border p-2">Sale Price</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {cars.map((car, index) => (
            <tr key={index}>
              <td className="border p-2">{car.make}</td>
              <td className="border p-2">{car.model}</td>
              <td className="border p-2">{car.year}</td>
              <td className="border p-2">{car.description}</td>
              <td className="border p-2">{car.odometer}</td>
              <td className="border p-2">{car.car_condition}</td>
              <td className="border p-2">{car.state}</td>
              <td className="border p-2">{car.sales_category}</td>
              <td className="border p-2">{car.salvage_vehicle ? "Yes" : "No"}</td>
              <td className="border p-2">{car.sale_date}</td>
              <td className="border p-2">{car.sale_price}</td>
              <td className="border p-2">
                <button 
                  onClick={() => handleMoreClick(car)}
                  className="bg-blue-500 text-white px-2 py-1 rounded"
                >
                  More
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {renderCarDetails()}
    </div>
  );
}
