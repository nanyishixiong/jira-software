import "./wdyr";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import { DevTools, loadServer } from "jira-dev-tool";
import { AppProviders } from "context";
import { Profiler } from "components/profiler";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

loadServer(() => {
  root.render(
    <AppProviders>
      <DevTools />
      <Profiler id={"RootApp"} phases={["mount"]}>
        <App />
      </Profiler>
    </AppProviders>
  );
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
