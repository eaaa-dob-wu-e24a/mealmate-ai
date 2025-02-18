import { Outlet } from "react-router";

export default function MobileLayout() {
  return (
    <div className="h-svh w-svw bg-white p-8 flex items-center justify-center">
      <div className="relative w-full h-[calc(100svh-4rem)] max-w-[450px] border shadow-lg m-auto rounded-lg overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}
