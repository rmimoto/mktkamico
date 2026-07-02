import { useState, useEffect } from 'react';
import { ST, PROJ, CTYPES, FUNNELS, CHANNELS, TEAM } from '../../constants';
import { useCards } from '../../hooks/useCards';
import useAppStore from '../../store/useAppStore';

const EMPTY = {
  title: '', status: 'ideas', project: '', contentType: '', funnel: '',
  deliveryDate: '', publishDate: '', channel: [], responsible: [],
  script: '', briefing: '', caption: '', fileLink: '', fileCount: '',
  publishInstructions: '',
};

export default function CardModal() {
  const { cards, create, update, remove } = useCards();
  const { modal, closeModal, setModalTab } = useAppStore();

  const existing = modal.id ? cards.find(c => c.id === modal.id) : null;
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);
  const [error, setError]   = useState('');

  useEffect(() => {
    if (!modal.open) return;
    setForm(existing
      ? { ...EMPTY, ...existing, channel: existing.channel || [], responsible: existing.responsible || [] }
      : { ...EMPTY, status: modal.defStatus }
    );
    setError('');
  }, [modal.open, modal.id]);

  if (!modal.open) return null;

  function set(key, val) { setForm(f => ({ ...f, [key]: val })); }

  function toggleArr(key, val) {
    setForm(f => ({
      ...f,
      [key]: f[key].includes(val) ? f[key].filter(x => x !== val) : [...f[key], val],
    }));
  }

  async function handleSave() {
    if (!form.title.trim()) { setError('O título é obrigatório.'); return; }
    setSaving(true); setError('');
    try {
      const { id: _id, createdAt: _ca, createdBy: _cb, updatedAt: _ua, ...data } = form;
      if (existing) await update(existing.id, data);
      else           await create(data);
      closeModal();
    } catch (e) {
      setError('Erro ao salvar. Tente novamente.');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!existing) return;
    if (!confirm('Excluir este card?')) return;
    await remove(existing.id);
    closeModal();
  }

  const tab = modal.tab;

  return (
    <div className="overlay" onClick={e => e.target === e.currentTarget && closeModal()}>
      <div className="modal">
        <div className="mhead">
          <h2>{existing ? 'Editar Card' : 'Novo Card'}</h2>
          <button className="mclose" onClick={closeModal}>✕</button>
        </div>

        <div className="mtabs">
          {['basic', 'content', 'publish'].map((t, i) => (
            <button key={t} className={`mtab${tab === t ? ' on' : ''}`} onClick={() => setModalTab(t)}>
              {['Básico', 'Conteúdo', 'Publicação'][i]}
            </button>
          ))}
        </div>

        <div className="mbody">
          {tab === 'basic' && (
            <>
              <div className="mrow full">
                <div className="mfld">
                  <label className="mlabel">Título *</label>
                  <input className="minput" value={form.title} onChange={e => set('title', e.target.value)} placeholder="Título do conteúdo" autoFocus />
                </div>
              </div>
              <div className="mrow">
                <div className="mfld">
                  <label className="mlabel">Status</label>
                  <select className="msel" value={form.status} onChange={e => set('status', e.target.value)}>
                    {ST.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
                  </select>
                </div>
                <div className="mfld">
                  <label className="mlabel">Projeto</label>
                  <select className="msel" value={form.project} onChange={e => set('project', e.target.value)}>
                    <option value="">—</option>
                    {PROJ.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
              </div>
              <div className="mrow">
                <div className="mfld">
                  <label className="mlabel">Tipo de conteúdo</label>
                  <select className="msel" value={form.contentType} onChange={e => set('contentType', e.target.value)}>
                    <option value="">—</option>
                    {CTYPES.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div className="mfld">
                  <label className="mlabel">Funil</label>
                  <select className="msel" value={form.funnel} onChange={e => set('funnel', e.target.value)}>
                    <option value="">—</option>
                    {FUNNELS.map(f => <option key={f} value={f}>{f}</option>)}
                  </select>
                </div>
              </div>
              <div className="mrow">
                <div className="mfld">
                  <label className="mlabel">Data de entrega</label>
                  <input className="minput" type="date" value={form.deliveryDate} onChange={e => set('deliveryDate', e.target.value)} />
                </div>
                <div className="mfld">
                  <label className="mlabel">Data de publicação</label>
                  <input className="minput" type="date" value={form.publishDate} onChange={e => set('publishDate', e.target.value)} />
                </div>
              </div>
              <div className="mrow full">
                <div className="mfld">
                  <label className="mlabel">Canais</label>
                  <div className="mchks">
                    {CHANNELS.map(ch => (
                      <label key={ch} className="mchk">
                        <input type="checkbox" checked={form.channel.includes(ch)} onChange={() => toggleArr('channel', ch)} />
                        <span>{ch}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mrow full">
                <div className="mfld">
                  <label className="mlabel">Responsáveis</label>
                  <div className="mchks">
                    {TEAM.map(m => (
                      <label key={m.id} className="mchk">
                        <input type="checkbox" checked={form.responsible.includes(m.id)} onChange={() => toggleArr('responsible', m.id)} />
                        <span style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                          <span style={{ width: 8, height: 8, borderRadius: '50%', background: m.color, display: 'inline-block' }} />
                          {m.name}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {tab === 'content' && (
            <>
              <div className="mrow full">
                <div className="mfld">
                  <label className="mlabel">Roteiro</label>
                  <textarea className="mtarea" rows={5} value={form.script} onChange={e => set('script', e.target.value)} placeholder="Roteiro do conteúdo..." />
                </div>
              </div>
              <div className="mrow full">
                <div className="mfld">
                  <label className="mlabel">Briefing</label>
                  <textarea className="mtarea" rows={4} value={form.briefing} onChange={e => set('briefing', e.target.value)} placeholder="Briefing criativo..." />
                </div>
              </div>
              <div className="mrow full">
                <div className="mfld">
                  <label className="mlabel">Legenda</label>
                  <textarea className="mtarea" rows={4} value={form.caption} onChange={e => set('caption', e.target.value)} placeholder="Legenda para publicação..." />
                </div>
              </div>
            </>
          )}

          {tab === 'publish' && (
            <>
              <div className="mrow">
                <div className="mfld">
                  <label className="mlabel">Link do arquivo</label>
                  <input className="minput" type="url" value={form.fileLink} onChange={e => set('fileLink', e.target.value)} placeholder="https://..." />
                </div>
                <div className="mfld">
                  <label className="mlabel">Qtd. arquivos</label>
                  <input className="minput" type="number" min={0} value={form.fileCount} onChange={e => set('fileCount', e.target.value)} />
                </div>
              </div>
              <div className="mrow full">
                <div className="mfld">
                  <label className="mlabel">Instruções de publicação</label>
                  <textarea className="mtarea" rows={5} value={form.publishInstructions} onChange={e => set('publishInstructions', e.target.value)} placeholder="Instruções para quem vai publicar..." />
                </div>
              </div>
            </>
          )}
        </div>

        {error && <div className="merr">{error}</div>}

        <div className="mfoot">
          {existing && (
            <button className="btn btn-d" onClick={handleDelete}>Excluir</button>
          )}
          <button className="btn btn-o" onClick={closeModal}>Cancelar</button>
          <button className="btn btn-p" onClick={handleSave} disabled={saving}>
            {saving ? <span className="spin">⟳</span> : 'Salvar'}
          </button>
        </div>
      </div>
    </div>
  );
}
