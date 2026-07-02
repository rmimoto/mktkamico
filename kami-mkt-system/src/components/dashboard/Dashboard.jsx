import { useCards } from '../../hooks/useCards';
import { useRequests } from '../../hooks/useRequests';
import { TEAM, PROJ, CTYPES, BIZ_UNITS, ORDER_TYPES, SECTORS } from '../../constants';

function BarChart({ title, rows, maxVal }) {
  const BAR_COLORS = ['#6366f1', '#f59e0b', '#06b6d4', '#22c55e'];
  return (
    <div className="chart-box">
      <div className="chart-title">{title}</div>
      {rows.length === 0 && (
        <div style={{ color: 'var(--t3)', fontSize: 11 }}>Sem dados</div>
      )}
      {rows.map((row, i) => (
        <div className="bar-row" key={row.label}>
          <span className="bar-label" title={row.label}>{row.label}</span>
          <div className="bar-track">
            <div
              className="bar-seg"
              style={{
                width: maxVal ? `${(row.value / maxVal) * 100}%` : '0%',
                background: BAR_COLORS[i % BAR_COLORS.length],
              }}
            />
          </div>
          <span className="bar-num">{row.value}</span>
        </div>
      ))}
    </div>
  );
}

function KpiCard({ value, label, color = 'var(--ac)' }) {
  return (
    <div className="kpi">
      <div className="kpi-val" style={{ color }}>{value}</div>
      <div className="kpi-label">{label}</div>
    </div>
  );
}

function buildRows(items, key) {
  const counts = {};
  items.forEach(item => {
    const val = item[key];
    if (!val) return;
    counts[val] = (counts[val] || 0) + 1;
  });
  return Object.entries(counts)
    .map(([label, value]) => ({ label, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 8);
}

function buildResponsibleRows(cards) {
  const counts = {};
  cards.forEach(c => {
    (c.responsible || []).forEach(rid => {
      const member = TEAM.find(t => t.id === rid);
      if (!member) return;
      counts[member.name] = (counts[member.name] || 0) + 1;
    });
  });
  return Object.entries(counts)
    .map(([label, value]) => ({ label, value }))
    .sort((a, b) => b.value - a.value);
}

export default function Dashboard() {
  const { cards, stats: cs }    = useCards();
  const { requests, stats: rs } = useRequests();

  const respRows    = buildResponsibleRows(cards);
  const projRows    = buildRows(cards, 'project');
  const typeRows    = buildRows(cards, 'contentType');
  const unitRows    = buildRows(requests, 'bizUnit');
  const orderRows   = buildRows(requests, 'orderType');
  const sectorRows  = buildRows(requests, 'setor');

  const maxResp   = Math.max(...respRows.map(r => r.value), 1);
  const maxProj   = Math.max(...projRows.map(r => r.value), 1);
  const maxType   = Math.max(...typeRows.map(r => r.value), 1);
  const maxUnit   = Math.max(...unitRows.map(r => r.value), 1);
  const maxOrder  = Math.max(...orderRows.map(r => r.value), 1);
  const maxSector = Math.max(...sectorRows.map(r => r.value), 1);

  return (
    <div className="dash">

      {/* ── KPIs Conteúdo ── */}
      <div className="dash-section">
        <div className="dash-section-title">Pipeline — Conteúdo</div>
        <div className="kpis">
          <KpiCard value={cs.total}    label="Total de cards"        color="var(--t1)" />
          <KpiCard value={cs.done}     label="Concluídos"            color="#22c55e" />
          <KpiCard value={cs.progress} label="Em andamento"          color="#f59e0b" />
          <KpiCard value={cs.review}   label="Revisão / Aprovação"   color="#06b6d4" />
        </div>
      </div>

      {/* ── KPIs Solicitações ── */}
      <div className="dash-section">
        <div className="dash-section-title">Pipeline — Solicitações</div>
        <div className="kpis">
          <KpiCard value={rs.total}    label="Total de solicitações" color="var(--t1)" />
          <KpiCard value={rs.done}     label="Concluídas"            color="#22c55e" />
          <KpiCard value={rs.progress} label="Em andamento"          color="#f59e0b" />
        </div>
      </div>

      {/* ── Gráficos ── */}
      <div className="charts">
        <BarChart title="Por responsável"       rows={respRows}   maxVal={maxResp}   />
        <BarChart title="Por projeto"           rows={projRows}   maxVal={maxProj}   />
        <BarChart title="Por tipo de conteúdo"  rows={typeRows}   maxVal={maxType}   />
        <BarChart title="Por unidade de negócio" rows={unitRows}  maxVal={maxUnit}   />
        <BarChart title="Por tipo de pedido"    rows={orderRows}  maxVal={maxOrder}  />
        <BarChart title="Por setor solicitante" rows={sectorRows} maxVal={maxSector} />
      </div>

    </div>
  );
}
