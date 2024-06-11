const express = require("express");

const {
  processPayment,
  sendStripeApiKey,
} = require("../controller/stripeController");

const router = express.Router();

router.route("/pay").post(processPayment);
router.route("/stripeapikey").get(sendStripeApiKey);

module.exports = router;