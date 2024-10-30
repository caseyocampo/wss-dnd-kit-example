import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { Item } from "./Item";

export const Column = ({ items }) => {
  return (
    <div className="column">
      {/* SortableContext is a container for sortable items */}
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {items.map((item, index) => (
          <Item key={item.id} id={item.id} title={item.title} ariaDescribedById={`item-${index}`} />
        ))}
      </SortableContext>
    </div>
  );
};
