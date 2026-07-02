const PALETTE = ['#ec4899', '#7c6af6', '#06b6d4', '#f59e0b', '#22c55e', '#e73a57', '#3b82f6'];

function getColor(id = 'x') {
  const n = id.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  return PALETTE[Math.abs(n) % PALETTE.length];
}

function getInitials(name = '?') {
  return name.split(' ').map(w => w[0] || '').join('').slice(0, 2).toUpperCase() || '?';
}

export default function Avatar({ user = {}, size = 28, onClick, editable = false }) {
  const initials = getInitials(user.name);
  const color    = getColor(user.id || user.uid);
  const fontSize = Math.floor(size * 0.38);

  const style = {
    width:  size,
    height: size,
    fontSize,
    background: user.avatar ? 'transparent' : color,
    flexShrink: 0,
  };

  const inner = user.avatar
    ? <img src={user.avatar} alt={initials} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
    : initials;

  if (editable) {
    return (
      <div className="avatar-wrap" onClick={onClick} title="Alterar foto" style={{ width: size, height: size }}>
        <div className="avatar" style={style}>{inner}</div>
        <div className="avatar-edit-hint">✎</div>
      </div>
    );
  }

  return (
    <div className="avatar" style={style} onClick={onClick} title={user.name}>
      {inner}
    </div>
  );
}
