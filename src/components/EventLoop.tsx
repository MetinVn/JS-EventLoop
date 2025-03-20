import { useState, ReactNode } from "react";
import { DndContext, closestCenter, useSensor, useSensors, TouchSensor, MouseSensor, DragEndEvent } from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import gsap from "gsap";
import SortableItem from "./SortableItem";
import { Item, ItemType } from "../types/types";
import { additionalEvents, initialEvents } from "../App";
import { LuZap, LuHourglass, LuRefreshCcw, LuFastForward, LuRepeat } from "react-icons/lu";

const getExecutionIcon = (type: ItemType): ReactNode => {
  switch (type) {
    case "Synchronous":
      return <LuZap className="inline-block text-yellow-500" />;
    case "setTimeout":
      return <LuHourglass className="inline-block text-blue-500" />;
    case "Promise":
      return <LuRefreshCcw className="inline-block text-green-500" />;
    case "Promise with Timeout":
      return <LuFastForward className="inline-block text-purple-500" />;
    case "setInterval":
      return <LuRepeat className="inline-block text-red-500" />;
    default:
      return null;
  }
};

function EventLoopVisualizer() {
  const [syncLogs, setSyncLogs] = useState<ReactNode[]>([]);
  const [asyncLogs, setAsyncLogs] = useState<ReactNode[]>([]);
  const [runCount, setRunCount] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);

  const [eventLimitError, setEventLimitError] = useState("");
  const [emptyExecutionListError, setEmptyExecutionListError] = useState("");

  const [executionOrder, setExecutionOrder] = useState<{ [key: string]: number }>({});

  const [executing, setExecuting] = useState(false);
  const [items, setItems] = useState<Item[]>(initialEvents);

  const [canAddEvent, setCanAddEvent] = useState(true);
  const [cantAddEventWhileRunningError, setCanAddEventWhileRunningError] = useState("");

  const addItem = (item: Item) => {
    if (!canAddEvent) {
      setCanAddEventWhileRunningError("Can't add events while function is running");
      return;
    }

    if (items.length < 10) {
      const uniqueItem = { ...item, id: `${item.id}-${Date.now()}` };
      setItems((prev) => [...prev, uniqueItem]);
      setEventLimitError("");
      setEmptyExecutionListError("");
      setCanAddEventWhileRunningError("");
    } else {
      setEventLimitError("Max event limit is 10");
    }
  };

  const removeItem = (item: Item) => {
    setItems((prev) => prev.filter((prevItem) => prevItem.id !== item.id));
  };

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setItems((prevItems) => {
        const oldIndex = prevItems.findIndex((item) => item.id === active.id);
        const newIndex = prevItems.findIndex((item) => item.id === over.id);
        return arrayMove(prevItems, oldIndex, newIndex);
      });
    }
  }

  const runExample = () => {
    setCanAddEvent(false);
    setExecuting(true);

    if (items.length <= 0) {
      setExecuting(false);
      setEmptyExecutionListError("Add events to execute");
      setCanAddEvent(true);
      return;
    }
    setEmptyExecutionListError("");
    setRunCount((prev) => prev + 1);
    setSyncLogs([]);
    setAsyncLogs([]);
    setExecutionOrder({});

    let execOrder = 1;
    const timeline = gsap.timeline({
      onComplete: () => {
        setExecuting(false);
        setCanAddEvent(true);
      },
    });
    const newExecutionOrder: { [key: string]: number } = {};

    items.forEach((item) => {
      const animateExecution = () => {
        gsap.to(`#item-${item.id}`, {
          duration: 0.2,
          backgroundColor: "#ffeb3b",
          ease: "power1.inOut",
          onComplete: () => {
            gsap.to(`#item-${item.id}`, {
              duration: 0.2,
              backgroundColor: "#e0e0e0",
              ease: "power1.inOut",
            });
          },
        });
      };

      const addLogWithAnimation = (message: ReactNode, isAsync: boolean) => {
        timeline.to({}, { duration: 0.3 }).call(() => {
          animateExecution();
          newExecutionOrder[item.id] = execOrder++;
          setExecutionOrder({ ...newExecutionOrder });
          if (isAsync) {
            setAsyncLogs((prev) => [...prev, message]);
          } else {
            setSyncLogs((prev) => [...prev, message]);
          }
        });
      };

      if (item.type === "Synchronous") {
        addLogWithAnimation(
          <span>
            {getExecutionIcon("Synchronous")} {item.label} executed
          </span>,
          false
        );
      }

      if (item.type === "setTimeout") {
        setTimeout(() => {
          addLogWithAnimation(
            <span>
              {getExecutionIcon("setTimeout")} {item.label} executed
            </span>,
            true
          );
        }, 0);
      }

      if (item.type === "Promise" || item.type === "Promise with Timeout") {
        Promise.resolve().then(() => {
          if (item.type === "Promise with Timeout") {
            setTimeout(() => {
              addLogWithAnimation(
                <span>
                  {getExecutionIcon("Promise with Timeout")} {item.label} executed
                </span>,
                true
              );
            }, 0);
          } else {
            addLogWithAnimation(
              <span>
                {getExecutionIcon("Promise")} {item.label} executed
              </span>,
              true
            );
          }
        });
      }

      if (item.type === "setInterval") {
        let intervalCount = 0;
        const interval = setInterval(() => {
          if (intervalCount < 1) {
            addLogWithAnimation(
              <span>
                {getExecutionIcon("setInterval")} {item.label} executed
              </span>,
              true
            );
            intervalCount++;
          } else {
            clearInterval(interval);
          }
        }, 0);
      }
    });
  };

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 3 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 150, tolerance: 5 } })
  );

  return (
    <div className="px-8 py-6 max-w-4xl mx-auto text-sm">
      <header className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">JS Event Loop Visualizer</h1>
        <p className="mt-2 text-lg text-gray-600">
          Drag and drop events to adjust their order. Then click <span className="font-semibold">Run</span> to see them execute naturally
          with animated highlights and sequential logs. Logs are divided into synchronous and asynchronous sections.
        </p>
      </header>

      {emptyExecutionListError ? (
        <span className="block mb-6 text-red-500">{emptyExecutionListError}</span>
      ) : (
        items.length > 0 && (
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={items.map((item) => item.id)} strategy={verticalListSortingStrategy}>
              <div className="space-y-2">
                {items.map((item) => (
                  <SortableItem
                    key={item.id}
                    id={item.id}
                    label={item.label}
                    code={item.code}
                    type={item.type}
                    remove={removeItem}
                    order={`${executionOrder[item.id] ? `#${executionOrder[item.id]} ` : ""}${item.label}`}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        )
      )}

      <section className="mt-8">
        <h2 className="text-lg font-semibold text-gray-800">Manage Events</h2>
        <button
          onClick={() => setModalOpen(!modalOpen)}
          className="mt-3 px-4 py-2 bg-transparent border border-gray-400 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors duration-200">
          Add Event
        </button>
        {modalOpen && (
          <div className="bg-white ml-4 p-4 border rounded-lg mt-4 inline-grid gap-3 shadow-sm">
            <p className="text-gray-600">Select an event:</p>
            <div className="grid grid-cols-2 gap-2">
              {additionalEvents.map((item) => (
                <button
                  key={item.id}
                  onClick={() => addItem(item)}
                  className="px-3 py-1 bg-transparent border border-gray-400 rounded hover:bg-gray-300 text-xs transition-colors duration-200">
                  {item.label}
                </button>
              ))}
            </div>
            {eventLimitError && <span className="text-red-500">{eventLimitError}</span>}
            {cantAddEventWhileRunningError && <span className="text-red-500">{cantAddEventWhileRunningError}</span>}
          </div>
        )}
      </section>

      <section className="mt-8 flex items-center gap-6">
        <button
          disabled={executing}
          onClick={runExample}
          className="px-5 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 disabled:opacity-50 transition-colors duration-200 shadow-md">
          {executing ? (
            <div className="flex items-center justify-center animate-spin border border-dashed p-2 rounded-full bg-indigo-500"></div>
          ) : (
            "Run"
          )}
        </button>
        <span className="font-semibold text-gray-700 text-lg">Runs: {runCount}</span>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-semibold text-gray-800">Execution Logs</h2>
        <div className="flex flex-col md:flex-row gap-6 mt-4 p-6 bg-gray-50 rounded-lg shadow-inner min-h-[100px]">
          <section className="flex-1">
            <h3 className="text-sm font-semibold text-gray-800 mb-2">Sync Logs</h3>
            <div className="p-3 bg-gray-800 text-white border border-gray-700 rounded min-h-[80px] overflow-auto text-xs">
              {syncLogs.length > 0 ? syncLogs.map((log, i) => <p key={i}>{log}</p>) : <p className="text-gray-400 italic">No sync logs</p>}
            </div>
          </section>
          <section className="flex-1">
            <h3 className="text-sm font-semibold text-gray-800 mb-2">Async Logs</h3>
            <div className="p-3 bg-gray-800 text-white border border-gray-700 rounded min-h-[80px] overflow-auto text-xs">
              {asyncLogs.length > 0 ? (
                asyncLogs.map((log, i) => <p key={i}>{log}</p>)
              ) : (
                <p className="text-gray-400 italic">No async logs</p>
              )}
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}

export default EventLoopVisualizer;
