"use strict";

module.exports.list = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "List Array",
        data: listArray,
      },
      null,
      2
    ),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};

const listArray = [
  { id: 1, name: "Arslan" },
  { id: 2, name: "Arslan2" },
  { id: 3, name: "Arslan3" },
  { id: 4, name: "Arslan4" },
];
