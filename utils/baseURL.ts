//export const BASE_URL = "https://petstore.swagger.io/v2";

const ENV = process.env.TEST_ENV || "dev";

console.log("Running tests in ENV:", ENV);

const ENV_URLS: Record<string, string> = {
  dev: "https://petstore.swagger.io/v2",
  qa: "https://petstore.swagger.io/v2",
  stage: "https://petstore.swagger.io/v2"
};

export const BASE_URL = ENV_URLS[ENV];

console.log("Base URL:", BASE_URL);