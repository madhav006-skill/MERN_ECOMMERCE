import React, { useContext, useState } from "react";
import AppContext from "../../context/AppContext";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const { register } = useContext(AppContext);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = "Password must contain at least one uppercase letter, one lowercase letter, and one number";
    }
    
    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
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
      const result = await register(formData.name, formData.email, formData.password);

      if (result.success) {
        navigate('/login');
      }
    } catch (error) {
      console.error("Registration error:", error);
      setErrors({ general: "Registration failed. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    setErrors({});
  };

  const togglePasswordVisibility = (field) => {
    if (field === 'password') {
      setShowPassword(!showPassword);
    } else if (field === 'confirmPassword') {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div
            className="border border-warning rounded-3 p-4"
            style={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
          >
            <h1 className="text-center mb-4">User Registration</h1>
            
            {errors.general && (
              <div className="alert alert-danger" role="alert">
                {errors.general}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="my-3">
              <div className="mb-3">
                <label htmlFor="registerName" className="form-label text-light">
                  Full Name *
                </label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  type="text"
                  className={`form-control bg-dark text-light ${
                    errors.name ? "border-danger" : ""
                  }`}
                  id="registerName"
                  placeholder="Enter your full name"
                  autoComplete="name"
                />
                {errors.name && (
                  <div className="text-danger small mt-1">{errors.name}</div>
                )}
              </div>
              
              <div className="mb-3">
                <label htmlFor="registerEmail" className="form-label text-light">
                  Email Address *
                </label>
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  type="email"
                  className={`form-control bg-dark text-light ${
                    errors.email ? "border-danger" : ""
                  }`}
                  id="registerEmail"
                  placeholder="Enter your email address"
                  autoComplete="email"
                />
                {errors.email && (
                  <div className="text-danger small mt-1">{errors.email}</div>
                )}
              </div>
              
              <div className="mb-3">
                <label htmlFor="registerPassword" className="form-label text-light">
                  Password *
                </label>
                <div className="input-group">
                  <input
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    type={showPassword ? "text" : "password"}
                    className={`form-control bg-dark text-light ${
                      errors.password ? "border-danger" : ""
                    }`}
                    id="registerPassword"
                    placeholder="Enter your password"
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => togglePasswordVisibility('password')}
                    style={{ borderColor: "#6c757d" }}
                  >
                    {showPassword ? (
                      <i className="fas fa-eye-slash"></i>
                    ) : (
                      <i className="fas fa-eye"></i>
                    )}
                  </button>
                </div>
                {errors.password && (
                  <div className="text-danger small mt-1">{errors.password}</div>
                )}
                <div className="form-text text-light">
                  Password must be at least 6 characters with uppercase, lowercase, and number
                </div>
              </div>
              
              <div className="mb-3">
                <label htmlFor="registerConfirmPassword" className="form-label text-light">
                  Confirm Password *
                </label>
                <div className="input-group">
                  <input
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    type={showConfirmPassword ? "text" : "password"}
                    className={`form-control bg-dark text-light ${
                      errors.confirmPassword ? "border-danger" : ""
                    }`}
                    id="registerConfirmPassword"
                    placeholder="Confirm your password"
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => togglePasswordVisibility('confirmPassword')}
                    style={{ borderColor: "#6c757d" }}
                  >
                    {showConfirmPassword ? (
                      <i className="fas fa-eye-slash"></i>
                    ) : (
                      <i className="fas fa-eye"></i>
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <div className="text-danger small mt-1">{errors.confirmPassword}</div>
                )}
              </div>
              
              <div className="d-grid gap-2 my-4">
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={isSubmitting}
                  style={{ fontWeight: "bold" }}
                >
                  {isSubmitting ? "Creating Account..." : "Create Account"}
                </button>
                
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={resetForm}
                  style={{ fontWeight: "bold" }}
                >
                  Reset Form
                </button>
              </div>
            </form>
            
            <div className="text-center mt-3">
              <p className="text-light mb-2">Already have an account?</p>
              <Link 
                to="/login" 
                className="btn btn-outline-warning"
                style={{ fontWeight: "bold" }}
              >
                Login to Your Account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;