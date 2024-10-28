


import { createContext, useState, useEffect } from "react";
import propTypes from "prop-types";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken') || null);

  // Check if user is logged in on page load
  useEffect(() => {
    if (authToken) {
      // You can make an authenticated request here if needed
      fetch('https://localhost:5092/api/user', {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      })
      .then(res => res.json())
      .then(data => {
        // Handle any fetched data if needed
        console.log('Fetched protected data:', data);
      })
      .catch(error => console.error('Error fetching protected data:', error));
    }
  }, [authToken]);

  // Login function using Fetch API
  const login = async (email, password) => {
    try {
      const response = await fetch('https://localhost:5092/api/Authentication/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      const { token } = data;

      // Store token in local storage
      localStorage.setItem("authToken", token);
      setAuthToken(token);

      // Optionally fetch user data from the API
      setUser({ email });

      return data;
    } catch (error) {
      console.error("Login error", error);
      throw error;
    }
  };

  // Register function using Fetch API
  const register = async (email, password, role) => {
    try {
      const response = await fetch('https://localhost:5092/api/Authentication/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password, role })
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Registration error", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, authToken }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: propTypes.node,
};
