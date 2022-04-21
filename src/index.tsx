import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

if (process.env.REACT_APP_SENTRY_DSN) {
  Sentry.init({
    dsn: "https://72fc289ee3da4f258dde52c4916b2131@o1214350.ingest.sentry.io/6354820",
    integrations: [new BrowserTracing()],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
  });
}

ReactDOM.render(<App />, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
