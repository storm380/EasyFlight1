// Search.jsx
import { useEffect, useRef } from "react";
import "../styles/Search.css";
 
const Search = ({ setResults }) => {
  const originRef = useRef();
  const destinationRef = useRef();
  const departDateRef = useRef();
 
  // You can later replace this with dynamic city data from an API
  const cities = ["New York", "London", "Paris", "Tokyo", "Dubai", "Sydney"];
   useEffect(()=> {
     document.title='search';
   },[])
 
  const handleSubmit = async (e) => {
    e.preventDefault();
 
    const searchData = {
      departure: originRef.current.value,
      destination: destinationRef.current.value,
      date: departDateRef.current.value,
    };
 
    console.log("Searching for flights with:", searchData);
 
    try {
      const response = await fetch(
        `http://localhost:5000/api/flights?departure=${searchData.departure}&destination=${searchData.destination}&date=${searchData.date}`
      );
 
      if (!response.ok) {
        throw new Error("Failed to fetch flights");
      }
 
      const data = await response.json();
 
      if (data.success && data.data.length > 0) {
        setResults(data.data);
      } else {
        setResults([]);
        alert("No flights found for the given criteria.");
      }
    } catch (error) {
      console.error("Error fetching flights:", error);
      alert("An error occurred while fetching flights. Please try again.");
    }
  };
 
  return (
    <div className="search-container">
      <form onSubmit={handleSubmit} className="search-form">
        <div className="row w-100">
          <div className="col-md-3">
            <label htmlFor="origin">Origin</label>
            <input
              list="cities"
              type="text"
              id="origin"
              ref={originRef}
              className="form-control"
              placeholder="Enter city"
              required
            />
          </div>
          <datalist id="cities">
            {cities.map((city, index) => (
              <option key={index} value={city} />
            ))}
          </datalist>
          <div className="col-md-3">
            <label htmlFor="destination">Destination</label>
            <input
              list="cities"
              type="text"
              id="destination"
              ref={destinationRef}
              className="form-control"
              placeholder="Enter city"
              required
            />
          </div>
          <datalist id="cities">
            {cities.map((city, index) => (
              <option key={index} value={city} />
            ))}
          </datalist>
          <div className="col-md-3">
            <label htmlFor="departDate">Depart date</label>
            <input
              type="date"
              id="departDate"
              ref={departDateRef}
              className="form-control"
              required
            />
          </div>
          <div className="col-md-3 d-flex align-items-end">
            <button type="submit" className="btn btn-orange w-100">
              Search
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
 
export default Search;
