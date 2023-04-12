import { useDroppable, useDraggable } from "@dnd-kit/core";
import { Cross2Icon } from "@radix-ui/react-icons";
import {
  closestCenter,
  DndContext,
  MouseSensor,
  TouchSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import "./index.css";
import { ReactNode, SyntheticEvent, useState } from "react";

type itemType = {
  id: string;
  children?: ReactNode;
  label?: string;
  callback?: () => void;
};

export const Droppable = ({ id, children, label }: itemType) => {
  const { isOver, setNodeRef } = useDroppable({
    id: id,
  });

  return (
    <div
      ref={setNodeRef}
      className={`border border-gray3 rounded-lg grow w-full p-4 bg-gray2 ${
        isOver ? "bg-blue-100" : null
      }`}
    >
      <div className="text-neutral-400 font-medium">{label}</div>
      <div className="">{children}</div>
    </div>
  );
};

export const Draggable = ({ id, children, callback }: itemType) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
  });
  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="flex items-center rounded border border-black bg-gray1 text-gray11 justify-between my-4 px-2"
    >
      <div className="p-2 text-center ">{children}</div>
      <button onClick={callback}>
        <Cross2Icon />
      </button>
    </div>
  );
};

export default function App() {
  const [value, setValue] = useState("");
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: { delay: 50, tolerance: 10 },
    }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 100, tolerance: 10 },
    }),
    useSensor(KeyboardSensor, {
      keyboardCodes: {
        start: ["Space"],
        cancel: ["Escape"],
        end: ["Space"],
      },
    })
  );

  // DropZones
  const containers = ["To Do", "In Progress", "Done"];

  // Items
  const [items, setItems] = useState([
    { parent: "To Do", value: "x-3", id: crypto.randomUUID() },
    { parent: "To Do", value: "2x-4", id: crypto.randomUUID() },
    { parent: "To Do", value: "x^2-9", id: crypto.randomUUID() },
  ]);

  // Add new Item
  const addNewItem = (e: SyntheticEvent) => {
    e.preventDefault();
    setItems([
      ...items,
      {
        parent: "To Do",
        value: value,
        id: crypto.randomUUID(),
      },
    ]);
    setValue("");
  };

  return (
    <div className="bg-gray1 h-screen px-6 py-4 flex flex-col">
      <div className="  mb-8 bg-gray2 rounded max-w-2xl">
        <form onSubmit={addNewItem} className="w-full flex">
          <input
            placeholder="Insert the item here"
            className="bg-gray3 w-full rounded py-2 px-2 placeholder:italic focus:outline-none text-gray9"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            type="text"
          />
          <button className="bg-blue-600 px-4 text-white">add</button>
        </form>
      </div>
      <div className="grow flex justify-between gap-2">
        <DndContext
          onDragEnd={(e) =>
            setItems(
              items.map((item) =>
                item.id === e.active.id
                  ? { ...item, parent: e.over!.id.toString() }
                  : item
              )
            )
          }
          sensors={sensors}
          collisionDetection={closestCenter}
        >
          {containers.map((id) => (
            <Droppable key={id} id={id} label={id}>
              {items.map((item) => {
                return item.parent === id ? (
                  <Draggable
                    key={item.id}
                    id={item.id}
                    callback={() =>
                      setItems(
                        items.filter((current) => {
                          return current.id !== item.id;
                        })
                      )
                    }
                  >
                    {item.value}
                  </Draggable>
                ) : null;
              })}
            </Droppable>
          ))}
        </DndContext>
      </div>
    </div>
  );
}
