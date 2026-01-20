import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <Outlet />
    </div>
  );
}
