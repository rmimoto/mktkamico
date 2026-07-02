import { useRef } from 'react';
import { useState } from 'react';
import { ST2 } from '../../constants';
import { useRequests } from '../../hooks/useRequests';
import useAppStore from '../../store/useAppStore';
import RequestItem from './RequestItem';

function RequestColumn({ status, requests, onOpen, onDrop, onNew, dragId }) {
  const [dragOver, setDragOver] = useState(false);

  return (
    <div className="kcol">
      <div className="khead">
        <div className="kdot" style={{ background: status.color }} />
        <span className="ktitle">{status.label}</span>
        <span className="kcount">{requests.length}</span>
        <button className="kadd" onClick={() => onNew(status.id)} title="Nova solicitação nesta coluna">+</button>
      </div>

      <div
        className={`kcards${dragOver ? ' drag-over' : ''}`}
        onDragOver={e => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={e => { e.preventDefault(); setDragOver(false); onDrop(status.id); }}
      >
        {requests.length === 0 ? (
          <div className="kempty">
            <span className="kempty-icon">📋</span>
            <span className="kempty-txt">Sem solicitações</span>
          </div>
        ) : (
          requests.map(req => (
            <RequestItem
              key={req.id}
              req={req}
              onOpen={onOpen}
              onDragStart={id => { dragId.current = id; }}
              onDragEnd={() => {}}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default function RequestBoard() {
  const { filteredByStatus, update } = useRequests();
  const { openModal2 } = useAppStore();
  const dragId = useRef(null);

  function handleDrop(toStatus) {
    if (!dragId.current) return;
    update(dragId.current, { status: toStatus }).catch(console.error);
    dragId.current = null;
  }

  return (
    <div className="kanban">
      {ST2.map(status => (
        <RequestColumn
          key={status.id}
          status={status}
          requests={filteredByStatus(status.id)}
          onOpen={id => openModal2(id)}
          onDrop={handleDrop}
          onNew={s => openModal2(null, s)}
          dragId={dragId}
        />
      ))}
    </div>
  );
}
