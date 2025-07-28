const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId;
  const data = await invModel.getInventoryByClassificationId(classification_id);
  let grid, className;

  if (data.length > 0) {
    grid = await utilities.buildClassificationGrid(data);
    className = data[0].classification_name;
  } else {
    grid = '<p class="notice">No vehicles found.</p>';
    className = "Inventory";
  }

  let nav = await utilities.getNav();
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  });
};


  module.exports = invCont
