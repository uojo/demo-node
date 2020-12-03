const fs = require("fs");
const path = require("path");
const csv = require("fast-csv");

// const stream = csv
//   .parse({ headers: true })
//   .on("error", error => console.error(1, error))
//   .on("data", row => console.log(2, row))
//   .on("end", rowCount => console.log(3, `Parsed ${rowCount} rows`));

// stream.write("header1,header2\n");
// stream.write("col1,col2");
// stream.end();

fs.createReadStream(
  path.resolve(__dirname, "files", "DXY JIRA 2020-05-26T18_37_36+0800.csv")
)
  .pipe(csv.parse({ headers: true }))
  .on("error", error => console.error(error))
  .on("data", row => console.log(row))
  .on("end", rowCount => console.log(`Parsed ${rowCount} rows`));
