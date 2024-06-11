import { Analytics } from "../components/Analytics"
import { useAuth } from "../store/auth"

export const Home =() => {
    const {user} = useAuth();
    // console.log("homeuser", user.userData.username);
    
    return(
        <>
        <main>
            <section>
                <div className="container grid grid-two-cols">
                    <div className="hero-content">
                        <p>Welcome, {user.userData.username} to Our website </p>
                            <h1>We are learning MERN</h1>
                            <p>
                            Welcome to our MERN Website, your gateway to seamless interaction and secure access! 
                            Crafted with the cutting-edge ReactJS framework, our platform boasts a sophisticated 
                            registration and login system designed to elevate your digital experience. Behind the
                             scenes, our robust MongoDb database ensures your data is stored with the utmost care
                              and efficiency.

                            </p>
                            <div className="btn btn-group">
                                <a href="/contact">
                                    <button className="btn">Contact Now</button>
                                </a>

                                <a href="/services">
                                    <button className="btn secondary-btn">Know More</button>
                                </a>
                            </div>
                    </div>

                    <div className="hero-image">
                        <img src="/images/home.png" alt="public" width="500" height="500" />
                    </div>

                </div>
            </section>
        </main>
        {/* second section
         */}
       <Analytics/>

        {/* third section */}

        <section>
                <div className="container grid grid-two-cols">
                <div className="hero-image">
                        <img src="/images/design.png" alt="public" width="500" height="500" />
                    </div>
                    <div className="hero-content">
                        {/* <p>Welcome to shaikh muskan website</p> */}
                            {/* <h1>We are learning MERN</h1> */}
                            <p>
                                As you can see, both techniques are straightforward to implement.
                                 Depending on your needs one might be more suitable than the other.
                                  Generally speaking, grid is more flexible in most cases and can help 
                                  if you have more complex layouts, which can include a header or sidebar.

                            </p>
                            <div className="btn btn-group">
                                <a href="/contact">
                                    <button className="btn">Contact Now</button>
                                </a>

                                <a href="/services">
                                    <button className="btn secondary-btn">Know More</button>
                                </a>
                            </div>
                    </div>

                    

                </div>
            </section>
        
        </>
    )
}