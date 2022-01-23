//we are going to make an app that:
//1. takes a URL, local file path
//2. download the url to the path, print a message that says how large the file was
const fs = require('fs');
const request = require('request');
const readLine = require('readline');
const url = process.argv[2];
const path = process.argv[3];
const rl = readLine.createInterface(
  process.stdin, process.stdout);

 const questionFunction = rl.question('File already exists. Overwrite? Y/N', (overWrite) => {
    if (overWrite === 'Y') {
      console.log(`File will be overwritten. Calling writeFile now.`);
      return;
    }
    if (overWrite === 'N') {
      console.log("exiting program now");
      return
    }
    
  });

request(`${url}`, (error, response, body) => {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  //console.log('body:', body); // Print the HTML for the Google homepage.

  function checkFileExists(file) {
    return fs.promises.access(file, fs.constants.F_OK)
             .then(() => questionFunction)
             .catch(() => console.log("File Does not exist"))
  }
checkFileExists(`${path}`)

  const content = body;
  function writeFile(filePath) {
    fs.writeFile(`${filePath}`, content, err => {
      if (err) {
        console.error(err)
        return
      }
      //file written successfully
      let size = content.length;
      console.log(`Downloaded and saved ${size} bytes to ${path}`);
    })
  }
  writeFile(path);
});

