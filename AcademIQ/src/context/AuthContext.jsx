
import { createContext, useState, useEffect  } from "react";
import propTypes from "prop-types";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')) || null);
  const [authToken, setAuthToken] = useState(() => localStorage.getItem('authToken') || null);
  const [isAuthenticated, setIsAuthenticated] = useState(!!authToken);

  const login = async(UserId, PasswordHash) => {
    try {
      const response = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ UserId, PasswordHash })
      });
      console.log(response);

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();

      console.log(data);
      const token = data.token;
      const fetchedUserId = data.user.UserId;
      const fetchedRoleCode = data.user.Role_Code;

      console.log(fetchedUserId, fetchedRoleCode);
      let userProfile = await fetchProfileData(fetchedUserId, fetchedRoleCode);
      
      setAuthToken(token);
      setUser(userProfile);
      
      // Store token in local storage
      localStorage.setItem("authToken", token);
      localStorage.setItem("user", JSON.stringify(userProfile));
      console.log(`Authorization: Bearer ${JSON.stringify(token)}, user: ${JSON.stringify(userProfile)}`);
      setIsAuthenticated(true);
      return isAuthenticated;
    } catch (error) {
      console.error("Login error", error);
      throw error;
    }
  };

  const fetchProfileData = async (fetchedUserId, fetchedRoleCode) =>{
    const endpoint = fetchedRoleCode == "3" ? "students" : "staff";
    console.log(`http://localhost:5000/api/${endpoint}/${fetchedUserId}`);
    try{
    const response = await fetch(`http://localhost:5000/api/${endpoint}/${fetchedUserId}`, {
      method: 'GET',  
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch user profile: ${response.statusText}`);
    }

      const userData = await response.json();
      return userData;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
    
  }
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
    console.log("logout");
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    setAuthToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, authToken, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: propTypes.node,
};
