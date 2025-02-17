import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("welcome", "routes/welcome.tsx"),
  route("onboarding", "routes/onboarding.tsx"),
  route("login", "routes/login.tsx"),
] satisfies RouteConfig;
