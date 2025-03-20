import "./index.css";
import ReactDOM from "react-dom/client";
import { ContextualApp } from "./app";

const rootElement = document.getElementById("root") as HTMLElement;

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);

  root.render(<ContextualApp />);
}
