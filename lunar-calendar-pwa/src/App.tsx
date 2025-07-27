import { useEffect } from "react";
import LunarCalendar from "./components/LunarCalendar";
import { LunarCalendarUtils } from "./utils/lunarCalendar";
import "./App.css";

function App() {
  useEffect(() => {
    // Initialize the lunar calendar service early
    LunarCalendarUtils.initialize().catch((error) => {
      console.warn("Failed to initialize lunar calendar service:", error);
    });
  }, []);

  return <LunarCalendar />;
}

export default App;
