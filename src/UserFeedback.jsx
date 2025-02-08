import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

const UserFeedback = () => {
  const [salons, setSalons] = useState([]);
  const [selectedSalon, setSelectedSalon] = useState("");
  const [rating, setRating] = useState("");
  const [feedback, setFeedback] = useState("");
  const userId = JSON.parse(localStorage.getItem("user"))?.userId;

  useEffect(() => {
    axios
      .get("https://localhost:44371/api/Salons")
      .then((response) => setSalons(response.data))
      .catch((error) => console.error("Error fetching salons:", error));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedSalon || !rating || !feedback) {
      alert("Please fill all fields");
      return;
    }

    const reviewData = {
      userId,
      salonId: parseInt(selectedSalon),
      rating: parseInt(rating),
      feedback,
      createdAt: new Date().toISOString(),
    };

    try {
      await axios.post("https://localhost:44371/api/Reviewfeedbacks", reviewData);
      alert("Feedback submitted successfully");
      setSelectedSalon("");
      setRating("");
      setFeedback("");
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert("Error submitting feedback");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ marginTop: "100px", minHeight: "60vh" }}>
      <div className="card shadow-lg border-0 p-4 rounded-4" style={{ width: "40rem", background: "#fff" }}>
        <h2 className="text-center text-primary fw-bold mb-4">Submit Your Feedback</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="salon" className="form-label fw-semibold">Select Salon</label>
            <select 
              id="salon" 
              value={selectedSalon} 
              onChange={(e) => setSelectedSalon(e.target.value)}
              className="form-select"
            >
              <option value="" disabled>Select a Salon</option>
              {salons.map((salon) => (
                <option key={salon.salonId} value={salon.salonId}>{salon.name}</option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="rating" className="form-label fw-semibold">Rating (1-5)</label>
            <input 
              type="number" 
              id="rating" 
              value={rating} 
              min="1" 
              max="5" 
              onChange={(e) => setRating(e.target.value)}
              className="form-control"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="feedback" className="form-label fw-semibold">Feedback</label>
            <textarea 
              id="feedback" 
              value={feedback} 
              onChange={(e) => setFeedback(e.target.value)}
              className="form-control"
              rows="4"
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary w-100 fw-bold py-2"
          >
            Submit Feedback
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserFeedback;
