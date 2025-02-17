import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("layouts/navbar.tsx", [
    index("routes/home.tsx"),
    route("welcome", "routes/welcome.tsx"),
    route("onboarding", "routes/onboarding.tsx"),
    route("/chatbot", "routes/chatbot.tsx"),
    route("login", "routes/login.tsx"),
  ]),
] satisfies RouteConfig;
