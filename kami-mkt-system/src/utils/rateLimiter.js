const KEY = 'kami_login_attempts';
const MAX_ATTEMPTS = 5;
const LOCKOUT_MS = 30 * 60 * 1000; // 30 min

function getState() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || { count: 0, lockedUntil: null };
  } catch {
    return { count: 0, lockedUntil: null };
  }
}

function setState(state) {
  localStorage.setItem(KEY, JSON.stringify(state));
}

export function checkRateLimit() {
  const state = getState();
  if (state.lockedUntil && Date.now() < state.lockedUntil) {
    const remaining = Math.ceil((state.lockedUntil - Date.now()) / 60000);
    return { blocked: true, minutesLeft: remaining };
  }
  if (state.lockedUntil && Date.now() >= state.lockedUntil) {
    setState({ count: 0, lockedUntil: null });
  }
  return { blocked: false };
}

export function recordFailedAttempt() {
  const state = getState();
  const count = (state.count || 0) + 1;
  if (count >= MAX_ATTEMPTS) {
    setState({ count, lockedUntil: Date.now() + LOCKOUT_MS });
  } else {
    setState({ count, lockedUntil: null });
    return { attemptsLeft: MAX_ATTEMPTS - count };
  }
  return { attemptsLeft: 0 };
}

export function clearAttempts() {
  localStorage.removeItem(KEY);
}
