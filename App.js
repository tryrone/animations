import { SafeAreaView } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import DragToSort from "./googleChromeTiles/DragToSort";

export default function App() {
  const MARGIN = 20;
  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{ flex: 1, backgroundColor: "black", paddingHorizontal: MARGIN }}
      >
        <DragToSort />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
