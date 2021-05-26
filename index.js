const express = require("express");
const PORT = process.env.PORT || 5000;
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const config = require("./config/db");
const app = express();
require("./config/mongoose.js")(app);
//registering cors
app.use(cors());
//configure body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//configure body-parser ends here
app.use(morgan("dev")); // configire morgan
// define first route
app.get("/", (req, res) => {
  console.log("Hello MEVN Soldier");
});
const userRoutes = require("./shoppingCart/route/user");
const productRoutes  = require("./shoppingCart/route/product");
app.use("/user", userRoutes);
app.use("/product", productRoutes);

app.listen(PORT, () => {
  console.log(`App is running on ${PORT}`);
});