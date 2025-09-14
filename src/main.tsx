import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import { store } from "./store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "@mantine/core/styles.css";
import { MantineProvider, createTheme } from "@mantine/core";
import "./index.css";

export const theme = createTheme({
  fontFamily: "Open Sans, sans-serif",
  colors: {
    indigo: [
      "#EDF2FF",
      "#DBE4FF",
      "#BAC8FF",
      "#91A7FF",
      "#748FFC",
      "#5C7CFA",
      "#4C6EF5",
      "#4263EB",
      "#3B5BDB",
      "#364FC7",
    ],

    gray: [
      "#E7E7E7",
      "#CFCFCF",
      "#B7B7B7",
      "#9F9F9F",
      "#878787",
      "#6F6F70",
      "#575758",
      "#3F3F40",
      "#272728",
      "#0F0F10",
    ],
    background: [
      "#F6F6F7",
      "#F6F6F7",
      "#F6F6F7",
      "#F6F6F7",
      "#F6F6F7",
      "#F6F6F7",
      "#F6F6F7",
      "#F6F6F7",
      "#F6F6F7",
      "#F6F6F7",
    ],
    white: [
      "#FFFFFF",
      "#FFFFFF",
      "#FFFFFF",
      "#FFFFFF",
      "#FFFFFF",
      "#FFFFFF",
      "#FFFFFF",
      "#FFFFFF",
      "#FFFFFF",
      "#FFFFFF",
    ],
  },

  primaryColor: "indigo",
  primaryShade: 7,
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <MantineProvider theme={theme} defaultColorScheme="auto">
        <BrowserRouter basename="/FrontendHeadHunter">
          <App />
        </BrowserRouter>
      </MantineProvider>
    </Provider>
  </StrictMode>
);
