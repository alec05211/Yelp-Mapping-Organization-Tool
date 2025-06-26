import { useDrop } from 'react-dnd';

function DroppableFolder({ folder, onDrop, onClick }) {
  const [{ isOver }, drop] = useDrop({
    accept: 'FAVORITE',
    drop: (item) => onDrop(item.id, folder._id),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <button
      ref={drop}
      className="collection-item-btn"
      style={{ background: isOver ? '#d1f0d1' : undefined }}
      onClick={onClick}
    >
      <span role="img" aria-label="folder">📁</span> {folder.name}
    </button>
  );
}

export default DroppableFolder;