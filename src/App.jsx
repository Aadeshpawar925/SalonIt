import React, { useState , useLocation} from "react";
import { Route, Routes } from "react-router";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Home from "./Components/Home"; 
import AboutUs from "./Components/AboutUs";
import Services from "./Components/Services";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import DiscoverSalons from "./Components/DiscoverSalons";
import SalonDetails from "./Components/SalonDetails";
import Booking from "./Components/Booking";
import PaymentComponent from "./Components/PaymentComponent";
import PaymentSuccessPage from "./Components/PaymentSuccessPage";
import AdminDashboard from "./Components/AdminDashboard";
import SalonDashboard from "./Components/SalonDashboard";
import CustomerDashboard from "./Components/CustomerDashboard";
import ManageSalons from "./Components/ManageSalons";
import ManageUsers from "./Components/ManageUsers";

function App() {
  const [selectedServices, setSelectedServices] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [payId , setPayId] = useState("")

  const handleLogin = () => {
    localStorage.setItem("userLoggedIn", "true"); // Ensure login persists across refresh
  };

  return (
    <>
      <Header /> {/* Displayed on all pages */}
      <Routes>
        {/* Home Page */}
        <Route path="/" element={<Home />} />

        {/* About Us */}
        <Route path="/about-us" element={<AboutUs />} />

        {/* Services Overview */}
        <Route path="/services" element={<Services />} />

        {/* Authentication Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Salon Discovery and Details */}
        <Route path="/discover-salons" element={<DiscoverSalons />} /> {/* Lists salons */}
        <Route
          path="/salons/:id"
          element={
            <SalonDetails
              setSelectedServices={setSelectedServices}
              setTotalPrice={setTotalPrice}
            />
          }
        />

        {/* Booking Page - Protected */}
        <Route
          path="/booking"
          element={
            localStorage.getItem("userLoggedIn") === "true" ? (
              <Booking selectedServices={selectedServices} totalPrice={totalPrice} />
            ) : (
              <Login />
            )
          }
        />
        <Route path="/payment" element={<PaymentComponent setPaymentId= {setPayId} />} />

         <Route path="/payment-success" element={<PaymentSuccessPage paymentId={payId} />} />
         <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/salon-dashboard" element={<SalonDashboard />} />
        <Route path="/customer-dashboard" element={<CustomerDashboard />} />
        <Route path="/admin/manage-salons" element={ <ManageSalons /> } />
        <Route path="/admin/manage-users" element={ <ManageUsers />  } />
      </Routes>
      <Footer /> {/* Displayed on all pages */}
    </>
  );
}

export default App;
