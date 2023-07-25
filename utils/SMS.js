const Twilio = require('twilio');

// Set up Twilio credentials from environment variables
const accountSid = 'ACc94feac27dba016774a5844584d6bb33';
const authToken = '82dd4b069f28839d20caba89edf1de6a';
const twilioPhoneNumber = '+12295372533';

// Set up Twilio client
const twilioClient = new Twilio(accountSid, authToken);

// Function to send SMS
const sendSMS = (phoneNumber, message) => {
  twilioClient.messages
    .create({
      body: message,
      from: twilioPhoneNumber,
      to: phoneNumber
    })
    .then(() => {
      console.log(`SMS sent to ${phoneNumber}`);
    })
    .catch(error => {
      console.error(`SMS sending error to ${phoneNumber}:`, error);
    });
};

module.exports = sendSMS;

