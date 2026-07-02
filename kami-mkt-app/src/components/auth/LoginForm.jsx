import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function LoginForm() {
  const { login, resetPassword } = useAuth();
  const navigate = useNavigate();

  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(true);
  const [error,    setError]    = useState('');
  const [success,  setSuccess]  = useState('');
  const [loading,  setLoading]  = useState(false);
  const [mode,     setMode]     = useState('login');  // 'login' | 'reset'

  async function handleLogin(e) {
    e.preventDefault();
    setError(''); setLoading(true);
    try {
      await login(email, password, remember);
      navigate('/', { replace: true });
    } catch (err) {
      setError(friendlyError(err.code));
    } finally {
      setLoading(false);
    }
  }

  async function handleReset(e) {
    e.preventDefault();
    setError(''); setLoading(true);
    try {
      await resetPassword(email);
      setSuccess('Link de recuperação enviado para ' + email);
      setMode('login');
    } catch (err) {
      setError(friendlyError(err.code));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-page">
      <div className="login-box">
        <div className="login-brand">MAR<b>K</b>ETING</div>
        <div className="login-sub">KAMI CO. — Painel Interno</div>

        {error   && <div className="login-err">{error}</div>}
        {success && <div className="login-ok">{success}</div>}

        {mode === 'login' ? (
          <form onSubmit={handleLogin}>
            <label className="login-lbl">E-mail</label>
            <input
              className="login-inp"
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoFocus
            />

            <label className="login-lbl">Senha</label>
            <input
              className="login-inp"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />

            <label className="login-remember">
              <input
                type="checkbox"
                checked={remember}
                onChange={e => setRemember(e.target.checked)}
              />
              Lembrar-me
            </label>

            <button className="btn btn-p btn-full" type="submit" disabled={loading}>
              {loading ? <span className="spin">⟳</span> : 'Entrar'}
            </button>

            <button
              type="button"
              className="login-reset"
              onClick={() => { setMode('reset'); setError(''); setSuccess(''); }}
            >
              Esqueci minha senha
            </button>
          </form>
        ) : (
          <form onSubmit={handleReset}>
            <label className="login-lbl">E-mail para recuperação</label>
            <input
              className="login-inp"
              type="email"
              placeholder="seu@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoFocus
            />

            <button className="btn btn-p btn-full" type="submit" disabled={loading} style={{ marginBottom: 8 }}>
              {loading ? <span className="spin">⟳</span> : 'Enviar link'}
            </button>

            <button
              type="button"
              className="login-reset"
              style={{ marginRight: 'auto', marginLeft: 0 }}
              onClick={() => { setMode('login'); setError(''); }}
            >
              ← Voltar para o login
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

function friendlyError(code) {
  const map = {
    'auth/invalid-email':         'E-mail inválido.',
    'auth/user-not-found':        'Usuário não encontrado.',
    'auth/wrong-password':        'Senha incorreta.',
    'auth/invalid-credential':    'E-mail ou senha incorretos.',
    'auth/too-many-requests':     'Muitas tentativas. Aguarde e tente novamente.',
    'auth/network-request-failed':'Erro de conexão. Verifique sua internet.',
  };
  return map[code] || 'Erro ao entrar. Tente novamente.';
}
