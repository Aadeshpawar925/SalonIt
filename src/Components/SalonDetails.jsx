
import React, {useState} from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./SalonDetails.css"; // Add appropriate CSS for styling


  
  // Hardcoded data for salons and their services
  const salonDetailsData = [
    {
      id: 1,
      name: "Glam Studio",
      intro: "Glam Studio is your go-to destination for the trendiest hairstyles and luxurious beauty treatments.",
      services: [
        { name: "Haircut", for: "Men", price: "$25" },
        { name: "Haircut", for: "Women", price: "$35" },
        { name: "Facial", for: "Women", price: "$50" },
        { name: "Beard Trim", for: "Men", price: "$15" },
      ],
    },
    {
      id: 2,
      name: "Elite Beauty",
      intro: "Elite Beauty offers premium beauty services with a touch of elegance and professionalism.",
      services: [
        { name: "Haircut", for: "Men", price: "$20" },
        { name: "Haircut", for: "Women", price: "$40" },
        { name: "Manicure", for: "Women", price: "$30" },
        { name: "Pedicure", for: "Women", price: "$35" },
      ],
    },
    {
      id: 3,
      name: "Style Hub",
      intro: "At Style Hub, we believe in transforming your look to match your unique personality.",
      services: [
        { name: "Hair Spa", for: "Women", price: "$60" },
        { name: "Hair Spa", for: "Men", price: "$50" },
        { name: "Hair Color", for: "Women", price: "$70" },
        { name: "Hair Color", for: "Men", price: "$50" },
      ],
    },
    {
      id: 4,
      name: "Urban Chic",
      intro: "Urban Chic redefines beauty with its modern approach to hairstyling and grooming.",
      services: [
        { name: "Haircut", for: "Men", price: "$30" },
        { name: "Haircut", for: "Women", price: "$45" },
        { name: "Waxing", for: "Women", price: "$25" },
        { name: "Shaving", for: "Men", price: "$10" },
      ],
    },
    {
      id: 5,
      name: "Royal Retreat",
      intro: "Experience the royal touch at Royal Retreat, where elegance meets expertise.",
      services: [
        { name: "Hair Styling", for: "Women", price: "$90" },
        { name: "Hair Styling", for: "Men", price: "$70" },
        { name: "Massage", for: "Women", price: "$80" },
        { name: "Massage", for: "Men", price: "$75" },
      ],
    },
    {
      id: 6,
      name: "Blissful Beauty",
      intro: "Blissful Beauty ensures you leave with a smile, offering a wide range of beauty services.",
      services: [
        { name: "Haircut", for: "Men", price: "$28" },
        { name: "Haircut", for: "Women", price: "$38" },
        { name: "Facial", for: "Women", price: "$55" },
        { name: "Beard Grooming", for: "Men", price: "$18" },
      ],
    },
    {
      id: 7,
      name: "The Hair Affair",
      intro: "The Hair Affair specializes in contemporary styles for modern individuals.",
      services: [
        { name: "Haircut", for: "Men", price: "$35" },
        { name: "Haircut", for: "Women", price: "$45" },
        { name: "Blow Dry", for: "Women", price: "$25" },
        { name: "Beard Trim", for: "Men", price: "$12" },
      ],
    },
    {
      id: 8,
      name: "Charm & Shine",
      intro: "Charm & Shine offers the perfect combination of style and comfort for all your grooming needs.",
      services: [
        { name: "Manicure", for: "Women", price: "$25" },
        { name: "Pedicure", for: "Women", price: "$30" },
        { name: "Hair Wash", for: "Men", price: "$15" },
        { name: "Hair Wash", for: "Women", price: "$20" },
      ],
    },
    {
      id: 9,
      name: "Trendy Cuts",
      intro: "Trendy Cuts is known for bold and stylish haircuts that make a statement.",
      services: [
        { name: "Haircut", for: "Men", price: "$30" },
        { name: "Haircut", for: "Women", price: "$40" },
        { name: "Hair Highlights", for: "Women", price: "$70" },
        { name: "Hair Highlights", for: "Men", price: "$50" },
      ],
    },
    {
      id: 10,
      name: "Glow & Go",
      intro: "Glow & Go provides top-notch beauty services that bring out your natural glow.",
      services: [
        { name: "Facial", for: "Women", price: "$50" },
        { name: "Facial", for: "Men", price: "$40" },
        { name: "Waxing", for: "Women", price: "$30" },
        { name: "Beard Styling", for: "Men", price: "$20" },
      ],
    },
    {
      id: 11,
      name: "Heavenly Touch",
      intro: "Feel rejuvenated with the premium services offered at Heavenly Touch.",
      services: [
        { name: "Massage", for: "Women", price: "$75" },
        { name: "Massage", for: "Men", price: "$70" },
        { name: "Hair Spa", for: "Women", price: "$65" },
        { name: "Hair Spa", for: "Men", price: "$55" },
      ],
    },
    {
      id: 12,
      name: "Luxe Lounge",
      intro: "Luxe Lounge offers a luxurious experience to pamper yourself.",
      services: [
        { name: "Hair Styling", for: "Women", price: "$100" },
        { name: "Hair Styling", for: "Men", price: "$80" },
        { name: "Manicure", for: "Women", price: "$40" },
        { name: "Pedicure", for: "Women", price: "$45" },
      ],
    },
    {
      id: 13,
      name: "The Beauty Spot",
      intro: "At The Beauty Spot, we care for your beauty needs with expertise and warmth.",
      services: [
        { name: "Facial", for: "Women", price: "$45" },
        { name: "Facial", for: "Men", price: "$40" },
        { name: "Waxing", for: "Women", price: "$25" },
        { name: "Beard Trim", for: "Men", price: "$10" },
      ],
    },
    {
      id: 14,
      name: "Polished & Perfect",
      intro: "Polished & Perfect guarantees precision in every service we offer.",
      services: [
        { name: "Manicure", for: "Women", price: "$35" },
        { name: "Pedicure", for: "Women", price: "$40" },
        { name: "Haircut", for: "Men", price: "$30" },
        { name: "Haircut", for: "Women", price: "$45" },
      ],
    },
    {
      id: 15,
      name: "Lavish Locks",
      intro: "Lavish Locks specializes in hairstyling that lets you shine in every moment.",
      services: [
        { name: "Hair Styling", for: "Women", price: "$85" },
        { name: "Hair Styling", for: "Men", price: "$70" },
        { name: "Hair Color", for: "Women", price: "$75" },
        { name: "Hair Color", for: "Men", price: "$65" },
      ],
    },
    {
      id: 16,
      name: "Shimmer Spa",
      intro: "Shimmer Spa offers rejuvenating treatments to refresh your mind and body.",
      services: [
        { name: "Massage", for: "Women", price: "$90" },
        { name: "Massage", for: "Men", price: "$85" },
        { name: "Facial", for: "Women", price: "$50" },
        { name: "Facial", for: "Men", price: "$45" },
      ],
    },
    {
      id: 17,
      name: "The Hair Lounge",
      intro: "The Hair Lounge is your ultimate hairstyling and grooming destination.",
      services: [
        { name: "Haircut", for: "Men", price: "$35" },
        { name: "Haircut", for: "Women", price: "$50" },
        { name: "Beard Styling", for: "Men", price: "$20" },
        { name: "Hair Spa", for: "Women", price: "$70" },
      ],
    },
    {
      id: 18,
      name: "Radiant Beauty",
      intro: "Radiant Beauty focuses on enhancing your natural charm with expert care.",
      services: [
        { name: "Facial", for: "Women", price: "$55" },
        { name: "Facial", for: "Men", price: "$50" },
        { name: "Hair Color", for: "Women", price: "$85" },
        { name: "Hair Color", for: "Men", price: "$65" },
      ],
    },
    {
      id: 19,
      name: "Elegance Spa",
      intro: "Elegance Spa combines tranquility and style for the perfect beauty experience.",
      services: [
        { name: "Massage", for: "Women", price: "$95" },
        { name: "Massage", for: "Men", price: "$90" },
        { name: "Hair Styling", for: "Women", price: "$100" },
        { name: "Hair Styling", for: "Men", price: "$85" },
      ],
    },
    {
      id: 20,
      name: "The Beauty Haven",
      intro: "The Beauty Haven brings you a perfect blend of tranquility and style in Williamsburg.",
      services: [
        { name: "Massage", for: "Women", price: "$80" },
        { name: "Massage", for: "Men", price: "$75" },
        { name: "Hair Styling", for: "Women", price: "$90" },
        { name: "Hair Styling", for: "Men", price: "$70" },
      ],
    },
  ];
  

  
  


  
 
  
  export default function SalonDetails({ setSelectedServices, setTotalPrice }) {
    const { id } = useParams(); // Fetch salon ID from URL
    const navigate = useNavigate();
  
    const salon = salonDetailsData.find((salon) => salon.id === parseInt(id, 10));
  
    const [localSelectedServices, setLocalSelectedServices] = useState([]);
  
    // Toggle service selection
    const handleServiceSelect = (service) => {
      setLocalSelectedServices((prevSelected) => {
        const isAlreadySelected = prevSelected.some((s) => s.name === service.name && s.for === service.for); // Compare by name and category (for)
        if (isAlreadySelected) {
          return prevSelected.filter((s) => s.name !== service.name || s.for !== service.for); // Remove service if already selected
        }
        return [...prevSelected, service]; // Add service to selected list
      });
    };
  
    // Handle the booking process
    const handleBookNow = () => {
      const isLoggedIn = localStorage.getItem("userLoggedIn") === "true"; // Check login status using localStorage
  
      if (localSelectedServices.length === 0) {
        alert("Please select at least one service.");
        return;
      }
  
      const totalPrice = localSelectedServices.reduce((sum, service) => sum + parseFloat(service.price.slice(1)), 0); // Remove "$" and sum the prices
  
      setSelectedServices(localSelectedServices); // Pass selected services to parent state
      setTotalPrice(totalPrice); // Pass total price to parent state
  
      if (isLoggedIn) {
        navigate("/booking", {
          state: { selectedServices: localSelectedServices, totalPrice }, // Pass services to the booking page
        });
      } else {
        alert("Please log in to proceed with the booking.");
        navigate("/login"); // Redirect to login page if not logged in
      }
    };
  
    // Render if the salon is not found
    if (!salon) {
      return (
        <div className="salon-details">
          <h1>Salon Not Found</h1>
          <button className="back-button" onClick={() => navigate(-1)}>
            Go Back
          </button>
        </div>
      );
    }
  
    return (
      <div className="salon-details">
        <h1>{salon.name}</h1>
        <p>{salon.intro}</p>
  
        <h2>Services:</h2>
        <div className="services-list">
          {salon.services.map((service, index) => (
            <div className="service-card" key={index}>
              <div className="card">
                <div className="card-text">
                  <p className="card-meal-type">{service.for}</p>
                  <h2 className="card-title">{service.name}</h2>
                  <p className="card-body">{service.description}</p>
                </div>
                <div className="card-price">{service.price}</div>
              </div>
              <div className="service-select">
                <input
                  type="checkbox"
                  id={`service-${index}`} // Ensure unique checkbox ID per service
                  checked={localSelectedServices.some(
                    (s) => s.name === service.name && s.for === service.for // Check if the service is selected
                  )}
                  onChange={() => handleServiceSelect(service)} // Toggle selection
                />
                <label htmlFor={`service-${index}`}>Select</label>
              </div>
            </div>
          ))}
        </div>
  
        <button className="btn-book-now" onClick={handleBookNow}>
          Book Now
        </button>
      </div>
    );
  }
  