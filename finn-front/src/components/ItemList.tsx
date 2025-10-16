import ItemCard from '@/components/ItemCard';
import type {UserResponse} from "@/interfaces/authentication.ts";

interface ItemListProps {
  items: UserResponse[];
  onItemUpdate: () => void;
}

const ItemList = ({ items, onItemUpdate }: ItemListProps) => {
  if (items.length === 0) {
    return (
      <div className="empty-state">
        <h2>No items found</h2>
        <p>Start by creating your first item!</p>
        <a href="/new-item" className="btn-primary">
          Create New User
        </a>
      </div>
    );
  }

  return (
    <div className="item-list">
      <div className="items-grid">
        {items.map((item) => (
          <ItemCard
            key={item.id}
            item={item}
            onUpdate={onItemUpdate}
          />
        ))}
      </div>
    </div>
  );
};

export default ItemList;
