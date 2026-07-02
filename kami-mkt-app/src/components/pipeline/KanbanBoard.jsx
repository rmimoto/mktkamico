import { useRef } from 'react';
import { ST } from '../../constants';
import { useCards } from '../../hooks/useCards';
import useAppStore from '../../store/useAppStore';
import KanbanColumn from './KanbanColumn';

export default function KanbanBoard() {
  const { filteredByStatus, update } = useCards();
  const { openModal, filters } = useAppStore();
  const dragId = useRef(null);

  // Inject drag callbacks onto the drop handler so KanbanColumn can pass them to CardItem
  function makeDropHandler(statusId) {
    const handler = (toStatus) => {
      if (!dragId.current) return;
      if (dragId.current && toStatus !== undefined) {
        update(dragId.current, { status: toStatus }).catch(console.error);
        dragId.current = null;
      }
    };
    handler._dragStart = (id) => { dragId.current = id; };
    handler._dragEnd   = () => {};
    return handler;
  }

  const hasFilters = Object.values(filters).some(Boolean);

  return (
    <div className="kanban">
      {ST.map(status => {
        const cards = filteredByStatus(status.id);
        const drop  = makeDropHandler(status.id);
        drop._dragStart = (id) => { dragId.current = id; };
        drop._dragEnd   = () => {};
        return (
          <KanbanColumn
            key={status.id}
            status={status}
            cards={cards}
            onCardOpen={(id) => openModal(id)}
            onCardDrop={drop}
            onNewCard={(s) => openModal(null, s)}
          />
        );
      })}
    </div>
  );
}
