const { SESClient } = require("@aws-sdk/client-ses"); // Set the AWS Region.

// Create SES service object.
const sesClient = new SESClient({
  region: "eu-north-1", // Your SES region
  credentials: {
    accessKeyId: process.env.AWS_SES_ACCESS_KEY, // Or use IAM roles if running on AWS EC2
    secretAccessKey: process.env.AWS_SES_SECRET_ACCESS_KEY, // Same as above
  },
});

module.exports = { sesClient };
