import React, { useEffect } from "react";
import FlightCard from "./flight/FlightCard";
import "../styles/Results.css";

const ResultOfSearching = ({ results }) => {
    useEffect(()=> {
      document.title='results';
    },[])
  
  return (
    <div className="results-container">
      {results.length > 0 ? (
        <>
          <h3 className="results-count">
            {results.length} flight{results.length > 1 ? "s" : ""} found
          </h3>
          <div className="results-grid">
            {results.map((flight) => (
              <FlightCard key={flight._id} flight={flight} />
            ))}
          </div>
        </>
      ) : (
        <div className="no-results">
          <i className="fas fa-plane-slash"></i>
          <h3>No flights found</h3>
          <p>Try adjusting your search criteria</p>
        </div>
      )}
    </div>
  );
};

export default ResultOfSearching;