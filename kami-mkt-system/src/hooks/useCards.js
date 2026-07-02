import { useEffect, useState, useCallback } from 'react';
import { subscribeCards, addCard, updateCard, deleteCard, addCardsBulk } from '../services/cards.service';
import { useAuth } from '../contexts/AuthContext';
import useAppStore from '../store/useAppStore';
import { ST } from '../constants';

export function useCards() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const unsub = subscribeCards(data => {
      setCards(data);
      setLoading(false);
    });
    return unsub;
  }, []);

  const { filters, sort } = useAppStore();

  const filtered = useCallback(() => {
    let c = [...cards];
    const f = filters;
    if (f.search)      { const q = f.search.toLowerCase(); c = c.filter(x => x.title?.toLowerCase().includes(q)); }
    if (f.project)     c = c.filter(x => x.project === f.project);
    if (f.type)        c = c.filter(x => x.contentType === f.type);
    if (f.funnel)      c = c.filter(x => x.funnel === f.funnel);
    if (f.status)      c = c.filter(x => x.status === f.status);
    if (f.channel)     c = c.filter(x => x.channel?.includes(f.channel));
    if (f.responsible) c = c.filter(x => x.responsible?.includes(f.responsible));

    c.sort((a, b) => {
      const av = a[sort.field] || '';
      const bv = b[sort.field] || '';
      return sort.dir === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av);
    });
    return c;
  }, [cards, filters, sort]);

  const byStatus = useCallback((statusId) => {
    return cards.filter(c => c.status === statusId);
  }, [cards]);

  const filteredByStatus = useCallback((statusId) => {
    return filtered().filter(c => c.status === statusId);
  }, [filtered]);

  const create = async (data) => addCard({ ...data, responsible: data.responsible || [] }, user.uid);
  const update = async (id, data) => updateCard(id, data);
  const remove = async (id) => deleteCard(id);
  const bulkAdd = async (items) => addCardsBulk(items, user.uid);

  const stats = {
    total: cards.length,
    done: cards.filter(c => c.status === 'done').length,
    progress: cards.filter(c => c.status === 'progress').length,
    review: cards.filter(c => c.status === 'review').length,
  };

  return { cards, loading, filtered, filteredByStatus, byStatus, create, update, remove, bulkAdd, stats };
}
