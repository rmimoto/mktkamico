import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import LoadingScreen from '../ui/LoadingScreen';

// Hierarquia: admin > manager > user > read_only
const ROLE_LEVEL = { admin: 4, manager: 3, user: 2, member: 2, read_only: 1 };

export default function ProtectedRoute({
  children,
  requireAdmin = false,
  requireManager = false,
  requireWriteAccess = false,
}) {
  const { user, profile, loading } = useAuth();

  if (loading) return <LoadingScreen />;
  if (!user)   return <Navigate to="/login" replace />;

  const role  = profile?.role || 'read_only';
  const level = ROLE_LEVEL[role] ?? 1;

  if (requireAdmin   && level < ROLE_LEVEL.admin)   return <Navigate to="/" replace />;
  if (requireManager && level < ROLE_LEVEL.manager) return <Navigate to="/" replace />;
  if (requireWriteAccess && level < ROLE_LEVEL.user) return <Navigate to="/" replace />;

  return children;
}
