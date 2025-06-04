import { createFileRoute } from "@tanstack/react-router";
import App from "../App.jsx";
export const Route = createFileRoute("/pgm-3")({
  component: RouteComponent,
});

function RouteComponent() {
  return <App />;
}
