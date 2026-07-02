import { create } from 'zustand';

const useAppStore = create((set, get) => ({
  // ── Navigation ─────────────────────────────────
  pipe: 'content',    // 'content' | 'requests' | 'dash'
  setPipe: (pipe) => set({ pipe }),

  // ── Pipeline 1 — Content ───────────────────────
  view: 'kanban',
  setView: (view) => set({ view }),

  filters: {
    search: '', project: '', type: '', funnel: '',
    channel: '', status: '', responsible: '',
  },
  setFilter: (key, val) => set(s => ({ filters: { ...s.filters, [key]: val } })),
  clearFilters: () => set({ filters: { search: '', project: '', type: '', funnel: '', channel: '', status: '', responsible: '' } }),

  sort: { field: 'publishDate', dir: 'asc' },
  setSort: (field) => set(s => ({
    sort: s.sort.field === field
      ? { field, dir: s.sort.dir === 'asc' ? 'desc' : 'asc' }
      : { field, dir: 'asc' }
  })),

  modal: { open: false, id: null, defStatus: 'ideas', tab: 'basic' },
  openModal: (id = null, defStatus = 'ideas') => set({ modal: { open: true, id, defStatus, tab: 'basic' } }),
  closeModal: () => set({ modal: { open: false, id: null, defStatus: 'ideas', tab: 'basic' } }),
  setModalTab: (tab) => set(s => ({ modal: { ...s.modal, tab } })),

  // ── Pipeline 2 — Requests ──────────────────────
  view2: 'kanban',
  setView2: (view2) => set({ view2 }),

  filters2: { search: '', unit: '', orderType: '', status: '' },
  setFilter2: (key, val) => set(s => ({ filters2: { ...s.filters2, [key]: val } })),
  clearFilters2: () => set({ filters2: { search: '', unit: '', orderType: '', status: '' } }),

  sort2: { field: 'createdAt', dir: 'desc' },
  setSort2: (field) => set(s => ({
    sort2: s.sort2.field === field
      ? { field, dir: s.sort2.dir === 'asc' ? 'desc' : 'asc' }
      : { field, dir: 'desc' }
  })),

  modal2: { open: false, id: null, defStatus: 'triage', tab: 'req' },
  openModal2: (id = null, defStatus = 'triage') => set({ modal2: { open: true, id, defStatus, tab: 'req' } }),
  closeModal2: () => set({ modal2: { open: false, id: null, defStatus: 'triage', tab: 'req' } }),
  setModal2Tab: (tab) => set(s => ({ modal2: { ...s.modal2, tab } })),

  // ── AI Modal ───────────────────────────────────
  ai: { open: false, loading: false, error: '', preview: [], step: 'input' },
  openAI: () => set({ ai: { open: true, loading: false, error: '', preview: [], step: 'input' } }),
  closeAI: () => set({ ai: { open: false, loading: false, error: '', preview: [], step: 'input' } }),
  setAI: (patch) => set(s => ({ ai: { ...s.ai, ...patch } })),

  // ── Users Modal ────────────────────────────────
  usersModalOpen: false,
  openUsersModal: () => set({ usersModalOpen: true }),
  closeUsersModal: () => set({ usersModalOpen: false }),
}));

export default useAppStore;
