import { ST2, TEAM } from '../../constants';
import { useRequests } from '../../hooks/useRequests';
import useAppStore from '../../store/useAppStore';

function fdate(d) {
  if (!d) return '—';
  const [y, m, dd] = d.split('-');
  return `${dd}/${m}/${y}`;
}

export default function RequestListView() {
  const { filtered } = useRequests();
  const { sort2, setSort2, openModal2 } = useAppStore();
  const requests = filtered();

  function SortTh({ field, children }) {
    const active = sort2.field === field;
    return (
      <th onClick={() => setSort2(field)}>
        {children} {active ? (sort2.dir === 'asc' ? '↑' : '↓') : ''}
      </th>
    );
  }

  return (
    <div className="list-wrap">
      <table className="ltable">
        <thead>
          <tr>
            <SortTh field="requestTitle">Título</SortTh>
            <th>Status</th>
            <SortTh field="nome">Solicitante</SortTh>
            <SortTh field="setor">Setor</SortTh>
            <SortTh field="bizUnit">Unidade</SortTh>
            <SortTh field="orderType">Tipo</SortTh>
            <SortTh field="desiredDate">Data desejada</SortTh>
            <th>Resp.</th>
          </tr>
        </thead>
        <tbody>
          {requests.map(req => {
            const st = ST2.find(s => s.id === req.status) || ST2[0];
            const members = TEAM.filter(t => req.responsible?.includes(t.id));
            return (
              <tr key={req.id} onClick={() => openModal2(req.id)}>
                <td style={{ fontWeight: 600, maxWidth: 240 }}>{req.requestTitle}</td>
                <td>
                  <span className="lstat">
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: st.color, display: 'inline-block', flexShrink: 0 }} />
                    {st.label}
                  </span>
                </td>
                <td>{req.nome || '—'}</td>
                <td>{req.setor || '—'}</td>
                <td>{req.bizUnit || '—'}</td>
                <td>{req.orderType || '—'}</td>
                <td>{fdate(req.desiredDate)}</td>
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
      {requests.length === 0 && (
        <div style={{ textAlign: 'center', padding: 40, color: 'var(--t3)' }}>
          Nenhuma solicitação encontrada.
        </div>
      )}
    </div>
  );
}
