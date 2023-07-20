
const paystack = require("paystack")("sk_test_48275a2b687ad7a04c8a04c2d26af10f7c42b8ba");

// Function to initiate a payment
exports.initiatePayment = async (req, res, next) => {
    try {
      const { amount, email, metadata} = req.body;
  
      // Ensure that amount is a valid number
      const numericAmount = parseFloat(amount);
      if (isNaN(numericAmount) || numericAmount <= 0) {
        return res.status(400).json({ error: "Invalid amount provided" });
      }
  
      // Validate email
      if (!validateEmail(email)) {
        return res.status(400).json({ error: "Invalid email address provided" });
      }
  
      // Make sure metadata is an object, or initialize it as an empty object if not provided
      const validMetadata = typeof metadata === "object" ? metadata : {};
  
      const response = await paystack.transaction.initialize({
        amount: numericAmount * 100, // Paystack API expects amount in kobo (smallest currency unit)
        email,
        metadata: validMetadata,
      });
  
      // Return the entire response from Paystack, including the authorization_url
      res.json(response.data);
    } catch (error) {
      console.error("Error initiating payment:", error);
      res.status(500).json({ error: "Error initiating payment" });
    }
  };
  
  // Helper function to validate email address
  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  

// Function to verify a transaction
exports.verifyPayment = async (req, res, next) => {
  try {
    const reference = req.params.reference;

    const response = await paystack.transaction.verify(reference);

    // Check if the transaction is successful
    if (response.data.status === "success") {
      // Transaction is successful, handle accordingly
      res.json({ status: "Payment successful" });
    } else {
      // Transaction is not successful
      res.json({ status: "failed" });
    }
  } catch (error) {
    console.error("Error verifying payment:", error);
    res.status(500).json({ error: "Error verifying payment" });
  }
};

exports.handlePaymentSuccess = async (req, res, next) => {
    try {
      // You can access the Paystack callback data here, such as the reference
      const reference = req.query.reference;
  
      // Perform any necessary actions based on the payment success
      // For example, you can update your database, send a confirmation email, etc.
  
      // Return a success message to the frontend
      res.send("Payment successful! Thank you for your purchase.");
    } catch (error) {
      console.error("Error handling payment success:", error);
      res.status(500).json({ error: "Error handling payment success" });
    }
  };