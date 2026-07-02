import { ST, PROJ, CTYPES, FUNNELS, CHANNELS, TEAM } from '../../constants';
import { useCards } from '../../hooks/useCards';
import useAppStore from '../../store/useAppStore';

export default function FilterBar() {
  const { stats } = useCards();
  const { filters, setFilter, clearFilters } = useAppStore();
  const hasFilters = Object.values(filters).some(Boolean);

  return (
    <>
      <div className="filters">
        <span className="flabel">Filtros</span>
        <input
          className="fsearch"
          placeholder="Buscar título..."
          value={filters.search}
          onChange={e => setFilter('search', e.target.value)}
        />
        <select className="fsel" value={filters.project} onChange={e => setFilter('project', e.target.value)}>
          <option value="">Projeto</option>
          {PROJ.map(p => <option key={p} value={p}>{p}</option>)}
        </select>
        <select className="fsel" value={filters.type} onChange={e => setFilter('type', e.target.value)}>
          <option value="">Tipo</option>
          {CTYPES.map(t => <option key={t} value={t}>{t}</option>)}
        </select>
        <select className="fsel" value={filters.funnel} onChange={e => setFilter('funnel', e.target.value)}>
          <option value="">Funil</option>
          {FUNNELS.map(f => <option key={f} value={f}>{f}</option>)}
        </select>
        <select className="fsel" value={filters.channel} onChange={e => setFilter('channel', e.target.value)}>
          <option value="">Canal</option>
          {CHANNELS.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <select className="fsel" value={filters.status} onChange={e => setFilter('status', e.target.value)}>
          <option value="">Status</option>
          {ST.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
        </select>
        <select className="fsel" value={filters.responsible} onChange={e => setFilter('responsible', e.target.value)}>
          <option value="">Responsável</option>
          {TEAM.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
        </select>
        {hasFilters && <button className="fclr" onClick={clearFilters}>✕ Limpar</button>}
      </div>

      <div className="stats">
        {[
          { label: 'Total', val: stats.total, color: 'var(--t3)' },
          { label: 'Concluídos', val: stats.done, color: '#22c55e' },
          { label: 'Em andamento', val: stats.progress, color: '#f59e0b' },
          { label: 'Em revisão', val: stats.review, color: '#06b6d4' },
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
