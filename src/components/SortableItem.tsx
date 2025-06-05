import { useSortable, defaultAnimateLayoutChanges } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { SortableItemProps } from "../types/types";

export default function SortableItem({ id, label, code, type, order, remove }: SortableItemProps) {
  const animateLayoutChanges = (args: Parameters<typeof defaultAnimateLayoutChanges>[0]) => {
    const { isSorting, wasDragging } = args;
    if (wasDragging && !isSorting) {
      return false;
    }
    return defaultAnimateLayoutChanges(args);
  };

  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id, animateLayoutChanges });

  const maxDragX = 500;
  const maxDragY = 500;
  const clampedTransform = transform
    ? {
        x: Math.max(Math.min(transform.x, maxDragX), -maxDragX),
        y: Math.max(Math.min(transform.y, maxDragY), -maxDragY),
        scaleX: transform.scaleX,
        scaleY: transform.scaleY,
      }
    : transform;

  const style = {
    transform: CSS.Transform.toString(clampedTransform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      id={`item-${id}`}
      style={{ ...style, touchAction: "none" }}
      className="p-2 bg-gray-100 rounded-md cursor-grab flex items-center justify-between text-xs"
    >
      <div className="flex-1 grid grid-cols-[auto,1fr] gap-2 items-center">
        <div>
          <strong className="block">{order}</strong>
          <pre className="mt-1 text-[10px] font-mono whitespace-pre-wrap text-gray-600">{code}</pre>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span className="px-2 py-1 bg-gray-300 rounded text-gray-800">{type}</span>
        <button
          onMouseDown={(e) => e.stopPropagation()}
          onClick={(e) => {
            e.stopPropagation();
            remove({ id, label, code, type });
          }}
          className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
