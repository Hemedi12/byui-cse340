// In your main server file (e.g., server.js)
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const app = express();
const staticRoutes = require("./routes/static");
const inventoryRoute = require("./routes/inventoryRoute");
const baseController = require("./controllers/baseController");
const utilities = require("./utilities/"); // If you need this for error handling, etc.

// View engine setup
app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "./layouts/layout"); // default layout

// Static Routes
app.use(staticRoutes);

// Index route
app.get("/", utilities.handleErrors(baseController.buildHome)); // Using handleErrors middleware

// Inventory routes
app.use("/inv", inventoryRoute);

// Other routes and error handling...

// Example 404 handler
app.use(async (req, res, next) => {
  next({status: 404, message: 'Sorry, we couldn\'t find that route.'})
})

// Express Error Handler
app.use(async (err, req, res, next) => {
  let nav = await utilities.getNav()
  console.error(`Error at: ${err.stack}`)
  res.render("errors/error", {
    title: err.status || 'Server Error',
    message: err.message,
    nav
  })
})

// Port setup
const port = process.env.PORT || 5500;
app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});