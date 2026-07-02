import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import useAppStore from '../../store/useAppStore';
import { getAllUsers, updateUserProfile, deleteUserProfile } from '../../services/users.service';
import { createUser } from '../../services/auth.service';
import { ROLES } from '../../constants';
import Avatar from '../ui/Avatar';

const NEW_EMPTY = { name: '', email: '', password: '', role: 'member' };

export default function UsersModal() {
  const { user: currentUser, refreshProfile } = useAuth();
  const { usersModalOpen, closeUsersModal } = useAppStore();

  const [users,   setUsers]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab,     setTab]     = useState('list');   // 'list' | 'new'
  const [form,    setForm]    = useState(NEW_EMPTY);
  const [saving,  setSaving]  = useState(false);
  const [error,   setError]   = useState('');
  const [success, setSuccess] = useState('');
  const fileRefs = useRef({});

  useEffect(() => {
    if (usersModalOpen) { fetchUsers(); setTab('list'); setError(''); setSuccess(''); }
  }, [usersModalOpen]);

  async function fetchUsers() {
    setLoading(true);
    try { setUsers(await getAllUsers()); }
    catch (e) { console.error(e); }
    finally { setLoading(false); }
  }

  async function handleCreate(e) {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) { setError('Preencha todos os campos.'); return; }
    setSaving(true); setError('');
    try {
      await createUser(form.email, form.password, form.name, form.role);
      setSuccess(`Usuário "${form.name}" criado com sucesso.`);
      setForm(NEW_EMPTY);
      setTab('list');
      await fetchUsers();
    } catch (err) {
      setError(err.message?.includes('email-already-in-use')
        ? 'E-mail já cadastrado.'
        : 'Erro ao criar usuário.');
    } finally { setSaving(false); }
  }

  async function handleRoleChange(uid, role) {
    try {
      await updateUserProfile(uid, { role });
      setUsers(u => u.map(x => x.id === uid ? { ...x, role } : x));
      if (uid === currentUser?.uid) refreshProfile();
    } catch (e) { console.error(e); }
  }

  async function handleDelete(uid, name) {
    if (!confirm(`Remover "${name}"? O acesso será revogado.`)) return;
    try {
      await deleteUserProfile(uid);
      setUsers(u => u.filter(x => x.id !== uid));
    } catch (e) { console.error(e); }
  }

  async function handleAvatarChange(uid, file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (ev) => {
      try {
        await updateUserProfile(uid, { avatar: ev.target.result });
        setUsers(u => u.map(x => x.id === uid ? { ...x, avatar: ev.target.result } : x));
        if (uid === currentUser?.uid) refreshProfile();
      } catch (err) { console.error(err); }
    };
    reader.readAsDataURL(file);
  }

  if (!usersModalOpen) return null;

  return (
    <div className="overlay" onClick={e => e.target === e.currentTarget && closeUsersModal()}>
      <div className="modal" style={{ width: 560 }}>
        <div className="mhead">
          <h2>Gerenciar Usuários</h2>
          <button className="mclose" onClick={closeUsersModal}>✕</button>
        </div>

        <div className="mtabs">
          <button className={`mtab${tab === 'list' ? ' on' : ''}`} onClick={() => { setTab('list'); setError(''); setSuccess(''); }}>
            Usuários ({users.length})
          </button>
          <button className={`mtab${tab === 'new' ? ' on' : ''}`} onClick={() => { setTab('new'); setError(''); setSuccess(''); }}>
            + Novo usuário
          </button>
        </div>

        {tab === 'list' && (
          <>
            {success && <div style={{ padding: '8px 20px', fontSize: 12, color: '#86efac' }}>{success}</div>}
            {loading ? (
              <div style={{ padding: 24, textAlign: 'center', color: 'var(--t3)' }}>Carregando...</div>
            ) : (
              <div style={{ maxHeight: '60vh', overflowY: 'auto' }}>
                {users.map(u => (
                  <div key={u.id} className="user-row">
                    {/* Hidden file input per user */}
                    <input
                      ref={el => fileRefs.current[u.id] = el}
                      type="file"
                      accept="image/*"
                      style={{ display: 'none' }}
                      onChange={e => handleAvatarChange(u.id, e.target.files?.[0])}
                    />

                    <Avatar
                      user={{ ...u, id: u.id }}
                      size={36}
                      editable
                      onClick={() => fileRefs.current[u.id]?.click()}
                    />

                    <div className="user-info">
                      <div className="user-name">{u.name}</div>
                      <div className="user-email">{u.email}</div>
                    </div>

                    <select
                      className="fsel"
                      value={u.role || 'member'}
                      onChange={e => handleRoleChange(u.id, e.target.value)}
                      style={{ fontSize: 11 }}
                      disabled={u.id === currentUser?.uid}
                    >
                      {ROLES.map(r => <option key={r.id} value={r.id}>{r.label}</option>)}
                    </select>

                    <span className={`user-badge badge-${u.role || 'member'}`}>
                      {ROLES.find(r => r.id === u.role)?.label || 'Member'}
                    </span>

                    {u.id !== currentUser?.uid && (
                      <button
                        className="btn btn-o btn-icon"
                        style={{ padding: '4px 8px', fontSize: 13 }}
                        onClick={() => handleDelete(u.id, u.name)}
                        title="Remover usuário"
                      >
                        🗑
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {tab === 'new' && (
          <form onSubmit={handleCreate}>
            <div className="mbody">
              {error && <div className="merr" style={{ marginBottom: 10 }}>{error}</div>}
              <div className="mrow full">
                <div className="mfld">
                  <label className="mlabel">Nome completo</label>
                  <input className="minput" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Nome" autoFocus />
                </div>
              </div>
              <div className="mrow full">
                <div className="mfld">
                  <label className="mlabel">E-mail</label>
                  <input className="minput" type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="email@empresa.com" />
                </div>
              </div>
              <div className="mrow">
                <div className="mfld">
                  <label className="mlabel">Senha inicial</label>
                  <input className="minput" type="password" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} placeholder="Mínimo 6 caracteres" />
                </div>
                <div className="mfld">
                  <label className="mlabel">Perfil</label>
                  <select className="msel" value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))}>
                    {ROLES.map(r => <option key={r.id} value={r.id}>{r.label}</option>)}
                  </select>
                </div>
              </div>
            </div>
            <div className="mfoot">
              <button type="button" className="btn btn-o" onClick={() => setTab('list')}>Cancelar</button>
              <button type="submit" className="btn btn-p" disabled={saving}>
                {saving ? <span className="spin">⟳</span> : 'Criar usuário'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
