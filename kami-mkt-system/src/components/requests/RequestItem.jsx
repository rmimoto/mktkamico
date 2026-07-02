import { TEAM } from '../../constants';

function fdate(d) {
  if (!d) return '—';
  const parts = d.split('-');
  return `${parts[2]}/${parts[1]}`;
}

export default function RequestItem({ req, onOpen, onDragStart, onDragEnd }) {
  const members = TEAM.filter(t => req.responsible?.includes(t.id));

  return (
    <div
      className="card"
      draggable
      onClick={() => onOpen(req.id)}
      onDragStart={e => { e.dataTransfer.effectAllowed = 'move'; onDragStart(req.id); }}
      onDragEnd={onDragEnd}
    >
      <div className="ctitle">{req.requestTitle || req.nome}</div>

      <div className="ctags">
        {req.bizUnit   && <span className="tag t-bu">{req.bizUnit}</span>}
        {req.orderType && <span className="tag t-ot">{req.orderType}</span>}
        {req.deliveryMethod && (
          <span className={`tag ${req.deliveryMethod === 'WhatsApp' ? 't-via-w' : 't-via-e'}`}>
            {req.deliveryMethod}
          </span>
        )}
        {req.setor && (
          <span className="tag" style={{ background: 'rgba(90,81,82,.3)', color: 'var(--t2)' }}>
            {req.setor}
          </span>
        )}
      </div>

      {(req.desiredDate || req.nome) && (
        <div className="cdates">
          {req.desiredDate && <span className="cdate">📅 {fdate(req.desiredDate)}</span>}
          {req.nome && <span className="cdate" style={{ color: 'var(--t3)' }}>{req.nome}</span>}
        </div>
      )}

      {members.length > 0 && (
        <div className="cresps">
          {members.map(m => (
            <div
              key={m.id}
              title={m.name}
              style={{
                width: 20, height: 20, borderRadius: '50%',
                background: m.color, display: 'flex',
                alignItems: 'center', justifyContent: 'center',
                fontSize: 8, fontWeight: 800, color: '#fff',
              }}
            >
              {m.initials}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
