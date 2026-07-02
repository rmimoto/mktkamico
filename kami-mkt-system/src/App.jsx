import { useEffect } from 'react';
import { useAuth } from './contexts/AuthContext';
import useAppStore from './store/useAppStore';

// Layout
import Header from './components/layout/Header';

// Pipeline 1 — Conteúdo
import FilterBar    from './components/pipeline/FilterBar';
import KanbanBoard  from './components/pipeline/KanbanBoard';
import ListView     from './components/pipeline/ListView';
import CardModal    from './components/pipeline/CardModal';

// Pipeline 2 — Solicitações
import RequestFilterBar from './components/requests/RequestFilterBar';
import RequestBoard     from './components/requests/RequestBoard';
import RequestListView  from './components/requests/RequestListView';
import RequestModal     from './components/requests/RequestModal';

// Dashboard
import Dashboard from './components/dashboard/Dashboard';

// Admin & AI
import UsersModal from './components/admin/UsersModal';
import AIModal    from './components/ai/AIModal';

export default function App() {
  const { loading } = useAuth();
  const { pipe, view, view2 } = useAppStore();

  // Atalhos de teclado globais
  useEffect(() => {
    const { openModal, closeModal, modal, openModal2, closeModal2, modal2, closeAI, ai } = useAppStore.getState();

    function onKey(e) {
      if (e.key === 'Escape') {
        if (ai.open)     closeAI();
        if (modal.open)  closeModal();
        if (modal2.open) closeModal2();
      }
      const tag = document.activeElement?.tagName;
      if (e.key === 'n' && tag !== 'INPUT' && tag !== 'TEXTAREA' && tag !== 'SELECT') {
        const { pipe } = useAppStore.getState();
        if (pipe === 'content')  openModal();
        if (pipe === 'requests') openModal2();
      }
    }

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  if (loading) return null;

  return (
    <div className="app-shell">
      <Header />

      <main className="main-area">
        {pipe === 'dash' && <Dashboard />}

        {pipe === 'content' && (
          <>
            <FilterBar />
            {view === 'kanban' ? <KanbanBoard /> : <ListView />}
          </>
        )}

        {pipe === 'requests' && (
          <>
            <RequestFilterBar />
            {view2 === 'kanban' ? <RequestBoard /> : <RequestListView />}
          </>
        )}
      </main>

      {/* Modais globais */}
      <CardModal />
      <RequestModal />
      <UsersModal />
      <AIModal />
    </div>
  );
}
