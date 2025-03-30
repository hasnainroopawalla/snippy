import "./index.css";
import ReactDOM from "react-dom/client";
import { ContextualApp } from "./app";
import { initializeCore } from "./core";

initializeCore().then(core => {
  const rootElement = document.getElementById("root") as HTMLElement;

  if (!rootElement.innerHTML) {
    const root = ReactDOM.createRoot(rootElement);

    root.render(
      <div id="root-container" className="w-screen h-screen bg-primary-bg">
        <ContextualApp core={core} />
      </div>,
    );
  }
});
