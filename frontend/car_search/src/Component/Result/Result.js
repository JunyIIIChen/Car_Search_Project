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
          throw new Error("Failed to fetch cars");
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

  if (loading) return <div className="loading">Loading cars...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (cars.length === 0) return <div className="no-results">No cars found</div>;

  return (
    <div className="result-container">
      <h2 className="text-xl font-bold mb-4">Car List</h2>
      <div className="table-wrapper">
        <table className="result-table">
          <thead>
            <tr>
              <th>Make</th>
              <th>Model</th>
              <th>Year</th>
              <th>Description</th>
              <th>Odometer (km)</th>
              <th>Condition</th>
              <th>State</th>
              <th>Category</th>
              <th>Salvage</th>
              {/* <th>Sale Date</th> */}
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cars.map((car, index) => (
              <tr key={index}>
                <td>{car.make}</td>
                <td>{car.model}</td>
                <td>{car.year}</td>
                <td>{car.description}</td>
                <td>{car.odometer}</td>
                <td>{car.car_condition}</td>
                <td>{car.state}</td>
                <td>{car.sales_category}</td>
                <td>{car.salvage_vehicle ? "Yes" : "No"}</td>
                {/* <td>{car.sale_date}</td> */}
                <td>{car.sale_price}</td>
                <td>
                  <button onClick={() => handleMoreClick(car)} className="more-btn">More</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {renderCarDetails()}
    </div>
  );
}
