import { useEffect, useState, useCallback } from 'react';
import { subscribeRequests, addRequest, updateRequest, deleteRequest } from '../services/requests.service';
import { useAuth } from '../contexts/AuthContext';
import useAppStore from '../store/useAppStore';

export function useRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { filters2, sort2 } = useAppStore();

  useEffect(() => {
    const unsub = subscribeRequests(data => {
      setRequests(data);
      setLoading(false);
    });
    return unsub;
  }, []);

  const filtered = useCallback(() => {
    let c = [...requests];
    const f = filters2;
    if (f.search)    { const q = f.search.toLowerCase(); c = c.filter(x => (x.requestTitle || x.nome || '').toLowerCase().includes(q)); }
    if (f.unit)      c = c.filter(x => x.bizUnit === f.unit);
    if (f.orderType) c = c.filter(x => x.orderType === f.orderType);
    if (f.status)    c = c.filter(x => x.status === f.status);

    c.sort((a, b) => {
      const av = a[sort2.field] || '';
      const bv = b[sort2.field] || '';
      return sort2.dir === 'asc' ? String(av).localeCompare(String(bv)) : String(bv).localeCompare(String(av));
    });
    return c;
  }, [requests, filters2, sort2]);

  const filteredByStatus = useCallback((statusId) => {
    return filtered().filter(r => r.status === statusId);
  }, [filtered]);

  const create = async (data) => addRequest({ ...data, responsible: [] }, user.uid);
  const update = async (id, data) => updateRequest(id, data);
  const remove = async (id) => deleteRequest(id);

  const stats = {
    total: requests.length,
    done: requests.filter(r => r.status === 'done').length,
    progress: requests.filter(r => r.status === 'progress').length,
  };

  return { requests, loading, filtered, filteredByStatus, create, update, remove, stats };
}
