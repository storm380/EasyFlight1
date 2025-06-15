import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { FiHome, FiPlusCircle, FiList, FiSettings, FiLogOut, FiX, FiEdit2, FiTrash2 } from "react-icons/fi";
import { DataGrid } from "@mui/x-data-grid";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button as MuiButton
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { styled } from "@mui/system";
import "../styles/Dashboard.css";
import { Home } from "lucide-react";


const StyledButton = styled(MuiButton)({
  textTransform: 'none',
  fontWeight: 600,
  borderRadius: '8px',
  padding: '8px 16px',
  boxShadow: 'none',
  '&:hover': {
    boxShadow: 'none',
  },
});
  // useEffect(()=> {
  //   document.title='dashboard';
  // },[])

const Dashboard = () => {
  const [flights, setFlights] = useState([]);
  const [formData, setFormData] = useState({
    departure: "",
    destination: "",
    date: null,
    time: null,
    price: "",
    availableSeats: "",
    image: ""
  });
  const [editingId, setEditingId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeSection, setActiveSection] = useState("flights");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [flightToDelete, setFlightToDelete] = useState(null);
  const navigate = useNavigate();

  
  const theme = createTheme({
    palette: {
      primary: {
        main: '#52E9A0',
      },
      secondary: {
        main: '#3a0ca3',
      },
      error: {
        main: '#ef4444',
      },
    },
    typography: {
      fontFamily: "'Saira', sans-serif",
    },
  });

  
  const fetchFlights = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/flights/all", {
        credentials: "include",
      });
      const data = await res.json();
      setFlights(data.data);
    } catch (err) {
      toast.error("Failed to fetch flights");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchFlights();
  }, []);

  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, date });
  };

  const handleTimeChange = (time) => {
    setFormData({ ...formData, time });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const url = editingId 
        ? `http://localhost:5000/api/flights/${editingId}`
        : "http://localhost:5000/api/flights";
      
      const method = editingId ? "PUT" : "POST";

      const formattedData = {
        ...formData,
        date: formData.date ? new Date(formData.date.setHours(0, 0, 0, 0)).toISOString() : null,

        time: formData.time?.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
      };

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formattedData),
        credentials: "include"
      });

      if (!res.ok) throw new Error("Operation failed");

      toast.success(editingId ? "Flight updated successfully!" : "Flight added successfully!");
      fetchFlights();
      resetForm();
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  
  const handleEdit = (flight) => {
    setFormData({
      departure: flight.departure,
      destination: flight.destination,
      date: new Date(flight.date),
      time: new Date(`1970-01-01T${flight.time}`),
      price: flight.price,
      availableSeats: flight.availableSeats,
      image: flight.image
    });
    setEditingId(flight._id);
    setActiveSection("add-flight");
  };

  const confirmDelete = (flight) => {
    setFlightToDelete(flight);
    setDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    try {
      await fetch(`http://localhost:5000/api/flights/${flightToDelete._id}`, {
        method: "DELETE",
        credentials: "include"
      });
      toast.success("Flight deleted successfully!");
      fetchFlights();
    } catch (err) {
      toast.error("Failed to delete flight");
    } finally {
      setDeleteDialogOpen(false);
    }
  };

  const resetForm = () => {
    setFormData({
      departure: "",
      destination: "",
      date: null,
      time: null,
      price: "",
      availableSeats: "",
      image: ""
    });
    setEditingId(null);
  };

 
  const columns = [
    { field: 'departure', headerName: 'Departure', flex: 1 },
    { field: 'destination', headerName: 'Destination', flex: 1 },
    { 
      field: 'date', 
      headerName: 'Date', 
      flex: 1,
      valueFormatter: (params) => new Date(params.value).toLocaleDateString()
    },
    { field: 'time', headerName: 'Time', flex: 1 },
    { field: 'price', headerName: 'Price ($)', flex: 1 },
    { field: 'availableSeats', headerName: 'Seats', flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: (params) => (
        <div className="flex gap-2">
          <StyledButton
            variant="outlined"
            color="primary"
            startIcon={<FiEdit2 />}
            onClick={() => handleEdit(params.row)}
          >
            Edit
          </StyledButton>
          <StyledButton
            variant="outlined"
            color="error"
            startIcon={<FiTrash2 />}
            onClick={() => confirmDelete(params.row)}
          >
            Delete
          </StyledButton>
        </div>
      ),
    },
  ];

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <div className="dashboard-container">
          {/* Sidebar */}
          <motion.div 
            className="dashboard-sidebar"
            initial={{ x: -100 }}
            animate={{ x: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            <div className="sidebar-header">
              <h2>Flight Admin</h2>
            </div>
            <nav className="sidebar-nav">
              <button 
                className={`nav-item ${activeSection === "flights" ? "active" : ""}`}
                onClick={() => setActiveSection("flights")}
              >
                <FiList className="nav-icon" />
                <span>Flight List</span>
              </button>
              <button 
                className={`nav-item ${activeSection === "add-flight" ? "active" : ""}`}
                onClick={() => {
                  setActiveSection("add-flight");
                  resetForm();
                }}
              >
                <FiPlusCircle className="nav-icon" />
                <span>{editingId ? "Edit Flight" : "Add Flight"}</span>
              </button>
              <div className="nav-divider"></div>
              <button className="nav-item">
                <FiSettings className="nav-icon" />
                <span>Settings</span>
              </button>
              <button 
                className="nav-item logout"
                onClick={() => navigate("/")}
              >
                <Home className="nav-icon" />
                <span>Go home</span>
              </button>
            </nav>
          </motion.div>

          {/* Main Content */}
          <div className="dashboard-main">
            {/* Add/Edit Flight Section */}
            <AnimatePresence>
              {activeSection === "add-flight" && (
                <motion.section
                  className="flight-form-section"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="section-header">
                    <h2>{editingId ? "Edit Flight" : "Add New Flight"}</h2>
                    <button 
                      className="close-btn"
                      onClick={() => setActiveSection("flights")}
                    >
                      <FiX />
                    </button>
                  </div>
                  
                  <form onSubmit={handleSubmit} className="flight-form">
                    <div className="form-grid">
                      <div className="form-group">
                        <label>Departure City</label>
                        <input
                          name="departure"
                          value={formData.departure}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label>Destination City</label>
                        <input
                          name="destination"
                          value={formData.destination}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label>Date</label>
                        <DatePicker
                          value={formData.date}
                          onChange={handleDateChange}
                          renderInput={(params) => <input {...params} />}
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label>Time</label>
                        <TimePicker
                          value={formData.time}
                          onChange={handleTimeChange}
                          renderInput={(params) => <input {...params} />}
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label>Price ($)</label>
                        <input
                          type="number"
                          name="price"
                          value={formData.price}
                          onChange={handleChange}
                          min="0"
                          step="0.01"
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label>Available Seats</label>
                        <input
                          type="number"
                          name="availableSeats"
                          value={formData.availableSeats}
                          onChange={handleChange}
                          min="1"
                          required
                        />
                      </div>

                      <div className="form-group full-width">
                        <label>Image URL</label>
                        <input
                          name="image"
                          value={formData.image}
                          onChange={handleChange}
                          required
                        />
                        {formData.image && (
                          <div className="image-preview">
                            <img src={formData.image} alt="Flight preview" />
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="form-actions">
                      <StyledButton
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={isLoading}
                        startIcon={isLoading ? null : <FiPlusCircle />}
                      >
                        {isLoading ? (
                          <span className="spinner"></span>
                        ) : editingId ? (
                          "Update Flight"
                        ) : (
                          "Add Flight"
                        )}
                      </StyledButton>
                      {editingId && (
                        <StyledButton
                          type="button"
                          onClick={resetForm}
                          variant="outlined"
                          color="secondary"
                        >
                          Cancel
                        </StyledButton>
                      )}
                    </div>
                  </form>
                </motion.section>
              )}
            </AnimatePresence>

            {/* Flight List Section */}
            {activeSection === "flights" && (
              <motion.section
                className="flights-list-section"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="section-header">
                  <h2>Flight Management</h2>
                  <StyledButton
                    variant="contained"
                    color="primary"
                    startIcon={<FiPlusCircle />}
                    onClick={() => setActiveSection("add-flight")}
                  >
                    Add New Flight
                  </StyledButton>
                </div>

                <div className="data-grid-container">
                  <DataGrid
                    rows={flights}
                    columns={columns}
                    getRowId={(row) => row._id}
                    pageSize={10}
                    rowsPerPageOptions={[10, 25, 50]}
                    loading={isLoading}
                    autoHeight
                    disableSelectionOnClick
                  />
                </div>
              </motion.section>
            )}
          </div>

          {/* Delete Confirmation Dialog */}
          <Dialog
            open={deleteDialogOpen}
            onClose={() => setDeleteDialogOpen(false)}
          >
            <DialogTitle>Confirm Delete</DialogTitle>
            <DialogContent>
              Are you sure you want to delete the flight from {flightToDelete?.departure} to {flightToDelete?.destination}?
            </DialogContent>
            <DialogActions>
              <StyledButton onClick={() => setDeleteDialogOpen(false)}>
                Cancel
              </StyledButton>
              <StyledButton 
                onClick={handleDelete}
                color="error"
                variant="contained"
              >
                Delete
              </StyledButton>
            </DialogActions>
          </Dialog>
        </div>
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default Dashboard;