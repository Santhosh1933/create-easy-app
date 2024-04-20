const { execSync } = require("child_process");
const readline = require("readline");
const fs = require("fs");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log("Welcome to the React with Vite setup!");
execSync(`npm create vite@latest .`);
execSync("npm install");

rl.question("Do you want to include Tailwind CSS? (y/n): ", (answer) => {
  const includeTailwind = answer.toLowerCase() === "y";
  if (includeTailwind) {
    execSync(
      "npm install -D tailwindcss@latest postcss@latest autoprefixer@latest"
    );
    execSync("npx tailwindcss init -p");

    fs.writeFileSync(
      "tailwind.config.js",
      `/** @type {import('tailwindcss').Config} */
        module.exports = {
        content: [
            "./index.html",
            "./src/**/*.{js,jsx,ts,tsx}",
        ],
        theme: {
            extend: {},
        },
        plugins: [],
        };`
    );
    fs.writeFileSync(
      "src/index.css",
      `@tailwind base;
        @tailwind components;
        @tailwind utilities;`
    );
  }
});
rl.question("Do you want to include Chakra UI? (y/n): ", (answer) => {
  const includeChakraUI = answer.toLowerCase() === "y";

  if (includeChakraUI) {
    execSync(
      "npm i @chakra-ui/react @emotion/react @emotion/styled framer-motion"
    );

    fs.writeFileSync(
      "src/main.jsx",
      `import React from "react";
        import ReactDOM from "react-dom";
        import App from "./App.jsx";
        import "./index.css";
        import { ChakraProvider } from "@chakra-ui/react";

        ReactDOM.createRoot(document.getElementById("root")).render(
        <React.StrictMode>
            <ChakraProvider>
            <App />
            </ChakraProvider>
        </React.StrictMode>
        );`
    );
  }
  rl.close();
});

console.log("Project setup completed successfully!");
rl.close();
