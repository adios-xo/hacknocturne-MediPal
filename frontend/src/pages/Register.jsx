import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Shield } from "lucide-react";

function RegisterSelection() {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState("patient"); // Default illustration is patient

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <header className="border-b bg-white shadow-sm">
        <div className="container flex h-20 items-center px-6">
          {/* Brand Name with Clickable Logo */}
          <div
            className="flex items-center gap-2 font-bold text-2xl cursor-pointer"
            onClick={() => navigate("/")}
          >
            <Shield className="h-8 w-8 text-indigo-600" />
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              MediPal
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 justify-center items-center">
        <div className="bg-white p-10 rounded-lg shadow-lg flex flex-col md:flex-row gap-8 w-full max-w-4xl min-h-[450px]">
          
          {/* Illustration (Left Side) */}
          <div className="w-72 hidden md:flex justify-center items-center">
            <img
              src={hovered === "doctor" ? "/illustrations/doctorrr.svg" : "/illustrations/patients.svg"}
              alt={hovered === "doctor" ? "Doctor" : "Patient"}
              className="w-full transition-all duration-300"
            />
          </div>

          {/* Selection Cards (Right Side) */}
          <div className="flex flex-col gap-6 flex-1 justify-center">
            <div
              className="p-8 border rounded-lg shadow-md hover:shadow-lg cursor-pointer transition-all min-h-[150px] flex flex-col justify-center"
              onMouseEnter={() => setHovered("patient")}
              onClick={() => navigate("/registeruser")}
            >
              <h2 className="text-2xl font-bold text-indigo-600">Register as a Patient</h2>
              <p className="text-gray-500 mt-2">Access healthcare and connect with doctors.</p>
            </div>

            <div
              className="p-8 border rounded-lg shadow-md hover:shadow-lg cursor-pointer transition-all min-h-[150px] flex flex-col justify-center"
              onMouseEnter={() => setHovered("doctor")}
              onClick={() => navigate("/registerdoctor")}
            >
              <h2 className="text-2xl font-bold text-purple-600">Register as a Doctor</h2>
              <p className="text-gray-500 mt-2">Join our network and consult with patients.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterSelection;
