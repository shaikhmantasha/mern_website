require("dotenv").config();
const express = require("express");
const app = express();
const authRoute = require("./router/auth-router");
const connectDb = require("./utils/db");
const errorMiddleware = require("./middleware/error-middleware");
const contactRoute = require("./router/contact-router")
const cors = require("cors");
const serviceRoute = require("./router/service-router");
const adminRoute = require("./router/admin-router")


// handling cors

const corsOption = {
    origin: VITE_APP_URI_API,
    methods : "GET , POST , PUT , DELETE , PATCH ,HEAD",
    credentials : true,

}
app.use(cors(corsOption))

app.use(express.json())
    
app.use("/api/auth" , authRoute)
app.use("/api/form" , contactRoute)
app.use("/api/data" , serviceRoute)
app.use("/api/admin" , adminRoute)


app.use(errorMiddleware);

const PORT = 3000;
connectDb().then(() => {
    app.listen(PORT , () => {
    console.log(`server is runnig on port ${PORT}`)}
)
})



