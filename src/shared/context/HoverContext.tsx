import {
  createContext,
  useReducer,
  useContext,
  type ReactNode,
  useState,
} from "react";

// ---- Типы ----
type HoverStateType = "idle" | "hovered";

interface HoverContextType {
  state: HoverStateType;
  hoveredItem: string | null;
  selectedItem: string | null;
  dispatch: (event: HoverEvent) => void;
  setSelectedItem: (item: string | null) => void;
}

type HoverEvent = { type: "HOVER"; item: string } | { type: "LEAVE" };

interface HoverMachine {
  state: HoverStateType;
  context: { hoveredItem: string | null };
}

// ---- State Machine ----
const hoverMachine = (
  current: HoverMachine,
  event: HoverEvent
): HoverMachine => {
  switch (current.state) {
    case "idle":
      if (event.type === "HOVER") {
        return { state: "hovered", context: { hoveredItem: event.item } };
      }
      return current;

    case "hovered":
      if (event.type === "LEAVE") {
        return { state: "idle", context: { hoveredItem: null } };
      }
      if (event.type === "HOVER") {
        return { state: "hovered", context: { hoveredItem: event.item } };
      }
      return current;

    default:
      return current;
  }
};

// ---- Context ----
const HoverContext = createContext<HoverContextType>({
  state: "idle",
  hoveredItem: null,
  selectedItem: null,
  dispatch: () => {},
  setSelectedItem: () => {},
});

// ---- Provider ----
export const HoverProvider = ({ children }: { children: ReactNode }) => {
  const [hover, dispatch] = useReducer(
    (current: HoverMachine, event: HoverEvent) => hoverMachine(current, event),
    { state: "idle", context: { hoveredItem: null } }
  );

  // Selected item для модалки
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  return (
    <HoverContext.Provider
      value={{
        state: hover.state,
        hoveredItem: hover.context.hoveredItem,
        selectedItem,
        dispatch,
        setSelectedItem,
      }}
    >
      {children}
    </HoverContext.Provider>
  );
};

// ---- Хук для удобного использования ----
export const useHover = () => useContext(HoverContext);
