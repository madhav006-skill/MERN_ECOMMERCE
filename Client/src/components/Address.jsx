import React, { useContext, useState } from "react";
import AppContext from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Address = () => {
  const { shippingAddress, userAddress } = useContext(AppContext);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    phoneNumber: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }
    
    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }
    
    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }
    
    if (!formData.state.trim()) {
      newErrors.state = "State is required";
    }
    
    if (!formData.country.trim()) {
      newErrors.country = "Country is required";
    }
    
    if (!formData.pincode.trim()) {
      newErrors.pincode = "Pincode is required";
    } else if (!/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = "Pincode must be 6 digits";
    }
    
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Phone number must be 10 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await shippingAddress(
        formData.fullName,
        formData.address,
        formData.city,
        formData.state,
        formData.country,
        formData.pincode,
        formData.phoneNumber
      );

      if (result.success) {
        navigate("/checkout");
      }
    } catch (error) {
      console.error("Error adding address:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUseOldAddress = () => {
    navigate("/checkout");
  };

  const resetForm = () => {
    setFormData({
      fullName: "",
      address: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
      phoneNumber: "",
    });
    setErrors({});
  };

  return (
    <div className="container my-3 p-4">
      <div
        className="border border-warning rounded-3 p-4"
        style={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
      >
        <h1 className="text-center mb-4">Shipping Address</h1>
        
        <form onSubmit={handleSubmit} className="my-3">
          <div className="row">
            <div className="mb-3 col-md-4">
              <label htmlFor="fullName" className="form-label text-light">
                Full Name *
              </label>
              <input
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                type="text"
                className={`form-control bg-dark text-light ${
                  errors.fullName ? "border-danger" : ""
                }`}
                id="fullName"
                placeholder="Enter your full name"
              />
              {errors.fullName && (
                <div className="text-danger small mt-1">{errors.fullName}</div>
              )}
            </div>
            
            <div className="mb-3 col-md-4">
              <label htmlFor="country" className="form-label text-light">
                Country *
              </label>
              <input
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                type="text"
                className={`form-control bg-dark text-light ${
                  errors.country ? "border-danger" : ""
                }`}
                id="country"
                placeholder="Enter country"
              />
              {errors.country && (
                <div className="text-danger small mt-1">{errors.country}</div>
              )}
            </div>
            
            <div className="mb-3 col-md-4">
              <label htmlFor="state" className="form-label text-light">
                State *
              </label>
              <input
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                type="text"
                className={`form-control bg-dark text-light ${
                  errors.state ? "border-danger" : ""
                }`}
                id="state"
                placeholder="Enter state"
              />
              {errors.state && (
                <div className="text-danger small mt-1">{errors.state}</div>
              )}
            </div>
          </div>

          <div className="row">
            <div className="mb-3 col-md-4">
              <label htmlFor="city" className="form-label text-light">
                City *
              </label>
              <input
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                type="text"
                className={`form-control bg-dark text-light ${
                  errors.city ? "border-danger" : ""
                }`}
                id="city"
                placeholder="Enter city"
              />
              {errors.city && (
                <div className="text-danger small mt-1">{errors.city}</div>
              )}
            </div>
            
            <div className="mb-3 col-md-4">
              <label htmlFor="pincode" className="form-label text-light">
                Pincode *
              </label>
              <input
                name="pincode"
                value={formData.pincode}
                onChange={handleInputChange}
                type="number"
                className={`form-control bg-dark text-light ${
                  errors.pincode ? "border-danger" : ""
                }`}
                id="pincode"
                placeholder="Enter 6-digit pincode"
                maxLength="6"
              />
              {errors.pincode && (
                <div className="text-danger small mt-1">{errors.pincode}</div>
              )}
            </div>
            
            <div className="mb-3 col-md-4">
              <label htmlFor="phoneNumber" className="form-label text-light">
                Phone Number *
              </label>
              <input
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                type="tel"
                className={`form-control bg-dark text-light ${
                  errors.phoneNumber ? "border-danger" : ""
                }`}
                id="phoneNumber"
                placeholder="Enter 10-digit number"
                maxLength="10"
              />
              {errors.phoneNumber && (
                <div className="text-danger small mt-1">{errors.phoneNumber}</div>
              )}
            </div>
          </div>

          <div className="row">
            <div className="mb-3">
              <label htmlFor="address" className="form-label text-light">
                Address/Nearby *
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className={`form-control bg-dark text-light ${
                  errors.address ? "border-danger" : ""
                }`}
                id="address"
                rows="3"
                placeholder="Enter your complete address"
              />
              {errors.address && (
                <div className="text-danger small mt-1">{errors.address}</div>
              )}
            </div>
          </div>

          <div className="d-flex justify-content-center gap-3 my-4">
            <button 
              type="submit" 
              className="btn btn-primary px-4"
              disabled={isSubmitting}
              style={{ fontWeight: "bold" }}
            >
              {isSubmitting ? "Submitting..." : "Submit Address"}
            </button>
            
            <button 
              type="button" 
              className="btn btn-secondary px-4"
              onClick={resetForm}
              style={{ fontWeight: "bold" }}
            >
              Reset Form
            </button>
          </div>
        </form>
        
        {userAddress && (
          <div className="text-center mt-3">
            <button 
              className="btn btn-warning px-4"
              onClick={handleUseOldAddress}
              style={{ fontWeight: "bold" }}
            >
              Use Previous Address
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Address;