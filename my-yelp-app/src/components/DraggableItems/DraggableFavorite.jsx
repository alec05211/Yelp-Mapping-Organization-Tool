import { useDrag } from 'react-dnd';

function DraggableFavorite({ biz, onClick }) {
  const [{ isDragging }, drag] = useDrag({
    type: 'FAVORITE',
    item: { id: biz._id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <button
      ref={drag}
      className="collection-item-btn"
      style={{ opacity: isDragging ? 0.5 : 1 }}
      onClick={onClick}
    >
      {biz.name}
    </button>
  );
}
export default DraggableFavorite;