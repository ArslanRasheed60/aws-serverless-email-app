"use strict";
const AWS = require("aws-sdk");

const ses = new AWS.SES();

//* create lamda function
module.exports.handler = async (event) => {
  const { to, from, subject, text } = JSON.parse(event.body);

  if (!to || !from || !subject || !text) {
    return _400({
      message: "missing parameters on request body",
    });
  }

  const emailParams = {
    Destinaion: {
      ToAddresses: [to],
    },
    Message: {
      Body: {
        Text: {
          Data: text,
        },
      },
      Subject: {
        Data: subject,
      },
    },
    Source: from,
  };

  try {
    await ses.sendEmail(emailParams).promise();
    return _200();
  } catch (error) {
    console.log("error sending email", error);

    return _400({ message: "unable to send an email" });
  }
};

const _400 = (body) => {
  return {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Methods": "*",
      "Access-Control-Allow-Origin": "*",
    },
    statusCode: 400,
    body: JSON.stringify(body),
  };
};

const _200 = () => {
  return {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Methods": "*",
      "Access-Control-Allow-Origin": "*",
    },
    statusCode: 200,
    body: JSON.stringify({ message: "success" }),
  };
};
