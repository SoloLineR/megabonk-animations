import { HoverProvider } from "../shared/context/HoverContext";
import HomePage from "../page/home-page/home-page";

export function AppProviders() {
  return (
    <HoverProvider>
      <HomePage />
    </HoverProvider>
  );
}
