import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ChakraProvider, createSystem, defaultConfig } from "@chakra-ui/react";

// Create a proper Chakra UI system to avoid _config errors
const system = createSystem(defaultConfig);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ChakraProvider value={system}>
      <App />
    </ChakraProvider>
  </StrictMode>
);
