import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <div className="app-root">
      {/* Public pages like login will render here */}
      <Outlet />
    </div>
  );
}
