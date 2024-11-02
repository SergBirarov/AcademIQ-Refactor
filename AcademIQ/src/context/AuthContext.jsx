
import { createContext, useState, useEffect, useCallback  } from "react";
import propTypes from "prop-types";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken') || null);

  const fetchUserProfile = useCallback(async () => {
    try {
      const response = await fetch("https://localhost:5092/api/Authentication/user", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
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
  const login = async (email, password) => {
    try {
      const response = await fetch('https://localhost:5092/api/Authentication/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
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
      const profileResponse = await fetch('https://localhost:5092/api/Authentication/user', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          "Authorization": `Bearer ${token}`
        },
        cache: 'no-cache',
      });
      console.log(profileResponse);

      if (!profileResponse.ok) {
        throw new Error('Could not fetch user data');
      }

      const userProfileData = await profileResponse.json();
      console.log(userProfileData);

      // Optionally fetch user data from the API
      setUser(userProfileData);

      fetchUserProfile();
      return data;
    } catch (error) {
      console.error("Login error", error);
      throw error;
    }
  };

  //Register function using Fetch API
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
