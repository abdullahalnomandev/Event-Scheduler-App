import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import EventSchedulerApp from "./EventSchedulerApp.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <EventSchedulerApp />
  </StrictMode>
);
