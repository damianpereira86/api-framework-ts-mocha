import fs from "fs";
import fetch from "node-fetch";

const automationValue = process.env.AUTOMATION_VALUE;
const tests = JSON.parse(fs.readFileSync("testsGroupedBySuite.json", "utf8"));

const payload = {
  tests: tests,
  requirement: automationValue,
};

const payloadString = JSON.stringify(payload, null, 2);

const apiEndpoint = "https://openai-api-proxy-dev-rtu664353a-uc.a.run.app/api/get-regex-for-run";

const response = await fetch(apiEndpoint, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: payloadString,
});

const responseData = await response.json();

console.log(responseData);
const regexPattern = /^Regex: (.*)$/;
const match = responseData.match(regexPattern);
const extractedValue = match ? match[1] : null;
if (extractedValue !== null) {
  fs.appendFileSync(process.env.GITHUB_ENV, `USER_REQUIREMENT=${extractedValue}\n`);
}
