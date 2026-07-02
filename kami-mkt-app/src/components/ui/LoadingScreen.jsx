export default function LoadingScreen() {
  return (
    <div className="loading-screen">
      <div className="loading-brand">MAR<b>K</b>ETING</div>
      <div style={{ display: 'flex', gap: 5 }}>
        {[0, 1, 2].map(i => (
          <div
            key={i}
            className="loading-dot"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </div>
    </div>
  );
}
