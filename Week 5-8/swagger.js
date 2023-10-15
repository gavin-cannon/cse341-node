const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Presidents API",
    description: "Shout out to Jimmy Carter",
  },
  host: "localhost:5000",
  schemes: ["http"],
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/presidents.js"];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

swaggerAutogen(outputFile, endpointsFiles, doc);
