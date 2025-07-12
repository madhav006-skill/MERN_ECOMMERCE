import React, { useContext, useState } from "react";
import AppContext from "../../context/AppContext";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const { login } = useContext(AppContext);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
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
      const result = await login(formData.email, formData.password);

      if (result.success) {
        navigate("/");
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrors({ general: "Login failed. Please check your credentials." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      email: "",
      password: "",
    });
    setErrors({});
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div
            className="border border-warning rounded-3 p-4"
            style={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
          >
            <h1 className="text-center mb-4">User Login</h1>
            
            {errors.general && (
              <div className="alert alert-danger" role="alert">
                {errors.general}
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="my-3">
              <div className="mb-3">
                <label htmlFor="loginEmail" className="form-label text-light">
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
                  id="loginEmail"
                  placeholder="Enter your email address"
                  autoComplete="email"
                />
                {errors.email && (
                  <div className="text-danger small mt-1">{errors.email}</div>
                )}
              </div>
              
              <div className="mb-3">
                <label htmlFor="loginPassword" className="form-label text-light">
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
                    id="loginPassword"
                    placeholder="Enter your password"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={togglePasswordVisibility}
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
              </div>
              
              <div className="d-grid gap-2 my-4">
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={isSubmitting}
                  style={{ fontWeight: "bold" }}
                >
                  {isSubmitting ? "Logging in..." : "Login"}
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
              <p className="text-light mb-2">Don't have an account?</p>
              <Link 
                to="/register" 
                className="btn btn-outline-warning"
                style={{ fontWeight: "bold" }}
              >
                Create New Account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;