const data = require("./data.js");
console.log(data);
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
