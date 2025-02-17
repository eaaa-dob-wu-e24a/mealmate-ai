import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("layouts/auth.tsx", [
    index("routes/welcome.tsx"),
    route("login", "routes/login.tsx"),
    route("onboarding/1", "routes/sign-up-1.tsx"),
    route("onboarding/2", "routes/sign-up-2.tsx"),
  ]),
  layout("layouts/dashboard.tsx", [
    route("dashboard", "routes/dashboard.tsx"),
    route("sign-out", "routes/sign-out.ts"),
  ]),

  layout("layouts/onboarding.tsx", [
    route("onboarding/3", "routes/sign-up-3.tsx"),
  ]),
] satisfies RouteConfig;
