// import { useEffect, useState } from "react";
// import { useAuth } from "../store/auth";




// export const AdminUsers = () => {
// const [users , setUsers] = useState([]);

// const {authorizationToken} = useAuth();
// console.log("autho token" ,authorizationToken);



//     const getAllUserData = async() => {
//         try {
//             const response = await fetch('http://localhost:3000/api/admin/users' ,{
//                 method : "GET",
//                 headers :  {
//                     Authorization : authorizationToken,
//                 }
//             });
//             const data = await response.json();
//             console.log("users " , data)
//             setUsers(data);

//         } catch (error) {
//             console.log("admin user eroor" , error);
//         }
//     }


//     useEffect(() => {
//       getAllUserData();
//     }, []) 
//     return <>
//         <section className="admin-user-section">
//             <div className="container">
//                 <h1>Admin User Data</h1>
//             </div>
//             <div className="conatiner admin-users">
//                 <table>
//                     <thead>
//                         <tr>
//                             <th>name</th>
//                             <th>email</th>
//                             <th>phone</th>
//                             <th>update</th>
//                             <th>delete</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                     {users.map((curUser , index) => {
//                     return (<tr key={index}>
//                         <td>{curUser.username}</td>
//                         <td>{curUser.email}</td>
//                         <td>{curUser.phone}</td>
//                         <td>edit</td>
//                         <td>delete</td>

//                     </tr>
//                     )
                    
//                 })}

//                     </tbody>
//                 </table>
      
//             </div>
//         </section>
    
//     </>
// }

// from chatgpt

import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import {Link} from "react-router-dom"

export const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const { authorizationToken , API } = useAuth();
  console.log("autho token", authorizationToken);

  const getAllUserData = async () => {
    try {
      const response = await fetch(`${API}/api/admin/users`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("users", data);

      if (Array.isArray(data)) {
        setUsers(data);
      } else {
        console.error("Expected an array but got:", data);
        setUsers([]);
      }
    } catch (error) {
      console.log("admin user error", error);
      setUsers([]);
    }
  }

  const deleteUser = async(id) => {
    try {
      const response = await fetch(`${API}/api/admin//users/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: authorizationToken,
        }
      });

      const data = await response.json();
      console.log(`user after delete0s"${data}`);

      if(response.ok){
        getAllUserData();
      }   
      
    } catch (error) {
      next("delete admin user error" , error)
    }
  }

  useEffect(() => {
    getAllUserData();
  }, []);

  return (
    <>
      <section className="admin-user-section">
        <div className="container">
          <h1>Admin User Data</h1>
        </div>
        <div className="container admin-users">
          <table>
            <thead>
              <tr>
                <th>name</th>
                <th>email</th>
                <th>phone</th>
                <th>update</th>
                <th>delete</th>
              </tr>
            </thead>
            <tbody>
              {users.map((curUser, index) => (
                <tr key={index}>
                  <td>{curUser.username}</td>
                  <td>{curUser.email}</td>
                  <td>{curUser.phone}</td>

                  <td>
                    <Link to={`admin/users/${curUser._id}/edit`}>Edit</Link>
                  </td>

                  <td>
                    <button onClick={() => {deleteUser(curUser._id)}}>delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
