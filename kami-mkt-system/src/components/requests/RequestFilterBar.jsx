import { ST2, BIZ_UNITS, ORDER_TYPES } from '../../constants';
import { useRequests } from '../../hooks/useRequests';
import useAppStore from '../../store/useAppStore';

export default function RequestFilterBar() {
  const { stats } = useRequests();
  const { filters2, setFilter2, clearFilters2 } = useAppStore();
  const hasFilters = Object.values(filters2).some(Boolean);

  return (
    <>
      <div className="filters">
        <span className="flabel">Filtros</span>
        <input
          className="fsearch"
          placeholder="Buscar título..."
          value={filters2.search}
          onChange={e => setFilter2('search', e.target.value)}
        />
        <select className="fsel" value={filters2.unit} onChange={e => setFilter2('unit', e.target.value)}>
          <option value="">Unidade</option>
          {BIZ_UNITS.map(b => <option key={b} value={b}>{b}</option>)}
        </select>
        <select className="fsel" value={filters2.orderType} onChange={e => setFilter2('orderType', e.target.value)}>
          <option value="">Tipo de pedido</option>
          {ORDER_TYPES.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
        <select className="fsel" value={filters2.status} onChange={e => setFilter2('status', e.target.value)}>
          <option value="">Status</option>
          {ST2.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
        </select>
        {hasFilters && <button className="fclr" onClick={clearFilters2}>✕ Limpar</button>}
      </div>

      <div className="stats">
        {[
          { label: 'Total', val: stats.total, color: 'var(--t3)' },
          { label: 'Concluídas', val: stats.done, color: '#22c55e' },
          { label: 'Em andamento', val: stats.progress, color: '#f59e0b' },
        ].map(s => (
          <div key={s.label} className="stat">
            <div className="sdot" style={{ background: s.color }} />
            <strong>{s.val}</strong> {s.label}
          </div>
        ))}
      </div>
    </>
  );
}
