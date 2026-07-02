import { useRef } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import useAppStore from '../../store/useAppStore';
import Avatar from '../ui/Avatar';
import { updateUserProfile } from '../../services/users.service';

export default function Header() {
  const { user, profile, logout, refreshProfile, isAdmin } = useAuth();
  const {
    pipe, setPipe,
    view, setView,
    view2, setView2,
    openModal, openModal2,
    openAI, openUsersModal,
  } = useAppStore();

  const fileRef = useRef(null);
  const currentView = pipe === 'content' ? view : view2;

  function handleViewToggle(v) {
    pipe === 'content' ? setView(v) : setView2(v);
  }

  async function handleAvatarChange(e) {
    const file = e.target.files?.[0];
    if (!file || !user) return;
    const reader = new FileReader();
    reader.onload = async (ev) => {
      try {
        await updateUserProfile(user.uid, { avatar: ev.target.result });
        await refreshProfile();
      } catch (err) {
        console.error('Avatar update failed:', err);
      }
    };
    reader.readAsDataURL(file);
  }

  return (
    <>
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleAvatarChange}
      />
      <header className="header">
        <div className="brand">MAR<b>K</b>ETING</div>
        <div className="sep" />

        <nav className="pipe-tabs">
          <button className={`pt-btn${pipe === 'dash' ? ' on' : ''}`}     onClick={() => setPipe('dash')}>Dashboard</button>
          <button className={`pt-btn${pipe === 'content' ? ' on' : ''}`}  onClick={() => setPipe('content')}>Conteúdo</button>
          <button className={`pt-btn${pipe === 'requests' ? ' on' : ''}`} onClick={() => setPipe('requests')}>Solicitações</button>
        </nav>

        {pipe !== 'dash' && (
          <>
            <div className="sep" />
            <div className="vtabs">
              <button className={`vbtn${currentView === 'kanban' ? ' on' : ''}`} onClick={() => handleViewToggle('kanban')}>⊞ Kanban</button>
              <button className={`vbtn${currentView === 'list'   ? ' on' : ''}`} onClick={() => handleViewToggle('list')}>≡ Lista</button>
            </div>
          </>
        )}

        <div className="hright">
          {pipe === 'content' && (
            <button className="btn btn-o" onClick={openAI}>⚡ IA</button>
          )}
          {pipe !== 'dash' && (
            <button
              className="btn btn-p"
              onClick={() => pipe === 'content' ? openModal() : openModal2()}
            >
              {pipe === 'content' ? '+ Novo Card' : '+ Nova Solicitação'}
            </button>
          )}
          <div className="sep" />
          <Avatar
            user={{ ...profile, id: user?.uid }}
            size={30}
            editable
            onClick={() => fileRef.current?.click()}
          />
          <span style={{ fontSize: 12, color: 'var(--t2)', whiteSpace: 'nowrap' }}>
            {profile?.name || user?.email}
          </span>
          {isAdmin && (
            <button className="btn btn-o btn-icon" onClick={openUsersModal} title="Gerenciar usuários">👥</button>
          )}
          <button className="btn btn-o btn-icon" onClick={logout} title="Sair">⏻</button>
        </div>
      </header>
    </>
  );
}
