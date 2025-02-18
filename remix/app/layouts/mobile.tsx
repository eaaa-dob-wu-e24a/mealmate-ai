import { Outlet } from "react-router";

export default function MobileLayout() {
  return (
    <div className="flex flex-col h-screen">
      <Outlet />
    </div>
  );
}
