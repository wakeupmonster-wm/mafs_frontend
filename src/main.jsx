import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom"; // Use react-router-dom
import { Provider } from "react-redux";
import { store } from "@/app/store/redux.store";
import { router } from "@/app/routes/index"; // Import your router config
import AppInitializer from "./app/context/AppInitializer";
import { Toaster } from "@/components/ui/sonner";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      {/* The router handles the entire app tree now */}
      <AppInitializer>
        <RouterProvider router={router} />
      </AppInitializer>
      {/* <Toaster position="top-right" /> */}
      <Toaster
        position="top-right"
        toastOptions={{
          unstyled: false,
          classNames: {
            toast:
              "group toast rounded-xl border-2 p-4 shadow-lg flex items-center gap-3",
            title: "font-bold text-base",
            description: "!text-sm !font-bold !text-grey-800 opacity-90",
            success:
              "!bg-alerts-bg_success !border-alerts-success !text-alerts-success ",
            error:
              "!bg-alerts-bg_error !border-alerts-error !text-alerts-error",
            warning:
              "!bg-alerts-bg_warning !border-alerts-warning !text-alerts-warning",
            info: "!bg-alerts-bg_info !border-alerts-info !text-alerts-info",
          },
        }}
      />
    </Provider>
  </StrictMode>
);
