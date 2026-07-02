import { useState, useEffect } from 'react';
import { useCards } from '../../hooks/useCards';
import useAppStore from '../../store/useAppStore';
import { AI_SYSTEM } from '../../constants';

const KEY_APIKEY = 'kami-mkt-apikey-v1';

export default function AIModal() {
  const { bulkAdd } = useCards();
  const { ai, closeAI, setAI } = useAppStore();

  const [apiKey, setApiKey] = useState(() => localStorage.getItem(KEY_APIKEY) || '');
  const [text,   setText]   = useState('');

  useEffect(() => {
    if (ai.open) { setText(''); setAI({ preview: [], step: 'input', error: '' }); }
  }, [ai.open]);

  if (!ai.open) return null;

  async function handleGenerate() {
    if (!apiKey.trim()) { setAI({ error: 'Informe a chave de API Anthropic.' }); return; }
    if (!text.trim())   { setAI({ error: 'Cole o calendário de conteúdo no campo acima.' }); return; }

    localStorage.setItem(KEY_APIKEY, apiKey.trim());
    setAI({ loading: true, error: '' });

    try {
      const resp = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'x-api-key':                                  apiKey.trim(),
          'anthropic-version':                          '2023-06-01',
          'content-type':                               'application/json',
          'anthropic-dangerous-direct-browser-access':  'true',
        },
        body: JSON.stringify({
          model:      'claude-opus-4-5',
          max_tokens: 8192,
          system:     AI_SYSTEM,
          messages:   [{ role: 'user', content: text }],
        }),
      });

      if (!resp.ok) {
        let msg = `Erro ${resp.status}`;
        try { const e = await resp.json(); msg = e.error?.message || msg; } catch (_) {}
        throw new Error(msg);
      }

      const data = await resp.json();
      const raw  = data.content[0].text.trim()
        .replace(/^```(?:json)?\n?/, '')
        .replace(/\n?```$/, '')
        .trim();

      const cards = JSON.parse(raw);
      setAI({ loading: false, preview: cards, step: 'preview' });
    } catch (err) {
      setAI({ loading: false, error: err.message || 'Erro ao processar. Verifique a chave e tente novamente.' });
    }
  }

  async function handleConfirm() {
    setAI({ loading: true });
    try {
      await bulkAdd(ai.preview);
      closeAI();
    } catch (err) {
      setAI({ loading: false, error: 'Erro ao criar cards.' });
    }
  }

  return (
    <div className="overlay" onClick={e => e.target === e.currentTarget && closeAI()}>
      <div className="modal" style={{ width: 680 }}>
        <div className="mhead">
          <h2>⚡ Importar via IA</h2>
          <button className="mclose" onClick={closeAI}>✕</button>
        </div>

        <div className="mbody">
          {ai.step === 'input' && (
            <>
              <div className="mrow full" style={{ marginBottom: 12 }}>
                <div className="mfld">
                  <label className="mlabel">Chave de API Anthropic</label>
                  <input
                    className="minput"
                    type="password"
                    value={apiKey}
                    onChange={e => setApiKey(e.target.value)}
                    placeholder="sk-ant-..."
                    autoComplete="off"
                  />
                  <span style={{ fontSize: 10, color: 'var(--t3)', marginTop: 3 }}>
                    Salva localmente no seu navegador. Nunca enviada ao servidor.
                  </span>
                </div>
              </div>
              <div className="mrow full">
                <div className="mfld">
                  <label className="mlabel">Calendário de conteúdo</label>
                  <textarea
                    className="mtarea"
                    rows={12}
                    value={text}
                    onChange={e => setText(e.target.value)}
                    placeholder="Cole aqui o calendário de conteúdo em qualquer formato (tabela, lista, texto corrido)..."
                    autoFocus
                  />
                </div>
              </div>
              {ai.error && <div className="merr">{ai.error}</div>}
            </>
          )}

          {ai.step === 'preview' && (
            <>
              <p style={{ fontSize: 12, color: 'var(--t2)', marginBottom: 12 }}>
                <strong style={{ color: 'var(--t1)' }}>{ai.preview.length} cards</strong> identificados. Confirme para criá-los na coluna <em>Banco de ideias</em>.
              </p>
              <div style={{ maxHeight: '55vh', overflowY: 'auto' }}>
                {ai.preview.map((card, i) => (
                  <div key={i} className="ai-preview-card">
                    <div className="ai-preview-title">{card.title}</div>
                    <div className="ai-preview-meta">
                      {card.project     && <span>📁 {card.project}</span>}
                      {card.contentType && <span>🎬 {card.contentType}</span>}
                      {card.funnel      && <span>🔽 {card.funnel}</span>}
                      {card.publishDate && <span>🚀 {card.publishDate}</span>}
                      {card.channel?.length > 0 && <span>📡 {card.channel.join(', ')}</span>}
                    </div>
                  </div>
                ))}
              </div>
              {ai.error && <div className="merr">{ai.error}</div>}
            </>
          )}
        </div>

        <div className="mfoot">
          {ai.step === 'preview' && (
            <button className="btn btn-o" onClick={() => setAI({ step: 'input' })}>← Voltar</button>
          )}
          <button className="btn btn-o" onClick={closeAI}>Cancelar</button>
          {ai.step === 'input' && (
            <button className="btn btn-p" onClick={handleGenerate} disabled={ai.loading}>
              {ai.loading ? <><span className="spin">⟳</span> Processando...</> : '⚡ Gerar Cards'}
            </button>
          )}
          {ai.step === 'preview' && (
            <button className="btn btn-p" onClick={handleConfirm} disabled={ai.loading}>
              {ai.loading ? <span className="spin">⟳</span> : `✓ Criar ${ai.preview.length} cards`}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
