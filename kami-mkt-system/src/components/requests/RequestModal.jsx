import { useState, useEffect } from 'react';
import { ST2, SECTORS, BIZ_UNITS, ORDER_TYPES, DELIVERY, TEAM } from '../../constants';
import { useRequests } from '../../hooks/useRequests';
import useAppStore from '../../store/useAppStore';

const EMPTY = {
  nome: '', telefone: '', email: '', setor: '', bizUnit: '',
  requestTitle: '', orderType: '', desiredDate: '', deliveryMethod: '',
  details: '', attachmentName: '', status: 'triage', responsible: [],
};

export default function RequestModal() {
  const { requests, create, update, remove } = useRequests();
  const { modal2, closeModal2 } = useAppStore();

  const existing = modal2.id ? requests.find(r => r.id === modal2.id) : null;
  const [form, setForm]     = useState(EMPTY);
  const [saving, setSaving] = useState(false);
  const [error, setError]   = useState('');

  useEffect(() => {
    if (!modal2.open) return;
    setForm(
      existing
        ? {
            ...EMPTY, ...existing,
            responsible: existing.responsible || [],
          }
        : { ...EMPTY, status: modal2.defStatus }
    );
    setError('');
  }, [modal2.open, modal2.id]);

  if (!modal2.open) return null;

  function set(key, val) { setForm(f => ({ ...f, [key]: val })); }

  function toggleResp(id) {
    setForm(f => ({
      ...f,
      responsible: f.responsible.includes(id)
        ? f.responsible.filter(x => x !== id)
        : [...f.responsible, id],
    }));
  }

  async function handleSave() {
    const required = ['nome', 'telefone', 'email', 'setor', 'bizUnit', 'requestTitle', 'orderType', 'desiredDate', 'deliveryMethod', 'details'];
    const missing = required.find(k => !form[k]?.trim());
    if (missing) { setError('Preencha todos os campos obrigatórios (*).'); return; }

    setSaving(true); setError('');
    try {
      const { id: _id, createdAt: _ca, createdBy: _cb, updatedAt: _ua, ...data } = form;
      if (existing) await update(existing.id, data);
      else          await create(data);
      closeModal2();
    } catch (e) {
      setError('Erro ao salvar. Tente novamente.');
      console.error(e);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!existing) return;
    if (!confirm('Excluir esta solicitação?')) return;
    await remove(existing.id);
    closeModal2();
  }

  return (
    <div className="overlay" onClick={e => e.target === e.currentTarget && closeModal2()}>
      <div className="modal modal-lg">

        {/* ── Header ── */}
        <div className="mhead">
          <h2>{existing ? 'Editar Solicitação' : 'Nova Solicitação'}</h2>
          <button className="mclose" onClick={closeModal2}>✕</button>
        </div>

        {/* ── Body — tudo em uma única tela ── */}
        <div className="mbody" style={{ maxHeight: '70vh', overflowY: 'auto', paddingBottom: 0 }}>

          {/* Seção: Solicitante */}
          <div style={{ marginBottom: 4 }}>
            <p className="mlabel" style={{ marginBottom: 10, color: 'var(--ac)', fontSize: 11 }}>SOLICITANTE</p>
          </div>
          <div className="mrow">
            <div className="mfld">
              <label className="mlabel">Nome *</label>
              <input className="minput" value={form.nome}     onChange={e => set('nome', e.target.value)}     placeholder="Nome completo" />
            </div>
            <div className="mfld">
              <label className="mlabel">Telefone *</label>
              <input className="minput" type="tel" value={form.telefone} onChange={e => set('telefone', e.target.value)} placeholder="(11) 99999-9999" />
            </div>
          </div>
          <div className="mrow">
            <div className="mfld">
              <label className="mlabel">E-mail *</label>
              <input className="minput" type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="email@empresa.com" />
            </div>
            <div className="mfld">
              <label className="mlabel">Setor solicitante *</label>
              <select className="msel" value={form.setor} onChange={e => set('setor', e.target.value)}>
                <option value="">Selecione...</option>
                {SECTORS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>

          {/* Divisor */}
          <div style={{ borderTop: '1px solid var(--b)', margin: '10px 0 14px' }} />

          {/* Seção: Pedido */}
          <div style={{ marginBottom: 10 }}>
            <p className="mlabel" style={{ color: 'var(--ac)', fontSize: 11 }}>PEDIDO</p>
          </div>
          <div className="mrow full">
            <div className="mfld">
              <label className="mlabel">Título da solicitação *</label>
              <input className="minput" value={form.requestTitle} onChange={e => set('requestTitle', e.target.value)} placeholder="Descreva brevemente o que precisa" />
            </div>
          </div>
          <div className="mrow">
            <div className="mfld">
              <label className="mlabel">Unidade de negócio *</label>
              <select className="msel" value={form.bizUnit} onChange={e => set('bizUnit', e.target.value)}>
                <option value="">Selecione...</option>
                {BIZ_UNITS.map(b => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>
            <div className="mfld">
              <label className="mlabel">Tipo de pedido *</label>
              <select className="msel" value={form.orderType} onChange={e => set('orderType', e.target.value)}>
                <option value="">Selecione...</option>
                {ORDER_TYPES.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
          </div>
          <div className="mrow">
            <div className="mfld">
              <label className="mlabel">Data desejada *</label>
              <input className="minput" type="date" value={form.desiredDate} onChange={e => set('desiredDate', e.target.value)} />
            </div>
            <div className="mfld">
              <label className="mlabel">Entrega via *</label>
              <select className="msel" value={form.deliveryMethod} onChange={e => set('deliveryMethod', e.target.value)}>
                <option value="">Selecione...</option>
                {DELIVERY.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
          </div>
          <div className="mrow full">
            <div className="mfld">
              <label className="mlabel">Detalhes e contexto *</label>
              <textarea
                className="mtarea"
                rows={5}
                value={form.details}
                onChange={e => set('details', e.target.value)}
                placeholder="Explique o que precisa, onde será usado, dimensões, referências..."
              />
            </div>
          </div>
          <div className="mrow">
            <div className="mfld">
              <label className="mlabel">Status</label>
              <select className="msel" value={form.status} onChange={e => set('status', e.target.value)}>
                {ST2.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
              </select>
            </div>
            <div className="mfld">
              <label className="mlabel">Anexo (nome do arquivo)</label>
              <input className="minput" value={form.attachmentName} onChange={e => set('attachmentName', e.target.value)} placeholder="ex: briefing-campanha.pdf" />
            </div>
          </div>

          {/* Responsáveis — só aparece no card (edição), não na criação */}
          {existing && (
            <>
              <div style={{ borderTop: '1px solid var(--b)', margin: '10px 0 14px' }} />
              <div style={{ marginBottom: 10 }}>
                <p className="mlabel" style={{ color: 'var(--ac)', fontSize: 11 }}>RESPONSÁVEIS (time interno)</p>
              </div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
                {TEAM.map(m => {
                  const active = form.responsible.includes(m.id);
                  return (
                    <button
                      key={m.id}
                      type="button"
                      className={`resp-btn${active ? ' active' : ''}`}
                      onClick={() => toggleResp(m.id)}
                    >
                      <span className="resp-dot" style={{ background: m.color }} />
                      {m.name}
                    </button>
                  );
                })}
              </div>
            </>
          )}

        </div>{/* end mbody */}

        {error && <div className="merr">{error}</div>}

        <div className="mfoot">
          {existing && (
            <button className="btn btn-d" onClick={handleDelete}>Excluir</button>
          )}
          <button className="btn btn-o" onClick={closeModal2}>Cancelar</button>
          <button className="btn btn-p" onClick={handleSave} disabled={saving}>
            {saving ? <span className="spin">⟳</span> : 'Salvar'}
          </button>
        </div>

      </div>
    </div>
  );
}
