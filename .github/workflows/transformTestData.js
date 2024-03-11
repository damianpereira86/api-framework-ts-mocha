const fs = require("fs");

// Read the original JSON file
const originalData = JSON.parse(fs.readFileSync("testStructure.json", "utf8"));

// Initialize an object to hold the grouped tests
const testsByFile = {};

// Iterate over each test and organize by file
originalData.tests.forEach((test) => {
  // Check if the array for this file already exists; if not, create it
  if (!testsByFile[test.file]) {
    testsByFile[test.file] = [];
  }
  // Add the test info to the corresponding file's array, omitting the 'file' attribute
  testsByFile[test.file].push({
    title: test.title,
    fullTitle: test.fullTitle,
  });
});

// Construct the new JSON object
const newTestData = {
  testsByFile: testsByFile,
};

// Write the new JSON to a file
fs.writeFileSync("testStructure.json", JSON.stringify(newTestData, null, 2));
