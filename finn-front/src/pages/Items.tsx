import ItemList from '@/components/ItemList';
import useGetUsers from "@/hooks/useGetUsers.tsx";

export interface Item {
  id: string;
  title: string;
  description: string;
  price?: number;
  createdAt: string;
}

const Items = () => {
  const { data, isLoading, isError, refetch } = useGetUsers();

  if (isLoading) {
    return (
      <div className="page-container">
        <div className="loading">Loading items...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="page-container">
        <div className="error">
          <p>Failed to fetch items. Please try again later.</p>
          <button onClick={() => refetch()} className="retry-btn">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Items</h1>
        <p>Manage your items collection</p>
      </div>
      <ItemList items={data || []} onItemUpdate={() => refetch()} />
    </div>
  );
};

export default Items;
