import { useAuth } from "../store/auth"
import { useEffect, useState } from "react"

export const AdminContacts = () => {
    const {authorizationToken, API} = useAuth();
    const [contactData , setContactData] = useState([]);

    const getContactData = async() => {
        try {
            const response = await fetch(`${API}/api/admin/contacts`,{
                method : "GET",
                    headers : {
                        Authorization : authorizationToken,
                    },
                })


            const data =await response.json();
            console.log("contact data" , data)
            setContactData(data);

            if(response.ok){
                console.log(response)
            }

        }
             catch (error) {
            console.log("get contact data errpr" , error)
        }
    }

    const deleteContactById = async(id) => {
        try {
            const response = await fetch(`${API}/api/admin/contacts/delete/${id}`,
                {
                    method : "DELETE",
                    headers : {
                        Authorization : authorizationToken,
                    }
                }
            )
             
            const data =await response.json();
            console.log("response from Delete User" , data)
            if(response.ok){
                getContactData();
             }
        } catch (error) {
            console.log("error from dlete aadmin" , error)
        }
    }

    useEffect(() => {
      getContactData();
    }, [])
    





    return <>
    <section>
        <h1>Admin contact data</h1>
        <div className="container admin-users">
            {
                contactData.map((curContactData , index) => {
                    const {username , email , message , _id} = curContactData;
                    return(
                        <div key={index}>
                            <p>{username}</p>
                            <p>{email}</p>
                            <p>{message}</p>
                            <button className= "btn" onClick={() => {deleteContactById(_id)}}>delete</button>

                        </div>
                    )
                })
            }
        </div>
    </section>

    </>
}