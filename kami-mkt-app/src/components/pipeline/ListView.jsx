import { ST, TEAM } from '../../constants';
import { useCards } from '../../hooks/useCards';
import useAppStore from '../../store/useAppStore';

function fdate(d) {
  if (!d) return '—';
  const [y, m, dd] = d.split('-');
  return `${dd}/${m}/${y}`;
}

export default function ListView() {
  const { filtered } = useCards();
  const { sort, setSort, openModal } = useAppStore();

  const cards = filtered();

  function SortTh({ field, children }) {
    const active = sort.field === field;
    return (
      <th onClick={() => setSort(field)}>
        {children} {active ? (sort.dir === 'asc' ? '↑' : '↓') : ''}
      </th>
    );
  }

  return (
    <div className="list-wrap">
      <table className="ltable">
        <thead>
          <tr>
            <SortTh field="title">Título</SortTh>
            <th>Status</th>
            <SortTh field="project">Projeto</SortTh>
            <th>Tipo</th>
            <th>Funil</th>
            <SortTh field="publishDate">Publicação</SortTh>
            <SortTh field="deliveryDate">Entrega</SortTh>
            <th>Resp.</th>
          </tr>
        </thead>
        <tbody>
          {cards.map(card => {
            const st = ST.find(s => s.id === card.status) || ST[0];
            const members = TEAM.filter(t => card.responsible?.includes(t.id));
            return (
              <tr key={card.id} onClick={() => openModal(card.id)}>
                <td style={{ fontWeight: 600, maxWidth: 260 }}>{card.title}</td>
                <td>
                  <span className="lstat">
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: st.color, display: 'inline-block', flexShrink: 0 }} />
                    {st.label}
                  </span>
                </td>
                <td>{card.project || '—'}</td>
                <td>{card.contentType || '—'}</td>
                <td>{card.funnel || '—'}</td>
                <td>{fdate(card.publishDate)}</td>
                <td>{fdate(card.deliveryDate)}</td>
                <td>
                  <div style={{ display: 'flex', gap: 3 }}>
                    {members.map(m => (
                      <div
                        key={m.id}
                        title={m.name}
                        style={{
                          width: 18, height: 18, borderRadius: '50%',
                          background: m.color, display: 'flex',
                          alignItems: 'center', justifyContent: 'center',
                          fontSize: 7, fontWeight: 800, color: '#fff',
                        }}
                      >
                        {m.initials}
                      </div>
                    ))}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {cards.length === 0 && (
        <div style={{ textAlign: 'center', padding: 40, color: 'var(--t3)' }}>Nenhum card encontrado.</div>
      )}
    </div>
  );
}
