export type SortableItemProps = {
  id: string;
  label: string;
  code: string;
  type: ItemType;
  order: string;
  remove: (item: Item) => void;
};

export type EventListProps = {
  items: Item[];
  executionOrder: { [key: string]: number };
  updateLabel: (id: string, newLabel: string) => void;
  remove: (id: string) => void;
  setItems: (items: Item[]) => void;
};

export type ItemType = "Promise" | "setTimeout" | "setInterval" | "Synchronous" | "Promise with Timeout";

export type Item = {
  id: string;
  label: string;
  code: string;
  type: ItemType;
};
