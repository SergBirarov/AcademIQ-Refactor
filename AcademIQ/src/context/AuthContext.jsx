
import { createContext, useState, useEffect, useCallback  } from "react";
import propTypes from "prop-types";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken') || null);

  const fetchUserProfile = useCallback(async () => {
    try {
      let id = user.UserId;
      const response = await fetch("https://localhost:5000/api/users/" + id + "", {
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        logout();
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
      logout();
    }
  }, [authToken]);

  useEffect(() => {
    if (authToken) {
      fetchUserProfile();
    }
  }, [authToken, fetchUserProfile]);

  
  // Login function using Fetch API
  const login = async (userId, password) => {
    try {
      console.log(userId, password);
      const response = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId, password })
      });

      console.log(response);

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      console.log(data);
      const { token, userProfile } = data;
      console.log(userProfile);
      console.log(token);

      // Store token in local storage
      localStorage.setItem("authToken", token);
      setAuthToken(token);
      console.log("Authorization:" `Bearer ${token}`);
    } catch (error) {
      console.error("Login error", error);
      throw error;
    }
  };

  //Register function using Fetch API
  const register = async (email, password, role) => {
    try {
      const response = await fetch('http://localhost:5092/api/Authentication/register', {
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

  const logout = () => {
    localStorage.removeItem("authToken");
    setAuthToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, authToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: propTypes.node,
};
