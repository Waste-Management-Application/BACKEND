const axios = require('axios');

// Set up MNotify credentials from environment variables or directly
const mnotifyApiKey = ' BbPxR3XL5KC9XQLgRp2SNcwjH ';
const mnotifySenderId = 'Binbuddy'; // Optional - only if MNotify requires a sender ID
const mnotifyEndpoint = 'https://apps.mnotify.net/smsapi';

// Function to send SMS using MNotify API
const sendSMS = (phoneNumber, message) => {
  const smsData = {
    key: mnotifyApiKey,
    to: phoneNumber,
    msg: message,
    sender_id: mnotifySenderId
  };

  axios.post(mnotifyEndpoint, smsData)
    .then(response => {
      console.log(`SMS sent to ${phoneNumber}. Response:`, response.data);
    })
    .catch(error => {
      console.error(`SMS sending error to ${phoneNumber}:`, error.response.data);
    });
};

module.exports = sendSMS;
