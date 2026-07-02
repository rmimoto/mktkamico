import { TEAM } from '../../constants';
import Avatar from '../ui/Avatar';

function fdate(d) {
  if (!d) return '—';
  const [, m, dd] = d.split('-');
  return `${dd}/${m}`;
}

const TYPE_CLS = { Reel: 't-r', Carrossel: 't-c', 'Estático': 't-s', 'Vídeo': 't-v', Storie: 't-st' };
const FUNNEL_CLS = { Topo: 't-top', Meio: 't-mid', Fundo: 't-bot' };

export default function CardItem({ card, onOpen, onDragStart, onDragEnd }) {
  const members = TEAM.filter(t => card.responsible?.includes(t.id));

  return (
    <div
      className="card"
      draggable
      onClick={() => onOpen(card.id)}
      onDragStart={e => { e.dataTransfer.effectAllowed = 'move'; onDragStart(card.id); }}
      onDragEnd={onDragEnd}
    >
      <div className="ctitle">{card.title}</div>

      <div className="ctags">
        {card.project     && <span className="tag t-proj">{card.project}</span>}
        {card.contentType && <span className={`tag ${TYPE_CLS[card.contentType] || 't-s'}`}>{card.contentType}</span>}
        {card.funnel      && <span className={`tag ${FUNNEL_CLS[card.funnel] || ''}`}>{card.funnel}</span>}
        {card.channel?.slice(0, 2).map(ch => (
          <span key={ch} className="tag t-ot">{ch}</span>
        ))}
        {card.channel?.length > 2 && (
          <span className="tag t-ot">+{card.channel.length - 2}</span>
        )}
      </div>

      {(card.deliveryDate || card.publishDate) && (
        <div className="cdates">
          {card.deliveryDate && <span className="cdate">📅 {fdate(card.deliveryDate)}</span>}
          {card.publishDate  && <span className="cdate">🚀 {fdate(card.publishDate)}</span>}
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
