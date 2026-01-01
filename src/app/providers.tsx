import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router";
import { router } from "./router";
import { queryClient } from "./queryClient";
import { HoverProvider } from "../shared/context/HoverContext";

export function AppProviders() {
  return (
    <QueryClientProvider client={queryClient}>
      <HoverProvider>
        <RouterProvider router={router} />
      </HoverProvider>
    </QueryClientProvider>
  );
}
