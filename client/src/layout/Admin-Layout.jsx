import { NavLink, Outlet, Navigate } from "react-router-dom"
import { FaUser } from "react-icons/fa6";
import { IoIosContact } from "react-icons/io";
import { MdMiscellaneousServices } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import { useAuth } from "../store/auth"

export const AdminLayout = () => {
    const {user , isLoading , authorizationToken} = useAuth();

    console.log("contact user admin layout" , user)
    console.log(authorizationToken);

    // if(isLoading){
    //     return <h1>Loading ...</h1>;
    // }

    // if(!user.isAdmin){
    //     return <Navigate to="/"/>
    // }

    return (
    <>
    <header>
        <div className="container">
            <nav>
                <ul>
                    <li>
                        <NavLink to="/admin/users" ><FaUser />
                        users</NavLink>
                    </li>

                    <li>
                        <NavLink to="/admin/contacts"><IoIosContact />
                        Contacts</NavLink>
                    </li>

                    <li><NavLink to="/service"><MdMiscellaneousServices />
                        service</NavLink></li>

                    <li><NavLink to="/"><FaHome />
                        Home</NavLink></li>
                </ul>
            </nav>
        </div>
    </header>
    <Outlet/>
    
    </>
    )
}