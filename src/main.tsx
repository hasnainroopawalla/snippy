import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./components";

createRoot(document.getElementById("root") as HTMLElement).render(<App />);
