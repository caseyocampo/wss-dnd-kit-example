import { useState } from "react";
import { DndContext, KeyboardSensor, PointerSensor, useSensor, useSensors, closestCorners } from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { Column } from "./components/Column";
import "./App.css";

export default function App() {
  // Sample data
  const [items, setItems] = useState([
    { id: 1, title: "Product description 1" },
    { id: 2, title: "Product description 2" },
    { id: 3, title: "Product description 3" },
  ]);

  // Create sensors for pointer and keyboard events
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // This function returns the index of an item in the items array
  const getItemPosition = (id) => items.findIndex((item) => item.id === id);

  // This function is called when the drag operation ends
  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id === over.id) return;

    setItems((items) => {
      const originalPosition = getItemPosition(active.id);
      const newPosition = getItemPosition(over.id);

      return arrayMove(items, originalPosition, newPosition);
    });
  };

  return (
    <div className="App">
      <h1>DND Kit Demo</h1>

      {/* DndContext is the root component for drag and drop operations */}
      <DndContext sensors={sensors} collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
        <Column items={items} />
      </DndContext>
    </div>
  );
}
