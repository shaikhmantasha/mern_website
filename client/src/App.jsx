import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Service } from "./pages/Service";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { Navbar } from "./components/Navbar";
import { Error } from "./pages/Error";
import { Footer } from "./components/footer/Footer";
import { Logout } from "./pages/Logout";
import { useAuth } from "./store/auth";
import { AdminLayout } from "./layout/Admin-Layout";
import { AdminUsers } from "./pages/Admin-Users";
import { AdminContacts } from "./pages/Admin-Contacts";



export const App = () => {  
  const {isLoggedIn} = useAuth();
  return(
  <>
     <BrowserRouter>
     <Navbar/>

    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/contact" element={<Contact/>}/>
      <Route path="/service" element={<Service/>}/>
      {isLoggedIn? (
      <Route path="/logout" element = {<Logout/>}/>

      ):(
        
      <><Route path="/register" element={<Register />} /><Route path="/login" element={<Login />} /></>
      )}
      <Route path="*" element={<Error/>}/>
      <Route path="/admin" element={<AdminLayout/>}>  
        <Route path="users" element={<AdminUsers/>}/>  
        <Route path="contacts" element={<AdminContacts/>}/>
      </Route>
    </Routes>
    <Footer/>

  </BrowserRouter>
  </>
  )
}

export default App;