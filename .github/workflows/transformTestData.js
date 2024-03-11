import fs from "fs";

const originalData = JSON.parse(fs.readFileSync("testStructure.json", "utf8"));
const testsByFile = {};

// Iterate over each test and organize by file
for (const test of originalData.tests) {
  // Transform the file path to start from \tests
  const transformedFilePath = test.file.replace(/^.*\\tests/, "\\tests");

  // Check if the array for this file already exists; if not, create it
  if (!testsByFile[transformedFilePath]) {
    testsByFile[transformedFilePath] = [];
  }
  // Add the test info to the corresponding file's array, omitting the 'file' attribute
  testsByFile[transformedFilePath].push({
    title: test.title,
    fullTitle: test.fullTitle,
  });
}

const newTestData = {
  testsByFile,
};

fs.writeFileSync("groupedTestStructure.json", JSON.stringify(newTestData, null, 2));
