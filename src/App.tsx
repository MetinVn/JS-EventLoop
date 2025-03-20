import About from "./components/About";
import EventLoopVisualizer from "./components/EventLoop";
import { Item } from "./types/types";

export const initialEvents: Item[] = [
  {
    id: "1",
    type: "Promise",
    label: "Promise event (Micro Task Queue)",
    code: `Promise.resolve().then(() => console.log("asynchronous execution"))`,
  },
  {
    id: "2",
    type: "setTimeout",
    label: "setTimeout event (Macro Task Queue)",
    code: `setTimeout(() => console.log("asynchronous execution"), 0)`,
  },
  {
    id: "3",
    type: "setInterval",
    label: "setInterval event (Repeating Macro Task)",
    code: `setInterval(() => console.log("asynchronous execution"), 0)`,
  },
  {
    id: "4",
    type: "Synchronous",
    label: "Synchronous event (Immediate execution)",
    code: `console.log("Synchronous execution")`,
  },
];
export const additionalEvents: Item[] = [
  ...initialEvents,
  {
    id: "5",
    type: "Promise with Timeout",
    label: "Promise event with setTimeout",
    code: `Promise.resolve().then(() => { setTimeout(() => { console.log("asynchronous execution") }, 0) })`,
  },
];
function App() {
  return (
    <>
      <div className="min-h-screen bg-[#ffffff]">
        <EventLoopVisualizer />
        <About />
      </div>
    </>
  );
}

export default App;
