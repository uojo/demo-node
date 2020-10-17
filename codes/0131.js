const requireContext = require("require-context");
const path = require("path");

// const contextPath = path.resolve (__dirname, '../../src/pages/F2estart');
const context = requireContext(
  "../../src/pages/F2estart",
  true,
  /^[^\s]+\.js$/
);

const set = new Set();
context.keys().forEach(key => {
  console.log("TCL: key", key);
  const filename = key.split(".")[0];
  set.add(filename);
});

const firstChar = (str, t = true) => {
  return str.charAt(0)[t ? "toUpperCase" : "toLowerCase"]() + str.slice(1);
};

const main = Array.from(set).map(e => {
  return {
    name: [firstChar(e, false), e],
    path: `/admin/view/f2estart/${firstChar(e, false)}`,
    component: `./F2estart/${e}`
  };
});
console.log("TCL: main", main);

export default main;
