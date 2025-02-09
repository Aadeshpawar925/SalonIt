import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./DiscoverSalon.css";

export default function DiscoverSalons() {
  const [salons, setSalons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSalons = async () => {
      try {
        const response = await axios.get("https://localhost:44371/api/salons");
        setSalons(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSalons();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching salons: {error.message}</div>;
  }

  return (
    <div className="discover-salons">
      <h1>Discover Salons</h1>
      <div className="salon-list">
        {salons.map((salon) => (
          <div className="card-hover" key={salon.salonId}>
            <img
              src="https://plus.unsplash.com/premium_photo-1669675936121-6d3d42244ab5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c2Fsb258ZW58MHx8MHx8fDA%3D"
              alt={`${salon.name}`}
            />
            <div className="card-hover__content">
              <h3 className="card-hover__title">{salon.name}</h3>
              <p className="card-hover__text">
                Address: {salon.address} <br />
                Contact: {salon.contact}
              </p>
              <Link to={`/salons/${salon.salonId}`} className="card-hover__link">
                <span>View Details</span>
                <svg
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}