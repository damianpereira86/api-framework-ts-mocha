import fs from "fs";
import axios from "axios";

const automationValue = process.env.AUTOMATION_VALUE;
const tests = JSON.parse(fs.readFileSync("groupedTestStructure.json", "utf8"));

const payload = {
  tests: tests,
  requirement: automationValue,
};

const apiEndpoint = "https://openai-api-proxy-dev-rtu664353a-uc.a.run.app/api/get-regex-for-run";

const response = await axios.post(apiEndpoint, payload, {
  headers: {
    "Content-Type": "application/json",
  },
});

const responseData = await response.json();

console.log(responseData);
const regexPattern = /^Regex: (.*)$/;
const match = responseData.match(regexPattern);
const extractedValue = match ? match[1] : null;
if (extractedValue !== null) {
  fs.appendFileSync(process.env.GITHUB_ENV, `USER_REQUIREMENT=${extractedValue}\n`);
}
