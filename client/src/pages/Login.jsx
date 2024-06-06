import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";



export const Login =() => {
    const navigate = useNavigate();
    
    const { storeTokenInLS , API} = useAuth();
    // console.log('storeTokenInLS:', storeTokenInLS); // This should log the function

    const URL = `${API}/api/auth/login`;


    const [user , setUser] = useState({
        email :"",
        password:"",
        })

        const handleInput= (e) => {
            // console.log(e)
            let name = e.target.name;
            let value = e.target.value;

            setUser({
                ...user,
                [name] : value
            })
        }

        const handleSubmit = async(e) => {
            e.preventDefault();

            try {
                const response = await fetch(URL , {
                    method : "POST",
                    headers : {
                        "Content-Type" : "application/json", 
                    },
                    body: JSON.stringify(user),
                })
    
                if(response.ok){

                    alert("Login succesfully")
                    
                    const res_data = await response.json();
                    console.log(res_data)
                    storeTokenInLS(res_data.token);

                    // localStorage.setItem("token" , res_data.token)

                    setUser({email : "" , password : ""})
                    navigate("/")

                }
                else{
                    alert("Login Failed try again")
                }
            } catch (error) {
                console.log(error)
            }


        }










    return(
        <>
        <section>
            <main>
                <div className="section-registration">
                    <div className="container grid grid-two-cols">
                        <div className="login-image">
                            <img src="/images/login.png" 
                            alt="trying to login"
                            height="500"
                            width="500"
                            />
                        </div>

                        {/* login form */}
                        <form onSubmit={handleSubmit}>
                            
                            <div className="registration-form">
                            <h1 className="main-heading mb-3"></h1>
                            <br />


                            <div>
                            <label htmlFor="email">email</label>
                            <input type="text"
                                   name="email"
                                   placeholder="email"
                                   id="email"
                                   autoComplete="off"
                                   required
                                   value={user.email}
                                   onChange={handleInput}
                                   />
                            </div>
                            
                            <div>
                            <label htmlFor="password">password</label>
                            <input type="password"
                                   name="password"
                                   placeholder="password"
                                   id="password"
                                   autoComplete="off"
                                   required
                                   value={user.password}
                                   onChange={handleInput}
                                   />
                            </div>
                            <br />

                            <button type="submit" className="btn btn-submit">Login Now</button>

                             
                            </div>

                            
                            
                        </form>
                    </div>
                </div>
            </main>
        </section>



        
        </>
    )
}