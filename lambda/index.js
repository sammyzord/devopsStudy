module.exports.handler = async (event) => {
  const { method, path } = event.requestContext.http;

  // Handling GET request
  if (method === "GET" && path === "/") {
    return {
      statusCode: 200,
      body: JSON.stringify("Hello, lambda!"),
    };
  }

  // Handling POST request
  else if (method === "POST" && path === "/") {
    return {
      statusCode: 200,
      body: JSON.stringify("Nice post!"),
    };
  }

  // Handling other routes
  else {
    return {
      statusCode: 404,
      body: JSON.stringify("Oops! Not Found!"),
    };
  }
};
