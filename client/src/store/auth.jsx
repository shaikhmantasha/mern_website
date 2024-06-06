import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {


  const [token , setToken] = useState(localStorage.getItem("token"));
  const [user , setUser] = useState("");
  // const [isLoading , setIsLoading] = useState(true);
  const [services , setServices] = useState([])
  const  authorizationToken =  `Bearer ${token}`;
  const API = import.meta.env.VITE_APP_URI_API;



  //function to stored the token in local storage
  const storeTokenInLS = (serverToken) => {
    setToken(serverToken);
    return localStorage.setItem("token", serverToken);
  };

  let isLoggedIn = !!token;
  console.log("islogggedin" , isLoggedIn)


  // tackling the logout User
  const LogoutUser = () => {
    setToken("");
    return localStorage.removeItem("token")
  }

  // JWT AUthentication - to get crrently loggin data
const userAuthentication = async () => {
  // setIsLoading(true)
  try {
    const response = await fetch(`${API}/api/auth/user`
      ,{
        method: "GET",
        headers : {
          Authorization :authorizationToken,
        }
      })

      if(response.ok){
        const data = await response.json();
        console.log('user data' , data)

        console.log("AUTH USER before" , user)
        // console.log("AUTH SETUSER" , setUser)

        setUser(data);
        // setIsLoading(false)
        console.log("AUTH USER after" , user)

      }
      else{
        console.log("problem in isloading in auth! error fetching data");
        // setIsLoading(false);
      }
    
  } catch (error) {
      console.log(" fetchin user data error" , error)
  }
}

const getServices = async() => {
  try {
    const response = await fetch(`${API}/api/data/service` , {
      method :"GET",
    })

    if(response.ok){
      const data =await response.json();
      console.log("service data" , data.msg)
      setServices(data.msg);
    }

  } catch (error) {
    console.log(`error in service frontend ${error}`)
  }
}
useEffect(() => {
  
    userAuthentication();
    getServices();

}, []);
  


  

  return (
    <AuthContext.Provider value={{ storeTokenInLS , LogoutUser , isLoggedIn , user , services ,authorizationToken,API }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth used outside of the Provider");
  }
  return authContextValue;
};


////--------------------------------from chat

// import { createContext, useContext, useEffect, useState } from "react";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [token, setToken] = useState(localStorage.getItem("token"));
//   const [user, setUser] = useState(null);

//   // Function to store the token in local storage
//   const storeTokenInLS = (serverToken) => {
//     localStorage.setItem("token", serverToken);
//     setToken(serverToken);
//   };

//   const isLoggedIn = !!token; 
//   console.log("isLoggedIn:", isLoggedIn);

//   // Function to handle user logout
//   const logoutUser = () => {
//     setToken(null);
//     setUser(null);
//     localStorage.removeItem("token");
//   };

//   // JWT Authentication - to get currently logged in data
//   const userAuthentication = async () => {
//     try {
//       const response = await fetch("http://localhost:3000/api/auth/user", {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (response.ok) {
//         const data = await response.json();
//         console.log("user data", data.userData);
//         setUser(data.userData);
//       }
//     } catch (error) {
//       console.log("fetching user data error:", error);
//     }
//   };

  

//   useEffect(() => {
//     if (token) {
//       userAuthentication();
//     }
//   }, [token]);

//   return (
//     <AuthContext.Provider value={{ storeTokenInLS, logoutUser, isLoggedIn, user }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const authContextValue = useContext(AuthContext);
//   if (!authContextValue) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return authContextValue;
// };
