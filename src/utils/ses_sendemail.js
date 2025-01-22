const { SendEmailCommand } = require("@aws-sdk/client-ses");
const { sesClient } = require("../utils/sesClient");

// Load the AWS SDK for Node.js
// Set the region

// const AWS_DATA = {
//   REGION: "eu-north-1",
//   CC_EMAIL_ADDRESS: [""],
//   TO_EMAIL_ADDRESS: [""],
//   SENDER_EMAIL_ADDRESS: "",
//   REPLY_EMAIL_ADDRESS: "",
// };

const createSendEmailCommand = (toAddress, fromAddress, subject, body) => {
  return new SendEmailCommand({
    Destination: {
      /* required */
      CcAddresses: [],
      ToAddresses: [toAddress],
    },
    Message: {
      /* required */
      Body: {
        /* required */
        Html: {
          Charset: "UTF-8",
          Data: `<h1> ${body || "Hello Welcome From DevDazzle"}</h1>`,
        },
        Text: {
          Charset: "UTF-8",
          Data: "TEXT_FORMAT_BODY DevDazzle",
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: subject || "DEvDazzle Send Email",
      },
    },
    Source: fromAddress,
    ReplyToAddresses: [
      /* more items */
    ],
  });
};

const run = async (subject, body) => {
  const sendEmailCommand = createSendEmailCommand(
    "garganuj2023@gmail.com",
    "agDEvDazzle@dev-dazzle.in",
    subject,
    body
  );

  try {
    return await sesClient.send(sendEmailCommand);
  } catch (caught) {
    if (caught instanceof Error && caught.name === "MessageRejected") {
      const messageRejectedError = caught;
      return messageRejectedError;
    }
    throw caught;
  }
};

module.exports = { run };
