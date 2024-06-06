import { useState } from "react"
import {useNavigate} from "react-router-dom";
import { useAuth } from "../store/auth";


export const Register =() => {
    const [user , setUser] = useState({
        username : "",
        email : "",
        phone : "",
        password : "",

    })
    const navigate = useNavigate();
    const { storeTokenInLS , API} = useAuth();
    const URL = `${API}/api/auth/register`;
    const handleInput = (e) => {
            console.log(e)
            let name = e.target.name;
            let value = e.target.value;

            setUser({
                ...user,
                [name] : value,
            })
        } 

        const handleSubmit =async (e) => {
            e.preventDefault();
            console.log(user,"new user Data");
            try {
                const response = await fetch ( URL, {method:"POST",
                    headers:{
                        "Content-Type" : "application/json",
                    },
                    body: JSON.stringify(user),
                })
                const res_data = await response.json()
                console.log( "response from server", res_data.message);
                console.log("register ka repsonse", response)

                if(response.ok){


                    storeTokenInLS(res_data.token);
                    // localStorage.setItem("token" , res_data)
                    setUser({
                        username : "",
                        email : "",
                        phone : "",
                        password : "",
                    })

                    navigate('/login')
                }  
                else{
                    alert(res_data.extraDetails ? res_data.extraDetails : res_data.message)
                }
            } catch (error) {
                console.error("registration error" , error);
            }
            

        }

    return(
        <>
        <section>
            <main>
                <div className="section-registration">
                    <div className="container grid grid-two-cols">
                        <div className="registration-image">
                            <img src="/images/register.png" alt="a girl trying to register"
                                 width="500" height="500"                            
                                                             
                            />
                        </div>
                        {/* "registration filling section"*/}
                        <div className="registration-form">
                            <h1 className="main-heading mb-3">Registraion Form</h1>
                            <br />
                            <form onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="username">Username</label>
                                    <input type="text" 
                                           name="username" 
                                           placeholder="username"  
                                           id="username" 
                                           required 
                                           autoComplete="off"
                                           value={user.username}
                                           onChange={handleInput}
                                           />
                                           
                                </div>

                                <div>
                                    <label htmlFor="email">Email</label>
                                    <input type="text" 
                                           name="email" 
                                           placeholder="email"  
                                           id="email" 
                                           required 
                                           autoComplete="off"
                                           value={user.email}
                                           onChange={handleInput}/>
                                </div>

                                <div>
                                    <label htmlFor="phone">phone</label>
                                    <input type="number" 
                                           name="phone" 
                                           placeholder="phone"  
                                           id="phone" 
                                           required 
                                           autoComplete="off"
                                           value={user.phone}
                                           onChange={handleInput}/>
                                </div>

                                <div>
                                    <label htmlFor="password">password</label>
                                    <input type="password" 
                                           name="password" 
                                           placeholder="password"  
                                           id="password" 
                                           required 
                                           autoComplete="off"
                                           value={user.password}
                                           onChange={handleInput}/>
                                </div>
                                <br />
                                <button type="submit" className="btn btn-submit">Register now</button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </section>
        </>
    )
}