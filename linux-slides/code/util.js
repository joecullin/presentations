#!/usr/local/bin/node
const getInput = () => {
  return new Promise((resolve, reject) => {
    let paths = [];
    const getStdin = require("get-stdin");
    getStdin().then(input => {
      let lines = input.split("\n");
      let lineRE = /\$cachevalidurl='(.*?)'/;
      lines.forEach(line => {
        const lineMatch = line.match(lineRE);
        if (lineMatch) paths.push(lineMatch[1]);
      });
      resolve(paths);
    });
  });
};
getInput().then(paths => {
  console.log("paths", paths);
});
