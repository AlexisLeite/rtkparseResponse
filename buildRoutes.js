const fs = require("fs");

const directories = ["src/pages"];
const pageExtensions = ["tsx"];
const extensionsOmitRegexp = pageExtensions.join("|");

const routes = [];

while (directories.length > 0) {
  const directory = directories.shift();
  console.log(`Reading ${directory}`);

  const currentRoutes = fs
    .readdirSync(directory, { withFileTypes: true })
    .filter((file) => {
      if (file.isDirectory()) {
        directories.push(`${directory}/${file.name}`);
      }
      return file.name.match(new RegExp(`\\.(?:${extensionsOmitRegexp})`));
    })
    .map((file) => {
      let name = file.name;
      return `${directory}/${name}`;
    });
  routes.push(...currentRoutes);
}

let index = 0;

const urlBaseOmit = "src/pages";
const imports = [];
const components = [];
const urls = [];

for (let route of routes) {
  let path = route
    .match(new RegExp(`${urlBaseOmit}/(.*?)\\.(?:${extensionsOmitRegexp})`))[1]
    .replace("index", "");

  const compName = `COMPONENT${index++}`;
  const importRoute = `.${
    route.match(new RegExp(`src(.*?)\\.${extensionsOmitRegexp}`))[1]
  }`;

  urls.push(path);

  imports.push(`import ${compName} from "${importRoute}"`);
  components.push(`<Route path="/${path}" element={<${compName} />} />`);
}

console.log("Dinamically created routes");
console.log({ urls });

fs.writeFileSync(
  "src/routes.tsx",
  `import {
  Routes,
  Route
} from "react-router-dom"; 
import React from "react";

${imports.join(`;
`)};

export default function MyRoutes() {
  return <Routes>${components.join(`
`)}</Routes>
};
`
);
