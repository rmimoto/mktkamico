import { useState } from 'react';
import CardItem from './CardItem';

export default function KanbanColumn({ status, cards, onCardOpen, onCardDrop, onNewCard }) {
  const [dragOver, setDragOver] = useState(false);

  return (
    <div className="kcol">
      <div className="khead">
        <div className="kdot" style={{ background: status.color }} />
        <span className="ktitle">{status.label}</span>
        <span className="kcount">{cards.length}</span>
        <button className="kadd" onClick={() => onNewCard(status.id)} title="Novo card nesta coluna">+</button>
      </div>

      <div
        className={`kcards${dragOver ? ' drag-over' : ''}`}
        onDragOver={e => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={e => { e.preventDefault(); setDragOver(false); onCardDrop(status.id); }}
      >
        {cards.length === 0 ? (
          <div className="kempty">
            <span className="kempty-icon">📋</span>
            <span className="kempty-txt">Sem cards</span>
          </div>
        ) : (
          cards.map(card => (
            <CardItem
              key={card.id}
              card={card}
              onOpen={onCardOpen}
              onDragStart={onCardDrop._dragStart}
              onDragEnd={onCardDrop._dragEnd}
            />
          ))
        )}
      </div>
    </div>
  );
}
