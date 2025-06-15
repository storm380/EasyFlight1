import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import ErrorBoundary from "./components/common/ErrorBoundary";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import Home from "./components/Home";
import Search from "./components/Search";
import ResultOfSearching from "./components/ResultOfSearching";
import BookFlight from "./components/booking/BookFlight";
import Contact from "./components/Contact";
import Register from "./components/auth/Register";
import Logout from "./components/auth/Logout";
import Login from "./components/auth/Login";
import ProtectedRoute from "./middleware/protectedroute";
import Dashboard from "./components/dashboard";
import CarRental from "./components/car-rental/CarRental";
import CarOffers from "./components/car-rental/CarOffers";
import Hotels from "./components/hotels/Hotels";
import "./App.css";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const [results, setResults] = useState([]);

  return (
    <Router>
      <ErrorBoundary>
        <div className="app-container">
          <Header />
          <main className="main-content">
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <Home >
                      <Search setResults={setResults} />
                      <ResultOfSearching results={results} />
                    </Home>
                  </>
                }
              />

              <Route
                path="/book-flight"
                element={
                  <ProtectedRoute>
                    <BookFlight />
                  </ProtectedRoute>
                }
              />

              <Route path="/contact" element={<Contact />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/logout" element={<Logout />} />

              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute allow="admin">
                    <Dashboard />
                  </ProtectedRoute>
                }
              />

              <Route path="/car-rental" element={<CarRental />} />
              <Route path="/car-rental/offers/:carId" element={<CarOffers />} />
              <Route path="/hotels" element={<Hotels />} />
            </Routes>
          </main>
          <Footer />
          <link rel="icon" href="%PUBLIC_URL%/logo3.png" type="image/png" />
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </div>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#363636',
              color: '#fff',
            },
          }}
        />
      </ErrorBoundary>
    </Router>
  );
};

export default App;
