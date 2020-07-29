const data = require("./data.js");
exports.handler = async (event, context, callback) => {
  return (
    null,
    {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      statusCode: 200,
      body: JSON.stringify(data),
    }
  );
};
