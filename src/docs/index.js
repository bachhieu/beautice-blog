const swaggerJsdoc = require("swagger-jsdoc");
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Labrary API",
      version: "1.0.0",
      description: "...",
    },
    servers: [
      {
        url: "http://127.0.0.1:3000",
      },
      {
        url: "http://127.0.0.1:3001",
      },
      {
        url: "https://0eda-2405-4802-1d65-12c0-5d57-fa9b-beed-8ec1.ap.ngrok.io",
      },
    ],
  },
  apis: ["./src/docs/*"], // files containing annotations as above
};
exports.specs = swaggerJsdoc(options);
